import React from 'react';
import './InputField.style.scss';

const InputField = ({
    name,
    type,
    value,
    placeholder,
    label,
    className,
    onChange,
    infoButton
}) => {
    const _label = label
        ? <label>{label}</label>
        : null

    return (
        <div className={`input-field     
            ${infoButton
                ? "has-info"
                : ""
            }    
            ${className
                ? className
                : ""
            }`}
        >
            {_label}
            <div className="group">
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => {
                        onChange(e.target.value)
                    }}
                />
                {infoButton
                    ? infoButton
                    : null
                }
            </div>
        </div>
    )
}

export default InputField
