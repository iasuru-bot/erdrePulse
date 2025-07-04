import React from 'react';
import { Search } from 'lucide-react';
import { theme } from '../../styles/theme';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, className = '', ...props }, ref) => {
    const inputStyles = `
      w-full px-4 py-2 pl-10 rounded-md border
      border-border-primary
      focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent
      text-text-primary placeholder-text-secondary
      transition-colors duration-200
    `;

    return (
      <div className="relative">
        <input
          ref={ref}
          className={`${inputStyles} ${className}`}
          style={{
            backgroundColor: theme.colors.background.primary,
            color: theme.colors.text.primary,
          }}
          onChange={(e) => onSearch?.(e.target.value)}
          {...props}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-text-secondary" />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput; 