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
        <>
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
            >
                <div className="hover-toggle">
                    ?
                </div>
                <div className="info-field">
                    {children || text}
                </div>
            </div>
        </>
    )
}

export default InfoButton
