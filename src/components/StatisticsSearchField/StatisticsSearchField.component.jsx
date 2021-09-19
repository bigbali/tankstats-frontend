import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchIcon from '../../media/svg/search-icon.svg';
import { getPrefetchUrl } from '../../queries/queries';
import './StatisticsSearchField.style.scss';
import usePrevious from '../../util/usePrevious';

// TODO: input str cannot contain special characters, e.g.: "é, á"
// TODO: work around 24 char input limit
// TODO: no matter what, when request is finished it changes 'response'

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

    const previousSearchType = usePrevious(searchType);
    const shouldWaitForUpdate = previousSearchType === searchType;
    const minRequestLength = searchType
        === "player"
        ? 3
        : 1;

    //let previousValue = usePrevious(value);

    // Don't keep showing old data
    useEffect(() => {
        setResponse({ data: [] })
    }, [searchType]);

    useEffect(() => {
        setResponse({ data: [] })
    }, [server]);

    const handleOnChange = (event) => {
        const prefetch = () => {
            fetch(
                getPrefetchUrl(inputValue, server, searchType)
            )
                .then(response => response.json())
                .then(data => {
                    if (data.status === "ok") {
                        // Reset message without causing re-render
                        message.message = "";

                        setResponse({
                            data: data.data
                        })
                    }
                    else if (data.status === "error"
                        && data.error.message === "REQUEST_LIMIT_EXCEEDED") {
                        // Can't trigger
                        setMessage({
                            message: "We can't keep up! Please, slow down!"
                        })
                    }
                })
                .catch((error) => {
                    console.log("ouch")
                })
        }

        const inputValue = event.target.value;

        if (inputValue.length > minRequestLength) {
            if (inputValue.length > 24) {
                setMessage({
                    message:
                        "Input limit exceeded." +
                        "Please keep your input to a maximum of 24 characters!"
                })
            }

            // Detect if value length is decreasing
            if (inputValue.length < value.value.length) {
                console.log("going down yo")
                prefetch();

            }
            else {
                prefetch();
            }

            // Change value without re-rendering
            value.value = inputValue;
        }
        else {
            if (response.data.length) {
                // setTimeout(() => {
                //     if (response.data.length) {
                //         setResponse({
                //             data: []
                //         })
                //     }
                // }, 100)
                // setTimeout(() => {
                //     if (response.data.length) {
                //         setResponse({
                //             data: []
                //         })
                //     }
                // }, 200)
                // setTimeout(() => {
                //     if (response.data.length) {
                //         setResponse({
                //             data: []
                //         })
                //     }
                // }, 500)
            }
        }
    }

    const mapPreviewToHtml = () => {
        const getPlayerOptions = () => {
            return response.data.map(player => {
                return (
                    <li
                        className="statistics-search-field-preview-option"
                        key={player.nickname}
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
                onChange={(e) => {
                    handleOnChange(e);
                }} />
            <button
                className="statistics-search-field-submit"
                onClick={(e) => {
                    e.preventDefault()
                    onSubmit(value)
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
                        {message.message}
                    </div>
                    :
                    <ul>
                        {shouldWaitForUpdate ?
                            mapPreviewToHtml()
                            : <span>Hello</span>}
                    </ul>}
            </div>
        </div>
    )
}

export default StatisticsSearchField
