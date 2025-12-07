import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
};

const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300',
    ghost: 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'
};

const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
};

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button',
    ...rest
}: ButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`rounded-lg font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}