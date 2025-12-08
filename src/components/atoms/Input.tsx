import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string
    children?: React.ReactNode
};

export const Input = ({
    error,
    children,
    className ,
    ...rest
}: InputProps) => {
    return (
        <div className="w-full">
            {children && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {children}
                </label>
            )}
            <input
                {...rest}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    error ? 'border-red-500 focus:ring-red-500' : ''
                } ${className}`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};


