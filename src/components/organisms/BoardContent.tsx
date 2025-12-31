import React, {useMemo} from 'react';
import { Status} from "../molecules";
import { Icon } from "../atoms";
import type { UIStatus } from "../../types/kanban";
import type { Task } from "../../types/task";

interface BoardContentProps {
    columns: UIStatus[];
    onAddTask: (statusId: number, taskData: { title: string, description?: string }) => void;    onDeleteTask: (statusId: number, taskId: number) => void;
    onEditTask: (statusId: number, task: Task) => void;
}

export const BoardContent: React.FC<BoardContentProps> = ({
                                                              columns: statuses, // Alias
                                                              onAddTask,
                                                              onDeleteTask,
                                                              onEditTask
                                                          }) => {
    // Dùng useMemo để tránh sort lại mỗi khi re-render nếu data không đổi
    const sortedStatuses = useMemo(() => {
        return [...statuses].sort((a, b) => (a.position || 0) - (b.position || 0));
    }, [statuses]);

    return (
        <div className="px-8 py-6 h-full overflow-x-auto">
            {statuses.length === 0 ? (
                <div className="flex items-center justify-center h-96 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center">
                        <Icon name="inbox" size="lg" className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 font-medium">No statuses found</p>
                        <p className="text-gray-500 text-sm">Create a status column to start adding tasks.</p>
                    </div>
                </div>
            ) : (
                <div className="flex gap-6 pb-4 h-full">
                        {sortedStatuses.map((status) => (
                                <Status
                                    key={status.id}
                                    id={status.id}
                                    color={status.color}
                                    title={status.name}
                                    tasks={status.tasks}
                                    onAddTask={onAddTask}
                                    onDeleteTask={onDeleteTask}
                                    onEditTask={onEditTask}
                                />
                            ))}

                </div>
            )}
        </div>
    );
};