import React from "react";

const Button = ({ text, className, onClick, disabled }) => (
  <button className={className} onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

export default Button;
