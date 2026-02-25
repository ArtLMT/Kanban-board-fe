export interface Status {
    id: number;
    name: string;
    color: string;

    position: number;

    boardId: number;
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