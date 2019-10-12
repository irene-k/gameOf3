import React from 'react';

export const Button = ({ text, className, onClick, disabled }) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;