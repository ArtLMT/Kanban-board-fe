import React from "react";

type IconProps = React.SVGAttributes<SVGSVGElement> & {
    name: 'trash' | 'edit' | 'plus' | 'close' | 'drag' | 'check';
    size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
};

const iconPaths = {
    trash: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
    ),
    edit: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
    ),
    plus: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
        />
    ),
    close: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    ),
    drag: (
        <g>
            <circle cx="6" cy="6" r="1.5" fill="currentColor" />
            <circle cx="6" cy="12" r="1.5" fill="currentColor" />
            <circle cx="6" cy="18" r="1.5" fill="currentColor" />
            <circle cx="12" cy="6" r="1.5" fill="currentColor" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        </g>
    ),
    check: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
        />
    )
};

export const Icon = ({
    name,
    size = 'md',
    className = '',
    ...rest
}: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`${sizeClasses[size]} ${className}`}
            {...rest}
        >
            {iconPaths[name]}
        </svg>
    );
};

