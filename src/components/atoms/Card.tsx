import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined';
};

const variantClasses = {
    default: 'bg-white shadow-sm',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border border-gray-200'
};

export const Card = ({
    children,
    variant = 'default',
    className = '',
    ...rest
}: CardProps) => {
    return (
        <div
            className={`rounded-lg p-4 ${variantClasses[variant]} ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

