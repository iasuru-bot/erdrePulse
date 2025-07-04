import React from 'react';

interface FormRadioOuiNonProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
  error?: any;
  className?: string;
  containerClassName?: string;
}

const radioBase = `w-4 h-4 border-2 border-primary-main focus:ring-2 focus:ring-primary-main transition-all duration-200 bg-white`;
const labelBase = `ml-2 text-sm text-text-primary`;

const FormRadioOuiNon: React.FC<FormRadioOuiNonProps> = ({
  value,
  onChange,
  error,
  className = '',
  containerClassName = '',
}) => {
  return (
    <div className={`w-full ${containerClassName} mb-2`}>
      <div className="flex gap-6 items-center">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            checked={value === true}
            onChange={() => onChange(true)}
            className={`${radioBase} ${className}`}
            style={{ backgroundColor: 'white' }}
          />
          <span className={labelBase}>Oui</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            checked={value === false}
            onChange={() => onChange(false)}
            className={`${radioBase} ${className}`}
            style={{ backgroundColor: 'white' }}
          />
          <span className={labelBase}>Non</span>
        </label>
      </div>
      {error && <p className="text-error-main text-xs mt-1 animate-shake">{error.message}</p>}
    </div>
  );
};

export default FormRadioOuiNon; 