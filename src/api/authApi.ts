import api from "./api";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    username: string;
}

export interface UserResponse {
    id: number;
    username: string;
    email: string;
}

// 2. Auth API Service
export const authApi = {
    // Login: POST /api/auth/login
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/api/auth/login", credentials);
        return response.data;
    },

    // Register: POST /api/auth/register
    register: async (data: RegisterRequest): Promise<string> => {
        const response = await api.post<string>("/api/auth/register", data);
        return response.data; // "User registered successfully"
    },

    // Get Me: GET /api/auth/me
    getCurrentUser: async (): Promise<UserResponse> => {
        const response = await api.get<UserResponse>("/api/auth/me");
        return response.data;
    },

    // Logout: POST /api/auth/logout
    logout: async (): Promise<void> => {
        await api.post("/api/auth/logout");
    }
};