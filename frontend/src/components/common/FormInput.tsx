import React from 'react';
import { theme } from '../../styles/theme';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: any;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const inputStyles = `
      w-full px-4 py-2 rounded-md border
      ${error ? 'border-error-main' : 'border-border-primary'}
      focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent
      text-text-primary placeholder-text-secondary
      transition-colors duration-200
    `;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          {label}
          {props.required && <span className="text-error-main ml-1">*</span>}
        </label>
        <input
          ref={ref}
          className={`${inputStyles} ${className}`}
          style={{
            backgroundColor: theme.colors.background.primary,
            color: theme.colors.text.primary,
          }}
          {...props}
        />
        {error && (
          <p className="text-sm text-error-main animate-shake">{error.message}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput; 