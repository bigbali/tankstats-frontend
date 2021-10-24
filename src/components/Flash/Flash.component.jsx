import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Flash.style.scss';

const Flash = () => {
    const flash = useSelector(state => state.flash);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (flash) {
            setIsExpanded(true);
        }
        else {
            setIsExpanded(false);
        }

        setTimeout(() => {
            setIsExpanded(false);
        }, 5000)
    }, [flash])

    if (flash) {
        return (
            <div className={`flash 
                ${isExpanded
                    ? "expanded"
                    : ""
                }`}>
                <h1>{flash.title}</h1>
                <h3>{flash.message}</h3>
            </div>
        )
    }

    return null
}

export default Flash
