import { useState } from "react";

import {useBoards} from "./useBoards";
import {useBoardData} from "./useBoardData.ts";
import type {Task} from "../types/task.ts";

export const useKanban = () => {
    const boardManager = useBoards();
    const boardDataHook = useBoardData(boardManager.currentBoardId);

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    // 1. Thêm state lưu task đang edit
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

    // 2. State lưu cột đang chọn để tạo mới (như cũ)
    const [selectedStatusIdForTask, setSelectedStatusIdForTask] = useState<number | undefined>(undefined);

    // Hàm mở modal tạo mới
    const openCreateTaskModal = (statusId?: number) => {
        setEditingTask(undefined); // Đảm bảo không có task edit
        setSelectedStatusIdForTask(statusId);
        setIsTaskModalOpen(true);
    };

    // 3. Thêm hàm mở modal edit
    const openEditTaskModal = (task: Task) => {
        setEditingTask(task); // Lưu task cần sửa
        setSelectedStatusIdForTask(undefined);
        setIsTaskModalOpen(true);
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setEditingTask(undefined); // Reset
        setSelectedStatusIdForTask(undefined);
    };

    return {
        ...boardManager,

        ...boardDataHook,

        isSidebarOpen,
        setSidebarOpen,

        editingTask,             // Export ra để dùng
        openCreateTaskModal,
        openEditTaskModal,       // Export ra để dùng
        closeTaskModal,

        selectedStatusIdForTask,
        isTaskModalOpen,

        isLoading: boardManager.isLoading || boardDataHook.isLoading,
        error: boardManager.error || boardDataHook.error
    };
};