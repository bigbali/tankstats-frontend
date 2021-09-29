import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPrefetchUrl } from '../../queries/queries';
import InputDropdown from '../InputDropdown/InputDropdown.component';
import StatisticsSearchField from '../StatisticsSearchField/StatisticsSearchField.component';
import './HeaderSearchForm.style.scss';

const searchTypes = ["player", "clan"];
const serverOptions = ["eu", "na", "ru"];

const HeaderSearchForm = (props) => {
    const [type, setType] = useState(searchTypes[0]);
    const [server, setServer] = useState(serverOptions[0]);

    const history = useHistory();

    const handleTypeChange = (newType) => {
        setType(newType);
    }

    const handleServerChange = (newServer) => {
        setServer(newServer);
    }

    const handleSubmit = (value) => {
        fetch(getPrefetchUrl(value, server, type))
            .then(response => response.json())
            .then(data => {
                // If player/clan is not found
                if (data.data.length === 0) {
                    history.push(
                        "/statistics/"
                        + `${server}/`
                        + `${type}/`
                        + `${value}`);
                }
                else {
                    if (type === "player") {
                        history.push(
                            "/statistics/"
                            + `${server}/`
                            + `${type}/`
                            + `${data.data[0].account_id}`
                            + `-${data.data[0].nickname}`);
                    }
                    else {
                        history.push(
                            "/statistics/"
                            + `${server}/`
                            + `${type}/`
                            + `${data.data[0].clan_id}`
                            + `-${data.data[0].tag}`);
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <form className="header-search-form">
            <InputDropdown
                options={searchTypes}
                onSelect={handleTypeChange}
                value={type}
                fixedWidth="6rem"
                letterCasing="capitalize-first-letter" />
            <InputDropdown
                options={serverOptions}
                onSelect={handleServerChange}
                value={server}
                fixedWidth="4.5rem"
                letterCasing="uppercase" />
            <StatisticsSearchField
                placeholder={`Search for ${type}`}
                onSubmit={handleSubmit}
                type="text"
                server={server}
                searchType={type}
            />
        </form>
    )
}

export default HeaderSearchForm

