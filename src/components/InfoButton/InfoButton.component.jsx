import React, { useState } from 'react';
import './InfoButton.style.scss';

const InfoButton = ({
    children,
    text,
    className,
    style,
    onClick
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`info-button
                ${isExpanded
                    ? "expanded"
                    : ""
                } 
                ${className
                    ? className
                    : ""
                }`}
            style={style
                ? style
                : null
            }
            onClick={onClick}
            onMouseEnter={() => {
                setIsExpanded(true)
            }}
            onMouseLeave={() => {
                setIsExpanded(false)
            }}
            text={children || text}
        >
        </div>
    )
}

export default InfoButton
