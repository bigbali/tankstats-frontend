import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import Chevron from '../../media/svg/chevron.svg';
import actions from '../../redux/actions';
import './InputDropdown.style.scss';

const InputDropdown = ({ options, value, onSelect, uppercase }) => {
    const [isExpanded, setExpanded] = useState(false);

    const mapOptionsToHtml = () => {
        return options.map(option => {
            return (
                <li key={option}
                    className={`input-dropdown-option 
                        ${value === option ? "selected" : ""}`}
                    onClick={() => {
                        onSelect(option)
                        setExpanded(false);
                    }}>
                    {option}
                </li>
            )
        })
    }

    return (
        <div className={`input-dropdown 
            ${uppercase ? "uppercase" : ""}
            ${isExpanded ? "expanded" : ""}`}>
            <div
                className="input-dropdown-visible"
                onClick={() => {
                    setExpanded(!isExpanded);
                }}>
                <span className="input-dropdown-selected">
                    {value}
                </span>
                <img className="chevron"
                    src={Chevron}
                    alt="Expand" />
            </div>
            <ul className="input-dropdown-options">
                {mapOptionsToHtml()}
            </ul>
        </div>
    )
}

export default InputDropdown
