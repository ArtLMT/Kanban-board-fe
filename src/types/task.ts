import type {User} from "./user";
import type {Status} from "./status.ts";
import type {Board} from "./board.ts";

export interface Task {
    id: number;
    title: string;
    description?: string;

    boardId?: number;
    statusId?: number;

    board: Board;
    status: Status

    assignee?: User;
    creator: User;
}

export interface CreateTaskRequest {
    title: string;
    description?: string;

    status: Status;
    board: Board;

    assignee?: User;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;

    statusId?: number;
    assigneeId?: number;
}