import { useState } from "react";
import {
    validateEmail,
    validatePassword,
    validateUsername,
    validateConfirmPassword,
} from "../validation/authValidation";
import { mockAuthApi } from "../api/authAPI.ts";

interface UseRegisterProps {
    onRegisterSuccess?: (username: string) => void;
}

export const useRegister = ({ onRegisterSuccess }: UseRegisterProps) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {
            username: validateUsername(username),
            email: validateEmail(email),
            password: validatePassword(password),
            confirmPassword: validateConfirmPassword(password, confirmPassword),
        };

        Object.keys(newErrors).forEach(
            (key) =>
                newErrors[key as keyof typeof newErrors] === undefined &&
                delete newErrors[key as keyof typeof newErrors]
        );

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const user = await mockAuthApi.register(
                username,
                email,
                password
            );
            onRegisterSuccess?.(user.username);
        } catch {
            setErrors({ email: "User already exists" });
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
