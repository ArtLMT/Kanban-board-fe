import React from "react";
import { ColumnManager, KanbanHeader, KanbanSidebar } from "../components/molecules";
import { BoardContent } from "../components/organisms/";
import { KanbanLayout } from "../components/templates/KanbanKayout.tsx";
import { useKanban } from "../hooks/useKanban.ts";

interface KanbanPageProps {
    username: string;
    onLogout?: () => void;
}

export const KanbanPage: React.FC<KanbanPageProps> = ({ username, onLogout }) => {
    const kanban = useKanban();


    if (!kanban.currentBoard) {
        return <div>Board not found</div>;
    }

    const columns = kanban.currentBoard.columns;
    const totalTasks = columns.reduce((acc, col) => acc + col.tasks.length, 0);



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
            currentBoardTitle={kanban.currentBoard.title}
            columns={columns}
            totalTasks={totalTasks}
            onClearAllTasks={kanban.handleClearAllTasks}
            username={username}
            onLogout={onLogout}
        />
    );

    const columnManagerComponent = (
        <ColumnManager
            columns={columns}
            onAddColumn={kanban.handleAddColumn}
            onDeleteColumn={kanban.handleDeleteColumn}
            onEditColumnTitle={kanban.handleEditColumnTitle}
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