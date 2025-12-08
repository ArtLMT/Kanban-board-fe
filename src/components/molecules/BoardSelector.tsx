import { useState } from "react";
import { Button, Icon, Input, Card } from "../atoms";
import type { Board } from "../../types/kanban";

type BoardSelectorProps = {
    boards: Board[];
    currentBoardId: string;
    onSelectBoard: (boardId: string) => void;
    onCreateBoard: (title: string) => void;
    onDeleteBoard: (boardId: string) => void;
};

export const BoardSelector = ({
    boards,
    currentBoardId,
    onSelectBoard,
    onCreateBoard,
    onDeleteBoard,
}: BoardSelectorProps) => {
    const [isCreatingBoard, setIsCreatingBoard] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");

    const handleCreateBoard = () => {
        if (newBoardName.trim()) {
            onCreateBoard(newBoardName);
            setNewBoardName("");
            setIsCreatingBoard(false);
        }
    };

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-8 py-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">Kanban Boards</h1>
                    {!isCreatingBoard && (
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setIsCreatingBoard(true)}
                            className="flex items-center gap-2"
                        >
                            <Icon name="plus" size="sm" />
                            New Board
                        </Button>
                    )}
                </div>

                {isCreatingBoard && (
                    <Card variant="elevated" className="mb-4 p-4">
                        <div className="flex gap-2 items-end">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="Enter board name"
                                    value={newBoardName}
                                    onChange={(e) => setNewBoardName(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleCreateBoard()}
                                    autoFocus
                                />
                            </div>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleCreateBoard}
                                disabled={!newBoardName.trim()}
                            >
                                Create
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setIsCreatingBoard(false);
                                    setNewBoardName("");
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Card>
                )}

                <div className="flex flex-wrap gap-3">
                    {boards.map((board) => (
                        <div
                            key={board.id}
                            className={`relative group cursor-pointer transition-all ${
                                currentBoardId === board.id
                                    ? "ring-2 ring-blue-500"
                                    : ""
                            }`}
                        >
                            <button
                                onClick={() => onSelectBoard(board.id)}
                                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                                    currentBoardId === board.id
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }`}
                            >
                                {board.title}
                                <span className="ml-2 text-sm opacity-75">
                                    ({board.columns.reduce((acc, col) => acc + col.tasks.length, 0)})
                                </span>
                            </button>
                            {boards.length > 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (
                                            window.confirm(
                                                `Are you sure you want to delete "${board.title}"?`
                                            )
                                        ) {
                                            onDeleteBoard(board.id);
                                        }
                                    }}
                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    title="Delete board"
                                >
                                    <Icon name="trash" size="sm" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

