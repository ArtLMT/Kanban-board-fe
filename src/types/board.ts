
export interface Board {
    id: number;
    boardName: string;
}

export interface CreateBoardRequest {
    boardName: string;
}

export interface UpdateBoardRequest {
    boardName?: string;
}