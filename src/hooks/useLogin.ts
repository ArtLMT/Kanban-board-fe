import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import api from "../api/api.ts";

interface UseLoginProps {
    onLoginSuccess?: (username: string) => void;
}

export const useLogin = ({ onLoginSuccess }: UseLoginProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(AuthContext);


    // Simple validation
    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await api.post("/api/auth/login", { username, password });

            // cookies are set → now ask backend who we are
            const res = await api.get("/api/auth/me");
            setUser(res.data);

            onLoginSuccess?.(res.data.username);
            // Tokens are already in HttpOnly cookies from backend
        } catch (err: any) {
            console.error(err);
            setErrors({ password: "Login failed. Please check your credentials." });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        username,
        password,
        errors,
        isLoading,
        setUsername,
        setPassword,
        setErrors,
        handleSubmit,
    };
};
