import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'success' | 'secondary';
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    size = 'md',
    ...props
}) => {
    const baseStyles = "font-bold rounded-md focus:outline-none transition-colors duration-200";

    const variants = {
        primary: "bg-[#1877f2] hover:bg-[#166fe5] text-white border-none",
        success: "bg-[#42b72a] hover:bg-[#36a420] text-white border-none",
        secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-[15px]",
        lg: "px-8 py-3 text-lg",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
