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
    isDisabled = false,
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
                    disabled={isDisabled}
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
