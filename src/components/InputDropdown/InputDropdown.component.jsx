import React from 'react';
import { useState } from 'react';
import Chevron from '../../media/svg/chevron.svg';
import './InputDropdown.style.scss';

const InputDropdown = ({
    options,
    value,
    onSelect,
    letterCasing,
    displayTransform,
    fixedWidth,
    className
}) => {
    const [isExpanded, setExpanded] = useState(false);

    const mapOptionsToHtml = () => {
        return options.map(option => {
            return (
                <li key={option}
                    className={`input-dropdown-option
                        ${letterCasing ===
                            "capitalize-first-letter"
                            ? letterCasing
                            : ""} 
                        ${value ===
                            option
                            ? "selected"
                            : ""}`}
                    onClick={() => {
                        onSelect(option);
                        setExpanded(false);
                    }}>
                    {displayTransform
                        ? displayTransform(option)
                        : option
                    }
                </li>
            )
        })
    }

    return (
        <div className={`input-dropdown 
            ${letterCasing
                ? letterCasing
                : ""}
            ${className
                ? className
                : ""}
            ${isExpanded
                ? "expanded"
                : ""}
            `}
            style={
                fixedWidth
                    ? {
                        width: fixedWidth
                    }
                    : null
            }>
            <div
                className="input-dropdown-visible"
                onClick={() => {
                    setExpanded(!isExpanded);
                }}>
                <span className={`input-dropdown-selected
                    ${letterCasing ===
                        "capitalize-first-letter"
                        ? letterCasing
                        : ""} 
                    `}>
                    {value}
                </span>
                <img className="chevron"
                    src={Chevron}
                    alt="Expand" />
            </div>
            <ul
                className="input-dropdown-options"
                style={
                    fixedWidth
                        ? {
                            width: fixedWidth
                        }
                        : null
                }>
                {mapOptionsToHtml()}
            </ul>
        </div>
    )
}

export default InputDropdown
