import React from 'react';

const Button = ({ children, onClick, disabled, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${className}`}
  >
    {children}
  </button>
);

export default Button;