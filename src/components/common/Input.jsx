import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  name,
  required = false,
  className = '',
  placeholder = '',
  error = '',
}) => (
  <div className="space-y-1">
    {label && (
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
    )}
    <input
      id={name}
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      placeholder={placeholder}
      autoComplete="off"
      className={`w-full px-4 py-3 bg-gray-700/50 border ${
        error ? 'border-red-500' : 'border-gray-600'
      } rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${className}`}
    />
    {error && (
      <p className="text-red-400 text-sm mt-1" role="alert" aria-live="assertive">
    {error}
  </p>
)}
  </div>
);

export default Input;