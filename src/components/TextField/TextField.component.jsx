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
    children,
    infoButton
}) => {
    const _label = label
        ? <label>{label}</label>
        : null

    return (
        <div className={`text-field 
            ${infoButton
                ? "has-info"
                : ""
            }
            ${className
                ? className
                : ""
            }`}>
            {_label}
            <div className="group">
                <textarea
                    className={`${isResizable
                        ? "resizable"
                        : ""
                        }`}
                    name={`${name ? name : ""}`}
                    placeholder={placeholder}
                    id={`${name ? name : ""}`}
                    rows={`${rows ? rows : ""}`}
                    cols={`${columns ? columns : ""}`}
                    onChange={(e) => {
                        onChange(e.target.value)
                    }}
                >
                    {children}
                </textarea>
                {infoButton
                    ? infoButton
                    : null
                }
            </div>
        </div>
    )
}

export default TextField
