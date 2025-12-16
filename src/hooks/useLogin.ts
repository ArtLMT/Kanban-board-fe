import { useState } from 'react';
import { validateEmail, validatePassword } from '../validation/authValidation.ts';
import { mockAuthApi } from '../api/authAPI.ts';

interface UseLoginProps {
    onLoginSuccess?: (username: string) => void;
}

export const useLogin = ({ onLoginSuccess }: UseLoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: typeof errors = {
            email: validateEmail(email),
            password: validatePassword(password),
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
            // Simulate API call
            const user = await mockAuthApi.login(email, password);
            // const username = email.split('@')[0];
            onLoginSuccess?.(user.username);
        } catch {
            setErrors({ password: 'Login failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        // state
        email,
        password,
        errors,
        isLoading,

        // setters
        setEmail,
        setPassword,
        setErrors,

        // handlers
        handleSubmit,
    };
};
