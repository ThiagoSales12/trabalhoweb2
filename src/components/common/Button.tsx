import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary';
}

export const Button = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) => {

  const baseClasses = "px-4 py-2 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
    danger: 'bg-red-600 text-white hover:bg-red-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-500',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};