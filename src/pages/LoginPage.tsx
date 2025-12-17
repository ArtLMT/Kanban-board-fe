import React from "react";
import { AuthenticateLayout } from "../components/templates/AuthenticateLayout";
import { Input, Button } from "../components/atoms";
import { useLogin } from "../hooks/useLogin";

interface LoginPageProps {
    onSwitchToRegister?: () => void;
    onLoginSuccess?: (username: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
                                                        onSwitchToRegister,
                                                        onLoginSuccess,
                                                    }) => {
    const {
        username,
        password,
        errors,
        isLoading,
        setUsername,
        setPassword,
        setErrors,
        handleSubmit,
    } = useLogin({ onLoginSuccess });

    return (
        <AuthenticateLayout title="Login to Kanban Board">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    disabled={isLoading}
                    error={errors.username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        if (errors.username) {
                            setErrors({ ...errors, username: undefined });
                        }
                    }}
                >
                    Username
                </Input>

                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    disabled={isLoading}
                    error={errors.password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) {
                            setErrors({ ...errors, password: undefined });
                        }
                    }}
                >
                    Password
                </Input>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full font-medium"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center pt-2">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <button
                            type="button"
                            onClick={onSwitchToRegister}
                            className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                        >
                            Register here
                        </button>
                    </p>
                </div>
            </form>
        </AuthenticateLayout>
    );
};
