import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// Định nghĩa lại type để thêm cờ _retry vào config
// Giúp TypeScript không báo lỗi "Property '_retry' does not exist"
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // QUAN TRỌNG: Để gửi Cookie đi
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        // Nếu lỗi là 401 (Unauthorized) VÀ chưa từng thử refresh request này
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {

            // Đánh dấu là đã thử retry để tránh vòng lặp vô tận
            originalRequest._retry = true;

            try {
                // 1. Gọi API Refresh Token
                // Trình duyệt sẽ tự động gửi cookie 'refreshToken' đi kèm
                await api.post("/api/auth/refresh");

                // 2. Nếu không lỗi -> Access Token mới đã được set vào Cookie
                // Gọi lại request ban đầu với cookie mới
                return api(originalRequest);

            } catch (refreshError) {
                console.error("Session expired", refreshError);

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;