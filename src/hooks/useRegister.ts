import { useState } from "react";
import {
    validateEmail,
    validatePassword,
    validateUsername,
    validateConfirmPassword,
} from "../validation/authValidation";
import api from "../api/api.ts";

interface UseRegisterProps {
    onRegisterSuccess?: (username: string) => void;
}

// Định nghĩa kiểu dữ liệu cho Errors để TypeScript không báo lỗi index signature
interface RegisterErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string; // Dùng cho lỗi không xác định
}

export const useRegister = ({ onRegisterSuccess }: UseRegisterProps) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState<RegisterErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    // Logic validation phía Client (giữ nguyên logic tốt của bạn)
    const validateForm = () => {
        const newErrors: RegisterErrors = {
            username: validateUsername(username),
            email: validateEmail(email),
            password: validatePassword(password),
            confirmPassword: validateConfirmPassword(password, confirmPassword),
        };

        // Xóa các key có giá trị undefined
        Object.keys(newErrors).forEach(
            (key) => {
                if (newErrors[key as keyof RegisterErrors] === undefined) {
                    delete newErrors[key as keyof RegisterErrors];
                }
            }
        );

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validate Client
        if (!validateForm()) return;

        setIsLoading(true);
        // Xóa lỗi cũ trước khi gọi API mới
        setErrors({});

        try {
            // 2. Gọi API
            await api.post("/api/auth/register", {
                username,
                email,
                password
            });

            // 3. Thành công
            onRegisterSuccess?.(username);

        } catch (err: any) {
            console.error(err);

            const errorMsg = err.response?.data;

            const newErrors: RegisterErrors = {};

            if (typeof errorMsg === 'string') {
                if (errorMsg.includes("Username")) {
                    newErrors.username = errorMsg; // "Username already taken"
                } else if (errorMsg.includes("Email")) {
                    newErrors.email = errorMsg; // "Email already used"
                } else {
                    newErrors.general = "Registration failed. Please try again.";
                }
            } else {
                newErrors.general = "Network error or server is down.";
            }

            setErrors(newErrors);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        username,
        email,
        password,
        confirmPassword,
        errors,
        isLoading,
        setUsername,
        setEmail,
        setPassword,
        setConfirmPassword,
        setErrors,
        handleSubmit,
    };
};