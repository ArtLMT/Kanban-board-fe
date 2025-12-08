import React from 'react';
import { Column } from "../molecules";
import { Icon } from "../atoms";
import type { Column as ColumnType, Task } from "../../types/kanban.ts";

interface BoardContentProps {
    columns: ColumnType[];
    onAddTask: (columnId: string, task: Task) => void;
    onDeleteTask: (columnId: string, taskId: string) => void;
    onEditTask: (columnId: string, task: Task) => void;
}

export const BoardContent: React.FC<BoardContentProps> = ({
                                                              columns,
                                                              onAddTask,
                                                              onDeleteTask,
                                                              onEditTask
                                                          }) => {
    return (
        <div className="px-8 py-6">
            {columns.length === 0 ? (
                <div className="flex items-center justify-center h-96 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center">
                        <Icon name="inbox" size="lg" className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 font-medium">No status columns yet</p>
                        <p className="text-gray-500 text-sm">Create one using the "Add Status" button above</p>
                    </div>
                </div>
            ) : (
                <div className="flex gap-6 pb-4">
                    {columns.map((column) => (
                        <Column
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            tasks={column.tasks}
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