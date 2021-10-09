import React from 'react';
import './Button.style.scss';

const Button = ({
    children,
    onClick,
    isPrimary,
    size
}) => {
    return (
        <button
            className={`button 
                ${isPrimary
                    ? "primary"
                    : ""
                }
                ${size
                    ? size
                    : ""
                }`}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
