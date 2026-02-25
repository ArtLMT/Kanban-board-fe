import React from "react";
import { Button, Icon } from "../atoms";
import type { UIStatus } from "../../types/kanban.ts";

interface KanbanHeaderProps {
    currentBoardTitle: string;
    columns: UIStatus[];
    totalTasks: number;
    onClearAllTasks: () => void;
    username: string;
    onLogout?: () => void;
}

export const KanbanHeader: React.FC<KanbanHeaderProps> = ({
                                                              currentBoardTitle,
                                                              columns,
                                                              totalTasks,
                                                              onClearAllTasks,
                                                              username,
                                                              onLogout,
                                                          }) => {
    const columnsCount = columns.length;

    // Phần Board Info
    const boardInfo = (
        <div className="flex items-center gap-4">
            <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{currentBoardTitle}</p>
                <p className="text-sm text-gray-500">
                    {totalTasks} task{totalTasks !== 1 ? 's' : ''} • {columnsCount} column{columnsCount !== 1 ? 's' : ''}
                </p>
            </div>
            {totalTasks > 0 && (
                <Button
                    variant="danger"
                    onClick={onClearAllTasks}
                    className="flex items-center gap-2 whitespace-nowrap"
                >
                    <Icon name="trash" size="sm" />
                    Clear All
                </Button>
            )}
        </div>
    );

    // Phần User Profile
    const userProfile = (
        <div className="flex items-center gap-3 ml-4">
            <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">{username}</span>
                {onLogout && (
                    <button
                        onClick={onLogout}
                        className="text-xs text-gray-500 hover:text-red-500 transition-colors font-medium"
                    >
                        Logout
                    </button>
                )}
            </div>
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm border border-purple-300">
                {username.charAt(0).toUpperCase()}
            </div>
        </div>
    );

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-8 py-4 flex items-center justify-between">
                {/* Board Title/App Title */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Kanban Board</h1>
                    <p className="text-gray-600 text-sm mt-1">Manage your projects and tasks efficiently</p>
                </div>

                {/* Board Info (from KanbanBoard) and User Info (static here) */}
                <div className="flex items-center">
                    {boardInfo}
                    <div className="h-8 w-px bg-gray-200 mx-4"></div> {/* Divider */}
                    {userProfile}
                </div>
            </div>
        </header>
    );
};