import api from "./api";
import type {
    Status,
    CreateStatusRequest,
    UpdateStatusRequest
} from "../types/status";

export const statusApi = {
    // GET /statuses/{id}
    getById: async (id: number): Promise<Status> => {
        const res = await api.get<Status>(`/statuses/${id}`);
        return res.data;
    },

    // GET /statuses/board/{boardID}
    getByBoardId: async (boardId: number): Promise<Status[]> => {
        const res = await api.get<Status[]>(`/statuses/board/${boardId}`);
        return res.data;
    },

    // POST /statuses
    create: async (data: CreateStatusRequest): Promise<Status> => {
        const res = await api.post<Status>("/statuses", data);
        return res.data;
    },

    // PUT /statuses/{id}
    update: async (
        statusId: number,
        data: UpdateStatusRequest
    ): Promise<Status> => {
        const res = await api.put<Status>(`/statuses/${statusId}`, data);
        return res.data;
    },

    // PATCH /statuses/{id}/move?newPosition=...
    move: async (
        statusId: number,
        newPosition: number
    ): Promise<void> => {
        await api.patch(`/statuses/${statusId}/move`, null, {
            params: { newPosition }
        });
    },

    // DELETE /statuses/{id}
    delete: async (statusId: number): Promise<void> => {
        await api.delete(`/statuses/${statusId}`);
    }
};
