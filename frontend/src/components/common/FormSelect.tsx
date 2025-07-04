import React from 'react';
import { theme } from '../../styles/theme';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: any;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, className = '', placeholder = 'Sélectionnez une option', ...props }, ref) => {
    const selectStyles = `
      w-full px-4 py-2 rounded-md border
      ${error ? 'border-error-main' : 'border-border-primary'}
      focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent
      text-text-primary
      transition-colors duration-200
    `;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          {label}
          {props.required && <span className="text-error-main ml-1">*</span>}
        </label>
        <select
          ref={ref}
          className={`${selectStyles} ${className}`}
          style={{
            backgroundColor: theme.colors.background.primary,
            color: theme.colors.text.primary,
          }}
          {...props}
        >
          <option value="" disabled selected>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              style={{
                backgroundColor: theme.colors.background.primary,
                color: theme.colors.text.primary,
              }}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-error-main animate-shake">{error.message}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect; 