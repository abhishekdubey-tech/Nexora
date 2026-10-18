import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  textarea?: boolean;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  textarea = false,
  rows = 4,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseClasses = `
    w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900
    placeholder:text-gray-400
    focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20
    disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
    transition-colors duration-150
    ${Icon ? 'pl-10' : ''}
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300'}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          {label}
          {props.required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        {textarea ? (
          <textarea
            id={inputId}
            rows={rows}
            className={baseClasses}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input id={inputId} className={baseClasses} {...props} />
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
