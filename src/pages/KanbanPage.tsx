import { useState } from "react";
import { ColumnManager, KanbanHeader, KanbanSidebar } from "../components/molecules";
import { BoardContent } from "../components/organisms/";
import { KanbanLayout } from "../components/templates/KanbanKayout.tsx";

import { mockBoards, createDefaultBoard, createDefaultColumn } from "../api/mockKanbanData.ts";
import type { Task, Board as BoardType } from "../types/kanban.ts";

export const KanbanPage = () => {
    // 1. QUẢN LÝ STATE (LOGIC)
    const [boards, setBoards] = useState<BoardType[]>(mockBoards);
    const [currentBoardId, setCurrentBoardId] = useState<string>(boards[0]?.id || "");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isCreatingBoard, setIsCreatingBoard] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");
    const username = "Lê Minh Thành";

    // Tìm board hiện tại
    const currentBoard = boards.find(b => b.id === currentBoardId);

    // Nếu không có board nào (ví dụ xóa hết), có thể render màn hình trống hoặc loading
    if (!currentBoard) return <div className="p-10 text-white">Không tìm thấy bảng nào.</div>;

    const columns = currentBoard.columns;

    // --- LOGIC TASK (ADD, DELETE, EDIT) ---

    const handleAddTask = (columnId: string, task: Task) => {
        setBoards(prev =>
            prev.map(board =>
                board.id !== currentBoardId
                    ? board
                    : {
                        ...board,
                        columns: board.columns.map(col =>
                            col.id === columnId
                                ? { ...col, tasks: [...col.tasks, task] }
                                : col
                        ),
                    }
            )
        );
    };

    const handleDeleteTask = (columnId: string, taskId: string) => {
        setBoards(prev =>
            prev.map(board =>
                board.id !== currentBoardId
                    ? board
                    : {
                        ...board,
                        columns: board.columns.map(col =>
                            col.id === columnId
                                ? { ...col, tasks: col.tasks.filter(t => t.id !== taskId) }
                                : col
                        ),
                    }
            )
        );
    };

    const handleEditTask = (columnId: string, task: Task) => {
        setBoards(prev =>
            prev.map(board =>
                board.id !== currentBoardId
                    ? board
                    : {
                        ...board,
                        columns: board.columns.map(col =>
                            col.id === columnId
                                ? {
                                    ...col,
                                    tasks: col.tasks.map(t =>
                                        t.id === task.id ? task : t
                                    ),
                                }
                                : col
                        ),
                    }
            )
        );
    };

    const handleClearAllTasks = () => {
        setBoards(prev =>
            prev.map(board =>
                board.id === currentBoardId
                    ? {
                        ...board,
                        columns: board.columns.map(col => ({ ...col, tasks: [] }))
                    }
                    : board
            )
        );
    };

    // --- LOGIC BOARD (CREATE, DELETE, SELECT) ---

    const handleCreateBoard = () => {
        if (!newBoardName.trim()) return;
        const newBoard = createDefaultBoard(newBoardName);
        setBoards([...boards, newBoard]);
        setCurrentBoardId(newBoard.id); // Chuyển sang board mới tạo
        setNewBoardName("");
        setIsCreatingBoard(false);
    };

    const handleDeleteBoard = (id: string) => {
        const newBoards = boards.filter(b => b.id !== id);
        setBoards(newBoards);
        // Nếu xóa board đang chọn, chuyển về board đầu tiên nếu còn
        if (currentBoardId === id && newBoards.length > 0) {
            setCurrentBoardId(newBoards[0].id);
        }
    };

    const handleSelectBoard = (id: string) => {
        setCurrentBoardId(id);
    };

    // --- LOGIC COLUMN (ADD, DELETE, EDIT TITLE) ---

    const handleAddColumn = (title: string) => {
        const newColumn = createDefaultColumn(title);
        setBoards(prev =>
            prev.map(board =>
                board.id === currentBoardId
                    ? { ...board, columns: [...board.columns, newColumn] }
                    : board
            )
        );
    };

    const handleDeleteColumn = (columnId: string) => {
        setBoards(prev =>
            prev.map(board =>
                board.id === currentBoardId
                    ? { ...board, columns: board.columns.filter(col => col.id !== columnId) }
                    : board
            )
        );
    };

    const handleEditColumnTitle = (columnId: string, newTitle: string) => {
        setBoards(prev =>
            prev.map(board =>
                board.id === currentBoardId
                    ? {
                        ...board,
                        columns: board.columns.map(col =>
                            col.id === columnId ? { ...col, title: newTitle } : col
                        )
                    }
                    : board
            )
        );
    };

    const totalTasks = columns.reduce((acc, col) => acc + col.tasks.length, 0);


    // 2. CHUẨN BỊ CÁC THÀNH PHẦN UI ĐỂ TRUYỀN VÀO LAYOUT

    const sidebarComponent = (
        <KanbanSidebar
            boards={boards}
            currentBoardId={currentBoardId}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isCreatingBoard={isCreatingBoard}
            setIsCreatingBoard={setIsCreatingBoard}
            newBoardName={newBoardName}
            setNewBoardName={setNewBoardName}
            handleCreateBoard={handleCreateBoard}
            handleDeleteBoard={handleDeleteBoard}
            handleSelectBoard={handleSelectBoard}
        />
    );

    const headerComponent = (
        <KanbanHeader
            currentBoardTitle={currentBoard.title}
            columns={columns}
            totalTasks={totalTasks}
            onClearAllTasks={handleClearAllTasks}
            username={username}
        />
    );

    const columnManagerComponent = (
        <ColumnManager
            columns={columns}
            onAddColumn={handleAddColumn}
            onDeleteColumn={handleDeleteColumn}
            onEditColumnTitle={handleEditColumnTitle}
        />
    );

    const boardContentComponent = (
        <BoardContent
            columns={columns}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
        />
    );

    return (
        <KanbanLayout
            sidebar={sidebarComponent}
            header={headerComponent}
            columnManager={columnManagerComponent}
            board={boardContentComponent}
        />
    );
};