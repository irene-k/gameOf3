import React from "react";
import button from "./button.css";

export const Button = ({ text, className, onClick, disabled }) => (
  <button className={className} onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

export default Button;
