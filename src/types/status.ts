import type { Board} from "./board.ts";

export interface Status {
    id: number;
    name: string;
    color: string;

    position: number;

    board: Board;
}

export interface CreateStatusRequest {
    name: string;
    color: string;

    position?: number;
    boardId: number;
}

export interface UpdateStatusRequest {
    name?: string;
    color?: string;
}