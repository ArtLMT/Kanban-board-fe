import { useState } from "react";
import { TaskCard } from "./index.ts";
import { AddTaskForm } from "./AddTaskForm.tsx";
import { Button } from "../atoms";
import { Icon } from "../atoms";
import type { Task } from "../../types/task";

type ColumnProps = {
    id: number;
    title: string;
    tasks: Task[];
    onAddTask?: (statusId: number, taskTitle: string) => void;
    onDeleteTask?: (statusId: number, taskId: number) => void;
    onEditTask?: (statusId: number, task: Task) => void;
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

    // Xử lý khi form submit task mới
    const handleAddTaskSubmit = (taskData: any) => {
        // Giả sử AddTaskForm trả về { title: "..." } hoặc object Task
        const title = taskData.title || taskData;
        if (typeof title === 'string') {
            onAddTask?.(id, title);
        }
        setIsAddingTask(false);
    };

    return (
        <div className="flex-shrink-0 w-80 h-fit bg-gray-100 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
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
                    {/* Bạn cần đảm bảo AddTaskForm trả về data phù hợp */}
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