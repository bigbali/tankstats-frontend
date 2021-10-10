import React from 'react';
import './StyleableCloseIconSVG.style.scss';

const StyleableCloseIconSVG = ({ onClick }) => {
    return (
        <svg className="styleable-close-icon-svg"
            data-name="close-icon-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 888.67 888.67"
            onClick={onClick}
        >
            <rect className="close-icon" x="410.72" y="-39.1" width="178.56" height="1078.2" transform="translate(444.33 -262.77) rotate(45)" />
            <rect className="close-icon" x="410.72" y="-39.1" width="178.56" height="1078.2" transform="translate(-262.77 444.33) rotate(-45)" />
        </svg>
    )
}

export default StyleableCloseIconSVG