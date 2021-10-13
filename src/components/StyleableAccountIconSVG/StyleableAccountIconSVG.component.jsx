import React from 'react';
import './StyleableAccountIconSVG.style.scss';

const StyleableAccountIconSVG = ({ onClick }) => {
    return (
        <svg className="styleable-account-icon-svg"
            data-name="styleable-account-icon-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            onClick={onClick}>
            <path d="M729.4,443.81a311,311,0,0,1-458.8,0C119.29,455,0,581.32,0,735.5v130A134.5,134.5,0,0,0,134.5,1000h731A134.5,134.5,0,0,0,1000,865.5v-130C1000,581.32,880.71,455,729.4,443.81Z" />
            <path className="neck" d="M500-77.17c-171.76,0-311,139.24-311,311a311,311,0,0,0,622,0C811,62.07,671.76-77.17,500-77.17Zm0,544.84c-129.14,0-233.83-104.69-233.83-233.84S370.86,0,500,0,733.83,104.69,733.83,233.83,629.14,467.67,500,467.67Z" />
            <circle cx="500" cy="233.83" r="233.83" />
        </svg>
    )
}

export default StyleableAccountIconSVG