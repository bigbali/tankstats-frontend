import React from 'react';
import './InputField.style.scss';

const InputField = ({
    type,
    value,
    placeholder,
    label,
    className,
    onChange
}) => {
    const _label = label
        ? <label>{label}</label>
        : null

    return (
        <div className={`input-field 
            ${className
                ? className
                : ""
            }`}>
            {_label}
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
            />
        </div>
    )
}

export default InputField
