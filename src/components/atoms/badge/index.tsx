import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md';
};

const variantClasses = {
    primary: 'bg-blue-100 text-blue-700',
    secondary: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700'
};

const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
};

export const Badge = ({
    children,
    variant = 'primary',
    size = 'sm',
    className = '',
    ...rest
}: BadgeProps) => {
    return (
        <span
            className={`inline-block rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...rest}
        >
            {children}
        </span>
    );
};

