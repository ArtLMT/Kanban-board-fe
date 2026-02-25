import React, { useEffect, useState } from "react";
import { Button, Input , Modal } from "../atoms";
import type { Status, CreateStatusRequest, UpdateStatusRequest } from "../../types/status";

const PRESET_COLORS = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Red", value: "#EF4444" },
    { name: "Green", value: "#10B981" },
    { name: "Yellow", value: "#F59E0B" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Teal", value: "#14B8A6" },
];

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateStatusRequest | UpdateStatusRequest) => void;
    status?: Status;
    boardId?: number;
    isLoading?: boolean;
}

export const StatusModal: React.FC<StatusModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    status,
    boardId,
    isLoading = false,
}) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#3B82F6");
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Initialize form with status data if editing
    useEffect(() => {
        if (status) {
            setName(status.name);
            setColor(status.color);
        } else {
            setName("");
            setColor("#3B82F6");
        }
        setErrors({});
    }, [status, isOpen]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) {
            newErrors.name = "Status name is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (status) {
            // Edit status
            const updateData: UpdateStatusRequest = {
                name: name.trim(),
                color,
            };
            onSubmit(updateData);
        } else {
            // Create status
            const createData: CreateStatusRequest = {
                name: name.trim(),
                color,
                boardId: boardId || 0,
            };
            onSubmit(createData);
        }

        handleClose();
    };

    const handleClose = () => {
        setName("");
        setColor("#3B82F6");
        setErrors({});
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={status ? "Edit Status" : "Create New Status"}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="Enter status name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    autoFocus
                >
                    Status Name *
                </Input>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color *
                    </label>

                    {/* Color Preset Buttons */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                        {PRESET_COLORS.map((preset) => (
                            <button
                                key={preset.value}
                                type="button"
                                onClick={() => setColor(preset.value)}
                                title={preset.name}
                                className={`w-full h-10 rounded-lg border-2 transition-all ${
                                    color === preset.value
                                        ? "border-gray-800 scale-105"
                                        : "border-gray-300 hover:border-gray-400"
                                }`}
                                style={{ backgroundColor: preset.value }}
                            />
                        ))}
                    </div>

                    {/* Custom Color Picker */}
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-12 h-10 rounded-lg cursor-pointer border border-gray-300"
                        />
                        <Input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            placeholder="#3B82F6"
                        />
                    </div>
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
                        {isLoading ? "Saving..." : status ? "Update Status" : "Create Status"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

