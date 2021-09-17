import React from 'react';
import { useState } from 'react';
import SearchIcon from '../../media/svg/search-icon.svg';
import { appIdParam, convertTypex, fetchHeaderSearchFormPreview, getQueryString } from '../../queries/queries';
import convert from '../../queries/convert';
import './InputField.style.scss';

const InputField = ({
    placeholder,
    type,
    onSubmit,
    server,
    searchType
}) => {
    const [name, setName] = useState("");
    const [response, setResponse] = useState({
        data: []
    });

    const mapPreviewToHtml = () => {
        return response.data.map(option => {
            return (
                <li
                    className="input-field-preview-option"
                    key={option.nickname}
                >
                    {option.nickname}
                </li>
            )
        })
    }

    return (
        <div className="input-field">
            <input
                className="input-field-input"
                type={type}
                placeholder={placeholder}
                onChange={(e) => {
                    const value = e.target.value;
                    setName(value)

                    if (value.length > 3) {
                        fetch(
                            getQueryString(value, server, searchType)
                        )
                            .then(response => response.json())
                            .then(data => {
                                setResponse(data)
                            })
                    }
                    else {
                        if (response.data.length) {
                            setTimeout(() => {
                                if (response.data.length) {
                                    setResponse({
                                        data: []
                                    })
                                }
                            }, 100)
                            setTimeout(() => {
                                if (response.data.length) {
                                    setResponse({
                                        data: []
                                    })
                                }
                            }, 200)
                            setTimeout(() => {
                                if (response.data.length) {
                                    setResponse({
                                        data: []
                                    })
                                }
                            }, 500)
                        }
                    }
                }} />
            <button
                className="input-field-submit"
                onClick={(e) => {
                    e.preventDefault()
                    onSubmit(name)
                }}>
                <img src={SearchIcon} alt="Search" />
            </button>
            <div className={`input-field-preview 
                ${response.data.length ? "visible" : ""}`}>
                <ul>
                    {mapPreviewToHtml()}
                </ul>
            </div>
        </div>
    )
}

export default InputField
