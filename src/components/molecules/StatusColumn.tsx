import { useState } from "react";
import { TaskCard } from "./index.ts";
import { AddTaskForm } from "./AddTaskForm.tsx";
import { Button } from "../atoms";
import { Icon } from "../atoms";
import type { Task } from "../../types/kanban.ts";

type ColumnProps = {
    id: string;
    title: string;
    tasks: Task[];
    onAddTask?: (columnId: string, task: Task) => void;
    onDeleteTask?: (columnId: string, taskId: string) => void;
    onEditTask?: (columnId: string, task: Task) => void;
};

export const Column = ({
    id,
    title,
    tasks,
    onAddTask,
    onDeleteTask,
    onEditTask
}: ColumnProps) => {
    const [isAddingTask, setIsAddingTask] = useState(false);

    const handleAddTask = (task: Task) => {
        onAddTask?.(id, task);
        setIsAddingTask(false);
    };

    return (
        <div className="flex-shrink-0 w-80 h-fit bg-gray-100 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="font-bold text-lg text-gray-800">{title}</h2>
                    <p className="text-sm text-gray-500">{tasks.length} tasks</p>
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
                        onAddTask={handleAddTask}
                        onCancel={() => setIsAddingTask(false)}
                    />
                </div>
            )}

            <div className="space-y-2 min-h-96 max-h-96 overflow-y-auto pr-2">
                {tasks.length === 0 ? (
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

