import React from 'react';
import { useState } from 'react';
import SearchIcon from '../../media/svg/search-icon.svg';
import './InputField.style.scss';

const InputField = ({ placeholder, type, onSubmit }) => {
    const [name, setName] = useState("");

    return (
        <div className="input-field">
            <input
                className="input-field-input"
                type={type}
                placeholder={placeholder}
                onChange={(e) => {
                    console.log(e.target.value)
                    setName(e.target.value)
                }} />
            <button
                className="input-field-submit"
                onClick={(e) => {
                    e.preventDefault()
                    onSubmit(name)
                }}>
                <img src={SearchIcon} alt="Search" />
            </button>
        </div>
    )
}

export default InputField
