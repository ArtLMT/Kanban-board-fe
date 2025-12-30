import React, { useContext } from "react";
import { ColumnManager, KanbanHeader, KanbanSidebar } from "../components/molecules";
import { BoardContent } from "../components/organisms/";
import { KanbanLayout } from "../components/templates/KanbanKayout.tsx";
import { useKanban } from "../hooks/useKanban.ts";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api.ts";

export const KanbanPage: React.FC = () => {
    const { user, setUser } = useContext(AuthContext);
    const kanban = useKanban();

    // 1. Thêm loading state để tránh lỗi khi data chưa về
    if (kanban.isLoading) {
        return <div className="p-4 text-white">Loading board data...</div>;
    }

    // 2. Kiểm tra board
    if (!kanban.currentBoard) {
        return (
            <div className="flex h-screen">
                {/* Vẫn render Sidebar để người dùng có thể tạo board mới nếu list rỗng */}
                <KanbanSidebar
                    boards={kanban.boards}
                    currentBoardId={kanban.currentBoardId}
                    sidebarOpen={kanban.sidebarOpen}
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

    // 3. QUAN TRỌNG: Map statuses (từ API) vào biến columns (để UI cũ không bị gãy)
    // Sau này bạn nên vào các component con đổi props 'columns' thành 'statuses' cho chuẩn
    const columns = kanban.currentBoard.statuses || [];

    // Tính tổng task (thêm optional chaining ?. để an toàn)
    const totalTasks = columns.reduce((acc, col) => acc + (col.tasks?.length || 0), 0);

    const sidebarComponent = (
        <KanbanSidebar
            boards={kanban.boards}
            currentBoardId={kanban.currentBoardId}
            sidebarOpen={kanban.sidebarOpen}
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
            // Sửa .title thành .boardName
            currentBoardTitle={kanban.currentBoard.boardName}
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
            onAddColumn={kanban.handleAddStatus}
            onDeleteColumn={kanban.handleDeleteStatus}
            onEditColumnTitle={kanban.handleUpdateStatus}
        />
    );

    const boardContentComponent = (
        <BoardContent
            columns={columns}
            onAddTask={kanban.handleAddTask}
            onDeleteTask={kanban.handleDeleteTask}
            onEditTask={kanban.handleEditTask}
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