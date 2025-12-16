import React from 'react';

interface AuthenticateLayoutProps {
    children: React.ReactNode;
    title: string;
}

export const AuthenticateLayout: React.FC<AuthenticateLayoutProps> = ({
    children,
    title
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Kanban Board
                        </h1>
                        <p className="text-lg font-semibold text-gray-700">
                            {title}
                        </p>
                        <p className="text-sm text-gray-500">
                            Organize your tasks efficiently
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200"></div>

                    {/* Form Content */}
                    <div>
                        {children}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-600">
                        © 2025 Kanban Board. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

