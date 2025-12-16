const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
        return 'Email is required';
    }

    if (!EMAIL_REGEX.test(email)) {
        return 'Please enter a valid email';
    }

    return undefined;
};

export const validatePassword = (password: string): string | undefined => {
    if (!password.trim()) {
        return 'Password is required';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }

    return undefined;
};

export const validateUsername = (username: string): string | undefined => {
    if (!username.trim()) {
        return 'Username is required';
    }

    if (username.length < 3) {
        return 'Username must be at least 3 characters';
    }

    if (username.length > 20) {
        return 'Username must not exceed 20 characters';
    }

    return undefined;
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
): string | undefined => {
    if (!confirmPassword.trim()) {
        return 'Please confirm your password';
    }

    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }

    return undefined;
};
