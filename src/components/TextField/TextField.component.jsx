import React from 'react';
import './TextField.style.scss';

const TextField = ({
    name,
    value,
    placeholder,
    label,
    rows,
    columns,
    isResizable,
    className,
    onChange,
    children
}) => {
    const _label = label
        ? <label>{label}</label>
        : null

    return (
        <div className={`text-field 
            ${className
                ? className
                : ""
            }`}>
            {_label}
            <textarea
                className={`${isResizable
                    ? "resizable"
                    : ""
                    }`}
                name={`${name ? name : ""}`}
                id={`${name ? name : ""}`}
                rows={`${rows ? rows : ""}`}
                cols={`${columns ? columns : ""}`}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
            >
                {children}
            </textarea>
        </div>
    )
}

export default TextField
