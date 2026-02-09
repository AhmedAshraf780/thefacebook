import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({
    options,
    placeholder,
    className = '',
    ...props
}) => {
    return (
        <select
            className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] text-[17px] bg-white ${className}`}
            {...props}
        >
            {placeholder && (
                <option value="" disabled selected>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
