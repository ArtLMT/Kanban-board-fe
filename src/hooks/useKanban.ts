import { useState } from "react";
import { mockBoards, createDefaultBoard, createDefaultColumn } from "../api/mockKanbanData";
import type { Board, Task } from "../types/kanban";

export const useKanban = () => {
    const [boards, setBoards] = useState<Board[]>(mockBoards);
    const [currentBoardId, setCurrentBoardId] = useState<string>(mockBoards[0]?.id || "");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isCreatingBoard, setIsCreatingBoard] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");


    const currentBoard = boards.find(b => b.id === currentBoardId);

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

    const handleCreateBoard = () => {
        if (!newBoardName.trim()) return;
        const newBoard = createDefaultBoard(newBoardName);
        setBoards(prev => [...prev, newBoard]);
        setCurrentBoardId(newBoard.id);
        setNewBoardName("");
        setIsCreatingBoard(false);
    };

    const handleAddColumn = (title: string) => {
        const newColumn = createDefaultColumn(title, currentBoardId);
        setBoards(prev =>
            prev.map(board =>
                board.id === currentBoardId
                    ? { ...board, columns: [...board.columns, newColumn] }
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

    const handleDeleteColumn = (columnId: string) => {
        setBoards(prev =>
            prev.map(board =>
                board.id === currentBoardId
                    ? { ...board, columns: board.columns.filter(col => col.id !== columnId) }
                    : board
            )
        );
    };

    const handleSelectBoard = (id: string) => {
        setCurrentBoardId(id);
    };

    const handleDeleteBoard = (id: string) => {
        const newBoards = boards.filter(b => b.id !== id);
        setBoards(newBoards);
        // Nếu xóa board đang chọn, chuyển về board đầu tiên nếu còn
        if (currentBoardId === id && newBoards.length > 0) {
            setCurrentBoardId(newBoards[0].id);
        }
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


    return {
        boards,
        currentBoard,
        currentBoardId,
        sidebarOpen,
        isCreatingBoard,
        newBoardName,

        setSidebarOpen,
        setIsCreatingBoard,
        setNewBoardName,
        setCurrentBoardId,

        handleAddTask,
        handleDeleteTask,
        handleClearAllTasks,
        handleEditTask,

        handleAddColumn,
        handleEditColumnTitle,
        handleDeleteColumn,
        handleSelectBoard,
        handleDeleteBoard,
        handleCreateBoard,

    };
};
