import { useState } from "react";
import { Button, Icon, Input } from "../atoms";
import type { Column } from "../../types/kanban";

type ColumnManagerProps = {
    columns: Column[];
    onAddColumn: (title: string) => void;
    onDeleteColumn: (columnId: string) => void;
    onEditColumnTitle: (columnId: string, newTitle: string) => void;
};

export const ColumnManager = ({
    columns,
    onAddColumn,
    onDeleteColumn,
    onEditColumnTitle,
}: ColumnManagerProps) => {
    const [isAddingColumn, setIsAddingColumn] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");
    const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState("");

    const handleAddColumn = () => {
        if (newColumnName.trim()) {
            onAddColumn(newColumnName);
            setNewColumnName("");
            setIsAddingColumn(false);
        }
    };

    const handleEditColumn = (columnId: string) => {
        if (editingTitle.trim() && editingTitle !== columns.find(c => c.id === columnId)?.title) {
            onEditColumnTitle(columnId, editingTitle);
            setEditingColumnId(null);
            setEditingTitle("");
        } else {
            setEditingColumnId(null);
            setEditingTitle("");
        }
    };

    const handleStartEdit = (columnId: string, currentTitle: string) => {
        setEditingColumnId(columnId);
        setEditingTitle(currentTitle);
    };

    return (
        <div className="bg-gray-50 border-b border-gray-200 px-8 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Status Columns
                    </h3>
                    {!isAddingColumn && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsAddingColumn(true)}
                            className="flex items-center gap-1"
                        >
                            <Icon name="plus" size="sm" />
                            Add Status
                        </Button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    {columns.map((column) => (
                        <div
                            key={column.id}
                            className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 group hover:border-gray-300 transition-colors"
                        >
                            {editingColumnId === column.id ? (
                                <div className="flex gap-1 items-center">
                                    <input
                                        type="text"
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                handleEditColumn(column.id);
                                            }
                                        }}
                                        className="px-2 py-1 text-sm border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => handleEditColumn(column.id)}
                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                        title="Save"
                                    >
                                        <Icon name="check" size="sm" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingColumnId(null);
                                            setEditingTitle("");
                                        }}
                                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                                        title="Cancel"
                                    >
                                        <Icon name="x" size="sm" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span className="text-sm font-medium text-gray-700">
                                        {column.title}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-1">
                                        {column.tasks.length}
                                    </span>
                                    <button
                                        onClick={() => handleStartEdit(column.id, column.title)}
                                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Edit column"
                                    >
                                        <Icon name="edit" size="sm" />
                                    </button>
                                    {columns.length > 3 && (
                                        <button
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        `Delete "${column.title}" and its tasks?`
                                                    )
                                                ) {
                                                    onDeleteColumn(column.id);
                                                }
                                            }}
                                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete column"
                                        >
                                            <Icon name="trash" size="sm" />
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}

                    {isAddingColumn && (
                        <div className="inline-flex gap-2">
                            <Input
                                type="text"
                                placeholder="Column name"
                                value={newColumnName}
                                onChange={(e) => setNewColumnName(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleAddColumn()}
                                className="w-32"
                            />
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleAddColumn}
                                disabled={!newColumnName.trim()}
                                className="whitespace-nowrap"
                            >
                                Add
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setIsAddingColumn(false);
                                    setNewColumnName("");
                                }}
                                className="whitespace-nowrap"
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

