import { createContext, useEffect, useState, useCallback } from "react";
// Import service bạn đã viết sẵn (tận dụng code của bạn)
import { authApi, type UserResponse } from "../api/authApi";

interface AuthContextType {
    user: UserResponse | null; // Sửa lại cho khớp type UserResponse bên authApi
    setUser: (user: UserResponse | null) => void;
    loading: boolean;
    fetchUser: () => Promise<void>; // <--- THÊM CÁI NÀY
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    fetchUser: async () => {}, // Default empty function
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);

    // Tách logic gọi API ra đây
    const fetchUser = useCallback(async () => {
        try {
            // Dùng authApi.getCurrentUser() của bạn thay vì gọi axios trần
            const userData = await authApi.getCurrentUser();
            setUser(userData);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Chạy 1 lần khi load trang
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        // Truyền fetchUser xuống cho con cháu dùng
        <AuthContext.Provider value={{ user, setUser, loading, fetchUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}