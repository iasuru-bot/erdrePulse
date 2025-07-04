import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { theme } from '../../styles/theme';

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: FieldError;
  containerClassName?: string;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, containerClassName = '', className = '', ...props }, ref) => {
    const checkboxStyles = `
      rounded
      border-border-main
      text-primary-main
      focus:ring-primary-main
      w-4 h-4
      transition-all duration-200
      ${error ? 'border-error-main' : ''}
      ${className}
    `;

    const labelStyles = "flex items-center";
    const textStyles = "ml-2 text-sm text-text-primary";
    const errorStyles = "text-error-main text-xs mt-1 animate-shake";

    return (
      <div className={`w-full ${containerClassName}`}>
        <label className={labelStyles}>
          <input
            type="checkbox"
            ref={ref}
            className={checkboxStyles}
            style={{
              backgroundColor: theme.colors.background.primary,
            }}
            {...props}
          />
          <span className={textStyles}>{label}</span>
        </label>
        {error && (
          <p className={errorStyles}>{error.message}</p>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox; 