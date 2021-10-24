import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StyleableCloseIconSVG from '../StyleableCloseIconSVG';
import './Flash.style.scss';

const Flash = () => {
    const flash = useSelector(state => state.flash);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (flash) {
            // After delay, call expand, then close after timeout
            setTimeout(() => {
                setIsExpanded(!!flash); // Converts value to boolean

                setTimeout(() => {
                    setIsExpanded(false);
                }, flash.timeout)
            }, flash.delay)
        }
    }, [flash])

    if (flash && (flash.title || flash.message)) {
        return (
            <div className={`flash 
                ${isExpanded
                    ? "expanded"
                    : ""
                }`}>
                <h5>
                    {flash.title}
                </h5>
                <p>
                    {flash.message}
                </p>
                <StyleableCloseIconSVG onClick={() => {
                    setIsExpanded(false);
                }} />
            </div>
        )
    }

    return null
}

export default Flash
