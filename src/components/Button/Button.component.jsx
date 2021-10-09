import React from 'react';
import './Button.style.scss';

const Button = ({
    children,
    onClick,
    isPrimary
}) => {
    return (
        <button
            className={`button 
                ${isPrimary
                    ? "primary"
                    : ""
                }`}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
