import React, { useContext } from "react";
import {ColumnManager, KanbanHeader, KanbanSidebar, TaskModal} from "../components/molecules";
import { BoardContent } from "../components/organisms/";
import { KanbanLayout } from "../components/templates/KanbanKayout.tsx";
import { useKanban } from "../hooks/useKanban.ts";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api.ts";

export const KanbanPage: React.FC = () => {
    const { user, setUser } = useContext(AuthContext);
    const kanban = useKanban();

    const rawStatuses = kanban.statuses || [];
    const rawTasks = kanban.tasks || [];

    const columns = rawStatuses.map(status => {
        const tasksInThisStatus = rawTasks.filter(t => t.statusId === status.id);

        return {
            ...status,
            tasks: tasksInThisStatus
        };
    });

    const boardsForSidebar = kanban.boards.map(board => {
        if (board.id === kanban.currentBoardId) {
            return {
                ...board,
                statuses: columns // chỗ này sai rồi nè
            };
        }
        return board;
    });

    // const totalTasks = columns.reduce((acc, col) => acc + (col.tasks?.length || 0), 0);
    const totalTasks = rawTasks.length;

    if (kanban.isLoading) {
        return <div className="p-4 text-white">Loading board data...</div>;
    }

    // 2. Kiểm tra board
    if (!kanban.currentBoard) {
        return (
            <div className="flex h-screen">
                <KanbanSidebar
                    boards={boardsForSidebar}
                    currentBoardId={kanban.currentBoardId}
                    sidebarOpen={kanban.isSidebarOpen}
                    setSidebarOpen={kanban.setSidebarOpen}
                    isCreatingBoard={kanban.isCreatingBoard}
                    setIsCreatingBoard={kanban.setIsCreatingBoard}
                    newBoardName={kanban.newBoardName}
                    setNewBoardName={kanban.setNewBoardName}
                    handleCreateBoard={kanban.handleCreateBoard}
                    handleDeleteBoard={kanban.handleDeleteBoard}
                    handleSelectBoard={kanban.handleSelectBoard}
                />
                <div className="flex-1 flex items-center justify-center text-gray-400">
                    No board selected. Please create or select a board.
                </div>
            </div>
        );
    }

    const sidebarComponent = (
        <KanbanSidebar
            boards={kanban.boards}
            currentBoardId={kanban.currentBoardId}
            sidebarOpen={kanban.isSidebarOpen}
            setSidebarOpen={kanban.setSidebarOpen}
            isCreatingBoard={kanban.isCreatingBoard}
            setIsCreatingBoard={kanban.setIsCreatingBoard}
            newBoardName={kanban.newBoardName}
            setNewBoardName={kanban.setNewBoardName}
            handleCreateBoard={kanban.handleCreateBoard}
            handleDeleteBoard={kanban.handleDeleteBoard}
            handleSelectBoard={kanban.handleSelectBoard}
        />
    );

    const headerComponent = (
        <KanbanHeader
            currentBoardTitle={kanban.currentBoard.title}
            columns={columns}
            totalTasks={totalTasks}
            // Hàm này chưa implement trong hook mới, tạm thời để trống hoặc comment
            onClearAllTasks={() => console.log("Clear all not implemented via API yet")}
            username={user?.username || "Guest"} // Thêm check null cho user
            onLogout={async () => {
                try {
                    await api.post("/api/auth/logout");
                    setUser(null);
                } catch (error) {
                    console.error("Logout failed", error);
                    // Force logout ở client nếu API lỗi
                    setUser(null);
                }
            }}
        />
    );

    const columnManagerComponent = (
        <ColumnManager
            columns={columns}
            // Cập nhật tên hàm mới: Status thay vì Column
            onAddColumn={kanban.addStatus}
            onDeleteColumn={kanban.deleteStatus}
            onEditColumnTitle={kanban.updateStatus}
        />
    );

    const boardContentComponent = (
        <BoardContent
            columns={columns}
            onOpenCreateTask={(statusId) => kanban.openCreateTaskModal(statusId)}
            onDeleteTask={kanban.deleteTask}
            onEditTask={(task) => kanban.openEditTaskModal(task)}
        />
    );

    return (
        <>
        <KanbanLayout
            sidebar={sidebarComponent}
            header={headerComponent}
            columnManager={columnManagerComponent}
            board={boardContentComponent}
        />
            <TaskModal
                isOpen={kanban.isTaskModalOpen}
                onClose={kanban.closeTaskModal}
                statuses={kanban.statuses}
                isLoading={kanban.isLoading}

                initialStatusId={kanban.selectedStatusIdForTask}
                task={kanban.editingTask}

                onSubmit={async (data) => {
                    if (kanban.editingTask) {
                        await kanban.updateTask({
                            ...kanban.editingTask,
                            title: data.title,
                            description: data.description,
                            statusId: Number(data.statusId)
                        });
                    } else {
                        if ('title' in data && 'statusId' in data) {
                            await kanban.addTask(Number(data.statusId), {
                                title: data.title,
                                description: data.description
                            });
                        }
                    }
                    // Đóng modal sau khi xong
                    kanban.closeTaskModal();
                }}
            />

        </>

    );
};