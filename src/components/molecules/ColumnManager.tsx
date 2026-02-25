import { useState } from "react";
import { Button, Icon, Input } from "../atoms";
import type { UIStatus } from "../../types/kanban";

type ColumnManagerProps = {
    columns: UIStatus[];
    onAddColumn: (name: string) => void;
    onDeleteColumn: (statusId: number) => void;
    onEditColumnTitle: (statusId: number, newName: string) => void;
};

export const ColumnManager = ({
                                  columns: statuses, // Alias columns thành statuses cho đúng ngữ nghĩa trong component
                                  onAddColumn,
                                  onDeleteColumn,
                                  onEditColumnTitle,
                              }: ColumnManagerProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");

    const handleAdd = () => {
        if (newName.trim()) {
            onAddColumn(newName);
            setNewName("");
            setIsAdding(false);
        }
    };

    const handleEdit = (id: number) => {
        if (editingName.trim()) {
            onEditColumnTitle(id, editingName);
            setEditingId(null);
            setEditingName("");
        }
    };

    const startEdit = (id: number, currentName: string) => {
        setEditingId(id);
        setEditingName(currentName);
    };

    return (
        <div className="bg-gray-50 border-b border-gray-200 px-8 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Status Manager
                    </h3>
                    {!isAdding && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsAdding(true)}
                            className="flex items-center gap-1"
                        >
                            <Icon name="plus" size="sm" />
                            Add Status
                        </Button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                        <div
                            key={status.id}
                            className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 group hover:border-gray-300 transition-colors"
                        >
                            {editingId === status.id ? (
                                <div className="flex gap-1 items-center">
                                    <input
                                        type="text"
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && handleEdit(status.id)}
                                        className="px-2 py-1 text-sm border border-blue-400 rounded focus:outline-none"
                                        autoFocus
                                    />
                                    <button onClick={() => handleEdit(status.id)} className="text-green-600"><Icon name="check" size="sm" /></button>
                                    <button onClick={() => setEditingId(null)} className="text-gray-400"><Icon name="x" size="sm" /></button>
                                </div>
                            ) : (
                                <>
                                    <span className="text-sm font-medium text-gray-700">
                                        {status.name} {/* Dùng .name thay vì .title */}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-1 bg-gray-100 px-1.5 rounded-full">
                                        {status.tasks?.length || 0}
                                    </span>
                                    <button
                                        onClick={() => startEdit(status.id, status.name)}
                                        className="p-1 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Icon name="edit" size="sm" />
                                    </button>
                                    {statuses.length > 0 && (
                                        <button
                                            onClick={() => {
                                                if (window.confirm(`Delete status "${status.name}"?`)) onDeleteColumn(status.id);
                                            }}
                                            className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Icon name="trash" size="sm" />
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}

                    {isAdding && (
                        <div className="inline-flex gap-2">
                            <Input
                                type="text"
                                placeholder="Status name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                                className="w-32"
                            />
                            <Button variant="primary" size="sm" onClick={handleAdd} disabled={!newName.trim()}>Add</Button>
                            <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>Cancel</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};