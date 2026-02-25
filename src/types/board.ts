
export interface Board {
    id: number;
    title: string;
}

export interface CreateBoardRequest {
    title: string;
}

export interface UpdateBoardRequest {
    title?: string;
}