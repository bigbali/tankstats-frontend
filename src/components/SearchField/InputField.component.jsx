import React from 'react';
import './SearchField.style.scss';

const InputField = ({ placeholder }) => {
    return (
        <input
            className="input-field"
            type="text"
            placeholder={placeholder} />
    )
}

export default InputField
