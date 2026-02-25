import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "../atoms";
import type { Task, CreateTaskRequest, UpdateTaskRequest } from "../../types/task";
import type { Status } from "../../types/status";

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateTaskRequest | UpdateTaskRequest) => void;
    task?: Task;
    statuses: Status[];
    isLoading?: boolean;
    initialStatusId?: number;
}

export const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    task,
    statuses,
    isLoading = false,
    initialStatusId,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [statusId, setStatusId] = useState<number | string>("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        // Chỉ reset form khi modal được MỞ (isOpen = true)
        if (isOpen) {
            if (task) {
                setTitle(task.title);
                setDescription(task.description || "");
                setStatusId(task.statusId || "");
            } else {
                setTitle("");
                setDescription("");

                setStatusId(initialStatusId || statuses[0]?.id || "");
            }
            setErrors({});
        }
    }, [task, isOpen, statuses, initialStatusId]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!title.trim()) {
            newErrors.title = "Task title is required";
        }

        if (!statusId) {
            newErrors.statusId = "Status is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (task) {
            // Edit task
            const updateData: UpdateTaskRequest = {
                title: title.trim(),
                description: description.trim(),
                statusId: Number(statusId),
            };
            onSubmit(updateData);
        } else {
            // Create task - needs boardId and statusId
            const createData: CreateTaskRequest = {
                title: title.trim(),
                description: description.trim() || undefined,
                statusId: Number(statusId),
                boardId: 0, // Will be set by parent component
            };
            onSubmit(createData);
        }

        handleClose();
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setStatusId("");
        setErrors({});
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={task ? "Edit Task" : "Create New Task"}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={errors.title}
                    autoFocus
                >
                    Task Title *
                </Input>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        placeholder="Enter task description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                    </label>
                    <select
                        value={statusId}
                        onChange={(e) => setStatusId(e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.statusId ? "border-red-500 focus:ring-red-500" : ""
                        }`}
                    >
                        <option value="">Select a status</option>
                        {statuses.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                    {errors.statusId && (
                        <p className="mt-1 text-sm text-red-500">{errors.statusId}</p>
                    )}
                </div>

                <div className="flex gap-2 justify-end pt-4">
                    <Button
                        variant="ghost"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : task ? "Update Task" : "Create Task"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

