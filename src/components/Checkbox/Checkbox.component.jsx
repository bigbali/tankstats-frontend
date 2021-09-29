import React from 'react';
import './Checkbox.style.scss';

const Checkbox = ({
    label,
    value,
    name,
    className,
    onChange
}) => {
    return (
        <div className={`checkbox 
            ${className
                ? className
                : ""
            }
            ${value
                ? "checked"
                : ""
            }`}>
            {label
                ? (
                    <label htmlFor={name}>
                        {label}
                    </label>
                )
                : null
            }
            <input
                type="checkbox"
                checked={value}
                name={name ? name : ""}
                id={name ? name : ""}
                onChange={() => {
                    onChange(!value);
                }} />
        </div>
    )
}

export default Checkbox
