import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchIcon from '../../media/svg/search-icon.svg';
import { getPrefetchUrl } from '../../queries/queries';
import usePrevious from '../../util/usePrevious';
import './StatisticsSearchField.style.scss';

// TODO: work around 24 char input limit
// TODO: refactor

const StatisticsSearchField = ({
    placeholder,
    type,
    onSubmit,
    server,
    searchType
}) => {
    const [message, setMessage] = useState({ message: "" });
    const [value, setValue] = useState({ value: "" });
    const [response, setResponse] = useState({
        data: []
    });

    // Hide prefetch window (no data => no window)
    const resetResponse = () => {
        setResponse({ data: [] })
    }
    const previousSearchType = usePrevious(searchType);

    // When we change searchType or server, don't render until next update
    const shouldWaitForUpdate = previousSearchType === searchType;
    const minRequestLength = searchType
        === "player"
        ? 3
        : 1;

    let inputField;

    // Don't keep showing old data
    useEffect(() => {
        resetResponse();
    }, [searchType, server]);

    const handleOnChange = (event) => {
        const inputValue = event.target.value;
        const prefetch = () => {
            fetch(
                getPrefetchUrl(inputValue, server, searchType)
            )
                .then(response => response.json())
                .then(data => {
                    if (data.status === "ok") {
                        // Reset message without causing re-render
                        message.message = "";

                        // Value could already be decremented when promise resolves
                        if (value.value.length > minRequestLength) {
                            setResponse({
                                data: data.data
                            })
                        }
                    }
                    else if (data.status === "error"
                        && data.error.message === "REQUEST_LIMIT_EXCEEDED") {
                        // Can't write that fast...
                        setMessage({
                            message: "We can't keep up! Please, slow down!"
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        if (inputValue.length > minRequestLength) {
            if (inputValue.length > 24) {
                setMessage({
                    message:
                        "Input limit exceeded. " +
                        "Please keep your input to a maximum of 24 characters!"
                })
            }

            prefetch();

            // Detect if value length is decreasing
            if (inputValue.length < value.value.length) {
                // # pass
            }
        }
        else {
            resetResponse();
        }

        // Change value without re-rendering
        value.value = inputValue;
    }

    const mapPreviewToHtml = () => {
        const getPlayerOptions = () => {
            return response.data.map(player => {
                return (
                    <li
                        className="statistics-search-field-preview-option"
                        key={player.nickname}
                        onClick={() => {
                            inputField.value = player.nickname;
                            resetResponse();
                        }}
                    >
                        {player.nickname}
                    </li>
                )
            })
        }

        const getClanOptions = () => {
            return response.data.map(clan => {
                return (
                    <li
                        className="statistics-search-field-preview-option"
                        key={clan.name}
                        onClick={() => {
                            inputField.value = clan.tag;
                            resetResponse();
                        }}

                    >
                        <span
                            className="clan-tag"
                            style={{ color: clan.color }}>
                            {`[${clan.tag}] `}
                        </span>
                        <span>
                            {clan.name}
                        </span>
                    </li>
                )
            })
        }

        if (searchType === "player") {
            return getPlayerOptions();
        }
        else {
            return getClanOptions();
        }

    }

    return (
        <div className="statistics-search-field">
            <input
                className="statistics-search-field-input"
                type={type}
                placeholder={placeholder}
                ref={thisInputField => inputField = thisInputField}
                onChange={(e) => {
                    handleOnChange(e);
                }} />
            <button
                className="statistics-search-field-submit"
                onClick={(e) => {
                    e.preventDefault();

                    if (inputField.value.length <= minRequestLength) {
                        setMessage({
                            message: `${searchType} name must be longer than `
                                + `${minRequestLength} character`
                                + `${minRequestLength > 1 ? "s" : ""}!`
                        })
                    }
                    else {
                        resetResponse();
                        onSubmit(inputField.value);
                    }
                }}>
                <img src={SearchIcon} alt="Search" />
            </button>
            <div className={`statistics-search-field-preview 
                ${response.data.length || message.message ? "visible" : ""}`}>
                {message.message
                    ? <div className="error-message">
                        <span className="error-title">
                            Error:
                        </span>
                        <span className="error-body">
                            {message.message}
                        </span>
                    </div>
                    :
                    <ul>
                        {shouldWaitForUpdate ?
                            mapPreviewToHtml()
                            : null
                        }
                    </ul>}
            </div>
        </div>
    )
}

export default StatisticsSearchField
