import { createContext, useEffect, useState } from "react";
import api from "../api/api";

export interface AuthUser {
    id: number;
    username: string;
    email: string;
}

interface AuthContextType {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    // restore user on page refresh
    useEffect(() => {
        api
            .get("/api/auth/me")
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
