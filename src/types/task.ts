import type {User} from "./user";

export interface Task {
    id: number;
    title: string;
    description?: string;

    boardId?: number;
    statusId?: number;

    assignee?: User;
    creator: User;
}

export interface CreateTaskRequest {
    title: string;
    description?: string;

    statusId: number;
    boardId: number;

    assignee?: number;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;

    statusId?: number;
    assigneeId?: number;
}