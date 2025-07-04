import React from 'react';
import { theme } from '../../styles/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      rounded-md font-medium
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
    `;

    const variantStyles = {
      primary: `
        bg-primary-main text-text-light
        hover:bg-primary-dark
        active:bg-primary-dark
      `,
      outlined: `
        border-2 border-primary text-primary border-solid
        hover:bg-primary-main hover:text-text-light
        active:bg-primary-dark
      `,
      text: `
        text-primary-main
        hover:bg-primary-light hover:bg-opacity-10
        active:bg-primary-dark active:bg-opacity-20
      `,
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        style={{
          backgroundColor:
            variant === 'primary'
              ? isLoading
                ? theme.colors.primary.light
                : theme.colors.primary.main
              : 'transparent',
          color:
            variant === 'primary'
              ? theme.colors.text.light
              : theme.colors.primary.main,
        }}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 