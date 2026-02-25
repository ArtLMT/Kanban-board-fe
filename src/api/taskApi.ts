import api from "./api.ts"

import type {
    Task,
    CreateTaskRequest,
    UpdateTaskRequest
} from "../types/task.ts";

export const taskApi = {
    //  GET /tasks?boardId=...
    getTasksByBoardId: async (boardId: number): Promise<Task[]> => {
        const res = await api.get<Task[]>("/tasks", {
            params: { boardId }
        });
        return res.data;
    },

    // Get /tasks/{id}
    getTaskById: async(id: number): Promise<Task> => {
        const res = await api.get<Task>(`/tasks/${id}`);
        return res.data;
    },

    // POST /tasks
    createTask: async(data: CreateTaskRequest): Promise<Task> => {
        const res = await api.post<Task>('/tasks', data);
        return res.data;
    },

    // PUT /tasks/{id}
    updateTask: async(id: number, data: UpdateTaskRequest): Promise<Task> => {
        const res = await api.put<Task>(`/tasks/${id}`, data);
        return res.data;
    },

    // DELETE /tasks/{id}
    deleteTask: async(id: number): Promise<void> => {
        await api.delete(`/tasks/${id}`);
    }
}