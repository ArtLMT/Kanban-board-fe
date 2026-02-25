import { useState, useEffect } from "react";
import { taskApi } from "../api/taskApi";
import { statusApi } from "../api/statusApi";

import type { Task, CreateTaskRequest } from "../types/task";
import type { Status } from "../types/status";

export const useBoardData = (boardId: number | null) => {
    // Lưu trữ phẳng, không lồng nhau, mỗi cái là 1 mảng
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!boardId) {
            setStatuses([]);
            setTasks([]);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [apiStatuses, apiTasks] = await Promise.all([
                    statusApi.getByBoardId(boardId),
                    taskApi.getTasksByBoardId(boardId)
                ]);

                setStatuses(apiStatuses);
                setTasks(apiTasks);

            } catch (err: any) {
                console.error("Failed to load board data", err);
                setError(err.response?.data?.message || "Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [boardId]);

    const addStatus = async (name: string, color: string = "#e2e8f0") => {
        if (!boardId) return;
        try {
            const newStatus = await statusApi.create({
                name,
                color,
                boardId
                // position: statuses.length // Be tự tí nh rồi kh cần gửi nữa
            });
            setStatuses(prev => [...prev, newStatus]);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (statusId: number, newName: string) => {
        try {
            const updatedStatus = await statusApi.update(statusId, { name: newName });

            setStatuses(prev => prev.map(s => s.id === statusId ? updatedStatus : s));
        } catch (err) {
            console.error(err);
            setError("Failed to update status");
        }
    };

    const deleteStatus = async (statusId: number) => {
        try {
            await statusApi.delete(statusId);
            setStatuses(prev => prev.filter(s => s.id !== statusId));
            setTasks(prev => prev.filter(t => t.statusId !== statusId));
        } catch (err) {
            console.error(err);
        }
    };

    const addTask = async (statusId: number, taskData: { title: string, description?: string }) => {
        if (!boardId) return;
        try {
            const payload: CreateTaskRequest = {
                title: taskData.title,
                description: taskData.description,
                statusId,
                boardId
            };
            const createdTask = await taskApi.createTask(payload);

            setTasks(prev => [...prev, createdTask]);
        } catch (err) {
            console.error(err);
        }
    };

    const updateTask = async (task: Task) => {
        try {
            const updated = await taskApi.updateTask(task.id, {
                title: task.title,
                description: task.description,
                statusId: task.statusId,
                assigneeId: task.assignee?.id ? task.assignee.id : undefined
            });

            setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTask = async (taskId: number) => {
        try {
            await taskApi.deleteTask(taskId);
            setTasks(prev => prev.filter(t => t.id !== taskId));
        } catch (err) {
            console.error(err);
        }
    };

    //TODO: Xem cách xử lý Drag and Drop
    const moveTaskLocally = (taskId: number, newStatusId: number) => {
        setTasks(prev => prev.map(t =>
            t.id === taskId ? { ...t, statusId: newStatusId } : t
        ));
        // Sau này sẽ gọi API update position ở đây hoặc ở component DragDropContext
    };

    return {
        statuses,
        tasks,

        isLoading,
        error,

        addStatus,
        updateStatus,
        deleteStatus,
        addTask,
        updateTask,
        deleteTask,
        moveTaskLocally
    };
};