import React from 'react';
import { Input, Button } from '../components/atoms';
import { AuthenticateLayout } from '../components/templates/AuthenticateLayout';
import { useRegister } from '../hooks/useRegister.ts';

interface RegisterPageProps {
    onRegisterSuccess?: (username: string) => void;
    onSwitchToLogin?: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
                                                              onRegisterSuccess,
                                                              onSwitchToLogin,
                                                          }) => {
    const {
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
    } = useRegister({ onRegisterSuccess });

    return (
        <AuthenticateLayout title="Create New Account">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    error={errors.username}
                    disabled={isLoading}
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
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    error={errors.email}
                    disabled={isLoading}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                            setErrors({ ...errors, email: undefined });
                        }
                    }}
                >
                    Email Address
                </Input>

                <Input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    error={errors.password}
                    disabled={isLoading}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) {
                            setErrors({ ...errors, password: undefined });
                        }
                    }}
                >
                    Password
                </Input>

                <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    error={errors.confirmPassword}
                    disabled={isLoading}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) {
                            setErrors({ ...errors, confirmPassword: undefined });
                        }
                    }}
                >
                    Confirm Password
                </Input>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isLoading}
                    className="w-full font-medium"
                >
                    {isLoading ? 'Creating Account...' : 'Register'}
                </Button>

                <div className="text-center pt-2">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                        >
                            Login here
                        </button>
                    </p>
                </div>
            </form>
        </AuthenticateLayout>
    );
};
