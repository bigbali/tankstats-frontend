import React from 'react';
import './Button.style.scss';

const Button = ({
    children,
    onClick,
    isPrimary,
    size,
    className
}) => {
    return (
        <button
            className={`button 
                ${isPrimary
                    ? "primary"
                    : ""
                }
                ${size || ""}
                ${className || ""}`}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
