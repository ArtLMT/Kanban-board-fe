import { useState } from "react";
import { TaskCard } from "./index.ts";
import { AddTaskForm } from "./AddTaskForm.tsx";
import { Button, Icon } from "../atoms";
import type { Task } from "../../types/task";

type StatusProps = {
    id: number;
    title: string;
    color?: string;
    tasks: Task[];
    onAddTask?: (statusId: number, taskData: { title: string, description?: string }) => void;
    onDeleteTask?: (statusId: number, taskId: number) => void;
    onEditTask?: (statusId: number, task: Task) => void;
};

export const Status = ({
                           id,
                           title,
                           color,
                           tasks,
                           onAddTask,
                           onDeleteTask,
                           onEditTask
                       }: StatusProps) => {
    const [isAddingTask, setIsAddingTask] = useState(false);

    const handleAddTaskSubmit = (formData: { title: string; description: string }) => {
        onAddTask?.(id, {
            title: formData.title,
            description: formData.description || undefined
        });

        setIsAddingTask(false);
    };

    return (
        <div className="flex-shrink-0 w-80 h-fit bg-gray-100 rounded-lg p-4 border border-gray-200"
             style={{
                 borderColor: '#e5e7eb', // Viền xung quanh nhạt
                 borderTopColor: color || '#64748b', // Viền trên lấy theo màu status
                 borderTopWidth: '10px'
             }}
        >
            <div className="flex justify-between items-center mb-4"
                 // style={{ backgroundColor: color || '#e2e8f0' }}
            >
                <div>
                    <h2 className="font-bold text-lg text-gray-800">{title}</h2>
                    <p className="text-sm text-gray-500">{tasks?.length || 0} tasks</p>
                </div>
                {!isAddingTask && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAddingTask(true)}
                        className="p-2"
                        title="Add task"
                    >
                        <Icon name="plus" size="md" />
                    </Button>
                )}
            </div>

            {isAddingTask && (
                <div className="mb-4">
                    <AddTaskForm
                        onAddTask={handleAddTaskSubmit}
                        onCancel={() => setIsAddingTask(false)}
                    />
                </div>
            )}

            <div className="space-y-2 min-h-[100px] max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {(!tasks || tasks.length === 0) ? (
                    <div className="flex items-center justify-center h-32 text-gray-400">
                        <p className="text-sm text-center">No tasks yet</p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={(taskId) => onDeleteTask?.(id, taskId)}
                            onEdit={(updatedTask) => onEditTask?.(id, updatedTask)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};