import React from "react";
import { Icon } from "../atoms";
import type { UIBoard } from "../../types/kanban";

interface KanbanSidebarProps {
    boards: UIBoard[];
    currentBoardId: number | null; // ID là number
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    isCreatingBoard: boolean;
    setIsCreatingBoard: (creating: boolean) => void;
    newBoardName: string;
    setNewBoardName: (name: string) => void;
    handleCreateBoard: () => void;
    handleDeleteBoard: (boardId: number) => void;
    handleSelectBoard: (boardId: number) => void;
}

export const KanbanSidebar: React.FC<KanbanSidebarProps> = ({
                                                                boards,
                                                                currentBoardId,
                                                                sidebarOpen,
                                                                setSidebarOpen,
                                                                isCreatingBoard,
                                                                setIsCreatingBoard,
                                                                newBoardName,
                                                                setNewBoardName,
                                                                handleCreateBoard,
                                                                handleDeleteBoard,
                                                                handleSelectBoard,
                                                            }) => {
    return (
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-sm`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {sidebarOpen && (
                    <h2 className="text-lg font-bold text-gray-900">Boards</h2>
                )}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title={sidebarOpen ? "Collapse" : "Expand"}
                >
                    <Icon name="menu" size="md" />
                </button>
            </div>

            {/* Boards List */}
            <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-2">
                    {boards.map((board) => (
                        <div
                            key={board.id}
                            className={`relative group ${
                                currentBoardId === board.id
                                    ? 'bg-blue-50 border border-blue-200'
                                    : 'border border-transparent hover:bg-gray-50'
                            } rounded-lg transition-all`}
                        >
                            <button
                                onClick={() => handleSelectBoard(board.id)}
                                className={`w-full text-left px-3 py-2 rounded transition-colors flex items-center gap-2 min-h-10`}
                                title={board.title}
                            >
                                {currentBoardId === board.id && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                )}
                                {sidebarOpen && (
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {board.title}
                                        </p>
                                        {/*<p className="text-xs text-gray-500">*/}
                                        {/*    {board.statuses?.reduce((acc, status) => acc + (status.tasks?.length || 0), 0) || 0} tasks*/}
                                        {/*</p>*/}
                                    </div>
                                )}
                            </button>
                            {/* Delete Button Logic */}
                            <button
                                onClick={() => {
                                    if (window.confirm(`Delete "${board.title}"?`)) {
                                        handleDeleteBoard(board.id);
                                    }
                                }}
                                className={`absolute -right-2 -top-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 ${
                                    sidebarOpen ? '' : 'hidden'
                                }`}
                                title="Delete board"
                            >
                                <Icon name="x" size="sm" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Board Section */}
            {sidebarOpen && (
                <div className="border-t border-gray-200 p-3">
                    {!isCreatingBoard ? (
                        <button
                            onClick={() => setIsCreatingBoard(true)}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors font-medium text-sm"
                        >
                            <Icon name="plus" size="sm" />
                            New Board
                        </button>
                    ) : (
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Board name"
                                value={newBoardName}
                                onChange={(e) => setNewBoardName(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleCreateBoard()}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCreateBoard}
                                    disabled={!newBoardName.trim()}
                                    className="flex-1 px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
                                >
                                    Create
                                </button>
                                <button
                                    onClick={() => {
                                        setIsCreatingBoard(false);
                                        setNewBoardName("");
                                    }}
                                    className="flex-1 px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </aside>
    );
};