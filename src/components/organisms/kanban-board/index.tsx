import { useState } from "react";
import { Column } from "../../molecules/column";
import { Button } from "../../atoms/button/Button.tsx";
import { Icon } from "../../atoms/icon";
import type { Column as ColumnType, Task } from "../../../types/kanban";

export const KanbanBoard = () => {
    const [columns, setColumns] = useState<ColumnType[]>([
        {
            id: '1',
            title: 'To Do',
            tasks: [
                {
                    id: '1',
                    title: 'Design landing page',
                    description: 'Create wireframes and mockups for the landing page',
                    priority: 'high'
                },
                {
                    id: '2',
                    title: 'Setup project repository',
                    description: 'Initialize Git repo and configure build tools',
                    priority: 'high'
                }
            ]
        },
        {
            id: '2',
            title: 'In Progress',
            tasks: [
                {
                    id: '3',
                    title: 'Implement authentication',
                    description: 'Add login/signup functionality',
                    priority: 'high'
                },
                {
                    id: '4',
                    title: 'Build dashboard UI',
                    priority: 'medium'
                }
            ]
        },
        {
            id: '3',
            title: 'In Review',
            tasks: [
                {
                    id: '5',
                    title: 'API integration',
                    description: 'Connect frontend to backend APIs',
                    priority: 'medium'
                }
            ]
        },
        {
            id: '4',
            title: 'Done',
            tasks: [
                {
                    id: '6',
                    title: 'Project setup',
                    priority: 'high'
                },
                {
                    id: '7',
                    title: 'Database schema design',
                    priority: 'medium'
                }
            ]
        }
    ]);

    const handleAddTask = (columnId: string, task: Task) => {
        setColumns(columns.map(col =>
            col.id === columnId
                ? { ...col, tasks: [...col.tasks, task] }
                : col
        ));
    };

    const handleDeleteTask = (columnId: string, taskId: string) => {
        setColumns(columns.map(col =>
            col.id === columnId
                ? { ...col, tasks: col.tasks.filter(t => t.id !== taskId) }
                : col
        ));
    };

    const handleEditTask = (columnId: string, task: Task) => {
        // TODO: Implement edit functionality with modal
        console.log('Edit task:', columnId, task);
    };

    const handleClearAllTasks = () => {
        if (window.confirm('Are you sure you want to clear all tasks?')) {
            setColumns(columns.map(col => ({ ...col, tasks: [] })));
        }
    };

    const totalTasks = columns.reduce((acc, col) => acc + col.tasks.length, 0);
    const completedTasks = columns.find(col => col.id === '4')?.tasks.length || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Kanban Board
                        </h1>
                        <p className="text-gray-400">
                            Manage your tasks and workflow efficiently
                        </p>
                    </div>
                    <Button
                        variant="danger"
                        onClick={handleClearAllTasks}
                        className="flex items-center gap-2"
                    >
                        <Icon name="trash" size="sm" />
                        Clear All
                    </Button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-blue-500 bg-opacity-20 border border-blue-500 rounded-lg p-4">
                        <p className="text-blue-200 text-sm">Total Tasks</p>
                        <p className="text-3xl font-bold text-blue-400">{totalTasks}</p>
                    </div>
                    <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-lg p-4">
                        <p className="text-green-200 text-sm">Completed</p>
                        <p className="text-3xl font-bold text-green-400">{completedTasks}</p>
                    </div>
                    <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-lg p-4">
                        <p className="text-yellow-200 text-sm">In Progress</p>
                        <p className="text-3xl font-bold text-yellow-400">
                            {columns.find(col => col.id === '2')?.tasks.length || 0}
                        </p>
                    </div>
                    <div className="bg-purple-500 bg-opacity-20 border border-purple-500 rounded-lg p-4">
                        <p className="text-purple-200 text-sm">To Review</p>
                        <p className="text-3xl font-bold text-purple-400">
                            {columns.find(col => col.id === '3')?.tasks.length || 0}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        tasks={column.tasks}
                        onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                        onEditTask={handleEditTask}
                    />
                ))}
            </div>
        </div>
    );
};

