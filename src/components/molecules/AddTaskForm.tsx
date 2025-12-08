import React, { useState } from "react";
import { Input, Button } from "../atoms";
import type { Task, Priority } from "../../types/kanban.ts";

type AddTaskFormProps = {
    onAddTask: (task: Task) => void;
    onCancel?: () => void;
};

export const AddTaskForm = ({
    onAddTask,
    onCancel
}: AddTaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTask({
                id: Date.now().toString(),
                title: title.trim(),
                description: description.trim() || undefined,
                priority
            });
            setTitle('');
            setDescription('');
            setPriority('medium');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <Input
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            >
                Task Title *

            </Input>

            <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    placeholder="Enter task description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    rows={3}
                />
            </div>

            <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                </label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="mt-4 flex gap-2">
                <Button type="submit" variant="primary" size="md">
                    Add Task
                </Button>
                {onCancel && (
                    <Button
                        type="button"
                        variant="secondary"
                        size="md"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};

