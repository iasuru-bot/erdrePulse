import React from 'react';
import { theme } from '../../styles/theme';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: any;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const textareaStyles = `
      w-full px-4 py-2 rounded-md border
      ${error ? 'border-error-main' : 'border-border-primary'}
      focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent
      text-text-primary placeholder-text-secondary
      transition-colors duration-200
      resize-none
    `;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          {label}
          {props.required && <span className="text-error-main ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          className={`${textareaStyles} ${className}`}
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

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea; 