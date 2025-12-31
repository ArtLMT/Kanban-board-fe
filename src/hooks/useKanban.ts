import { useState, useEffect } from "react";
import { boardApi } from "../api/boardApi";
import { taskApi } from "../api/taskApi";
import { statusApi } from "../api/statusApi"; // Import statusApi mới

// Import Types
import type { UIBoard, UIStatus } from "../types/kanban";
import type {CreateTaskRequest, Task} from "../types/task";

export const useKanban = () => {
    // --- STATE ---
    const [boards, setBoards] = useState<UIBoard[]>([]);
    const [currentBoardId, setCurrentBoardId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // UI State
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isCreatingBoard, setIsCreatingBoard] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");

    // Helper: Lấy board hiện tại
    const currentBoard = boards.find(b => b.id === currentBoardId);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                setIsLoading(true);
                const data = await boardApi.getMyBoards();

                console.log("API Boards Response:", data); // Bật log này lên để xem Backend trả về gì!

                // Map dữ liệu từ Backend sang Frontend UI nếu tên trường không khớp
                // Giả sử Backend trả về: boardId, title
                const initialUIBoards: UIBoard[] = data.map((b: any) => ({
                    // Ưu tiên lấy id hoặc boardId từ API
                    id: b.id || b.boardId,

                    // Ưu tiên lấy boardName hoặc title từ API
                    boardName: b.boardName || b.title || "Untitled",

                    statuses: []
                }));

                setBoards(initialUIBoards);

                // Auto select board
                if (initialUIBoards.length > 0 && !currentBoardId) {
                    setCurrentBoardId(initialUIBoards[0].id);
                }
            } catch (err) {
                console.error("Failed to fetch boards", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBoards();
    }, []);

    // --- 2. Fetch Chi tiết (Status + Task) khi chọn Board ---
    useEffect(() => {
        if (!currentBoardId) return;

        const fetchBoardData = async () => {
            setIsLoading(true);
            try {
                const [apiStatuses, apiTasks] = await Promise.all([
                    statusApi.getByBoardId(currentBoardId),
                    taskApi.getTasksByBoardId(currentBoardId)
                ]);

                // MERGE DATA
                const uiStatuses: UIStatus[] = apiStatuses.map(status => ({
                    ...status,

                    tasks: apiTasks.filter(task => {
                        // if (task.statusId !== undefined) {
                            return task.statusId === status.id;
                        // }
                        // return task.statusId === status.id;
                    })
                }));

                setBoards(prev => prev.map(board =>
                    board.id === currentBoardId
                        ? { ...board, statuses: uiStatuses }
                        : board
                ));

            } catch (err) {
                console.error("Failed to load board details", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBoardData();
    }, [currentBoardId]);

    // ================= BOARD ACTIONS =================

    const handleCreateBoard = async () => {
        if (!newBoardName.trim()) return;
        try {
            const newBoardData = await boardApi.createBoard({ boardName: newBoardName });

            const newUIBoard: UIBoard = { ...newBoardData, statuses: [] };

            setBoards(prev => [...prev, newUIBoard]);
            setCurrentBoardId(newUIBoard.id);
            setNewBoardName("");
            setIsCreatingBoard(false);
        } catch (err) {
            console.error("Create board failed", err);
        }
    };

    const handleDeleteBoard = async (id: number) => {
        try {
            await boardApi.deleteBoard(id);
            const newBoards = boards.filter(b => b.id !== id);
            setBoards(newBoards);

            if (currentBoardId === id) {
                setCurrentBoardId(newBoards.length > 0 ? newBoards[0].id : null);
            }
        } catch (err) {
            console.error("Delete board failed", err);
        }
    };

    const handleSelectBoard = (id: number) => {
        setCurrentBoardId(id);
    };

    // ================= STATUS ACTIONS (Đã đổi tên từ Column) =================

    const handleAddStatus = async (name: string) => {
        if (!currentBoardId) return;
        try {
            // API yêu cầu name, color, boardId.
            // Ta hardcode màu mặc định hoặc random nếu UI chưa có chỗ chọn màu.
            const newStatusData = await statusApi.create({
                name: name,
                color: "#e2e8f0", // Màu mặc định (xám nhạt)
                boardId: currentBoardId,
                position: currentBoard?.statuses.length // Đưa xuống cuối
            });

            // Status mới chưa có task nào
            const newUIStatus: UIStatus = { ...newStatusData, tasks: [] };

            setBoards(prev => prev.map(board =>
                board.id === currentBoardId
                    ? { ...board, statuses: [...board.statuses, newUIStatus] }
                    : board
            ));
        } catch (err) {
            console.error("Create status failed", err);
        }
    };

    const handleUpdateStatus = async (statusId: number, newName: string) => {
        try {
            // Gọi API update
            const updatedStatus = await statusApi.update(statusId, { name: newName });

            setBoards(prev => prev.map(board =>
                board.id === currentBoardId
                    ? {
                        ...board,
                        statuses: board.statuses.map(s =>
                            s.id === statusId ? { ...s, name: updatedStatus.name } : s
                        )
                    }
                    : board
            ));
        } catch (err) {
            console.error("Update status failed", err);
        }
    };

    const handleDeleteStatus = async (statusId: number) => {
        try {
            await statusApi.delete(statusId);

            setBoards(prev => prev.map(board =>
                board.id === currentBoardId
                    ? { ...board, statuses: board.statuses.filter(s => s.id !== statusId) }
                    : board
            ));
        } catch (err) {
            console.error("Delete status failed", err);
        }
    };

    // ================= TASK ACTIONS =================

    // Thay thế đoạn handleAddTask cũ bằng đoạn này
    const handleAddTask = async (statusId: number, taskData: { title: string, description?: string }) => {
        if (!currentBoard || !currentBoardId) return;

        // Tìm Status object
        const targetStatus = currentBoard.statuses.find(s => s.id === statusId);
        if (!targetStatus) return;

        const payload: CreateTaskRequest = {
            title: taskData.title,              // Lấy title từ object
            description: taskData.description,  // Lấy description từ object
            statusId: statusId,
            boardId: currentBoard.id
            // status: {
            //     id: targetStatus.id,
            //     name: targetStatus.name,
            //     color: targetStatus.color,
            //     position: targetStatus.position,
            //     board: { id: currentBoard.id, boardName: currentBoard.boardName }
            // },
            // board: {
            //     id: currentBoard.id,
            //     boardName: currentBoard.boardName
            // }
        };

        try {
            const createdTask = await taskApi.createTask(payload);

            setBoards(prev => prev.map(board => {
                if (board.id !== currentBoardId) return board;
                return {
                    ...board,
                    statuses: board.statuses.map(s =>
                        s.id === statusId
                            ? { ...s, tasks: [...s.tasks, createdTask] }
                            : s
                    )
                };
            }));
        } catch (err) {
            console.error("Create task failed", err);
        }
    };

    const handleDeleteTask = async (statusId: number, taskId: number) => {
        try {
            await taskApi.deleteTask(taskId);

            setBoards(prev => prev.map(board => {
                if (board.id !== currentBoardId) return board;
                return {
                    ...board,
                    statuses: board.statuses.map(s =>
                        s.id === statusId
                            ? { ...s, tasks: s.tasks.filter(t => t.id !== taskId) }
                            : s
                    )
                };
            }));
        } catch (err) {
            console.error("Delete task failed", err);
        }
    };

    const handleEditTask = async (statusId: number, taskToUpdate: Task) => {
        try {
            // 1. Gọi API Update
            // Lưu ý: taskToUpdate nhận từ UI đã chứa title/desc mới
            const updatedTask = await taskApi.updateTask(taskToUpdate.id, {
                title: taskToUpdate.title,
                description: taskToUpdate.description,
                statusId: statusId, // Đảm bảo task vẫn ở đúng cột
                // assigneeId: taskToUpdate.assignee?.id // Nếu có tính năng assign
            });

            // 2. Cập nhật State (Optimistic UI update hoặc dựa vào response)
            setBoards(prev => prev.map(board => {
                if (board.id !== currentBoardId) return board;

                return {
                    ...board,
                    statuses: board.statuses.map(status => {
                        // Chỉ update status chứa task này
                        if (status.id === statusId) {
                            return {
                                ...status,
                                tasks: status.tasks.map(t =>
                                    t.id === taskToUpdate.id ? updatedTask : t
                                )
                            };
                        }
                        return status;
                    })
                };
            }));
        } catch (err) {
            console.error("Failed to update task", err);
            // Có thể thêm logic rollback state hoặc show toast error ở đây
        }
    };

    return {
        // Data
        boards,
        currentBoard,
        currentBoardId,
        isLoading,

        // UI States
        sidebarOpen,
        isCreatingBoard,
        newBoardName,

        // Setters
        setSidebarOpen,
        setIsCreatingBoard,
        setNewBoardName,

        // Board Actions
        handleSelectBoard,
        handleCreateBoard,
        handleDeleteBoard,

        // Status Actions
        handleAddStatus,
        handleUpdateStatus,
        handleDeleteStatus,

        // Task Actions
        handleAddTask,
        handleDeleteTask,
        handleEditTask,
    };
};