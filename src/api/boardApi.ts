import api from './api';
import type { Board, CreateBoardRequest, UpdateBoardRequest } from '../types/board';

export const boardApi = {
    // Get /boards
    getMyBoards: async() : Promise<Board[]> => {
        const res = await api.get<Board[]>('/boards');
        return res.data;
    },

    // Get /boards/{id}
    getBoardById: async(id: string): Promise<Board> => {
        const res = await api.get<Board>(`/boards/${id}`);
        return res.data;
    },

    // POST /boards
    createBoard: async(data: CreateBoardRequest): Promise<Board> => {
        const res = await api.post<Board>('/boards', data);
        return res.data;
    },

    // PUT /boards/{id}
    updateBoard: async(id: number, data: UpdateBoardRequest): Promise<Board> => {
        const res = await api.put<Board>(`/boards/${id}`, data);
        return res.data;
    },

    // DELETE /boards/{id}
    deleteBoard: async(id: number): Promise<void> => {
        await api.delete(`/boards/${id}`);
    }
}