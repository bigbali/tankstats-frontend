import React from 'react';
import { useState } from 'react';
import InputDropdown from '../InputDropdown/InputDropdown.component';
import StatisticsSearchField from '../StatisticsSearchField/StatisticsSearchField.component';
import './HeaderSearchForm.style.scss';

const searchTypes = ["player", "clan"];
const serverOptions = ["EU", "NA", "RU"];

const HeaderSearchForm = () => {
    const [type, setType] = useState(searchTypes[0]);
    const [server, setServer] = useState(serverOptions[0]);
    const [id, setId] = useState(null);

    const handleTypeChange = (newType) => {
        setType(newType);
    }

    const handleServerChange = (newServer) => {
        setServer(newServer);
    }

    const handleIdChange = (newId) => {
        setId(newId);
    }

    const handleSubmit = (id) => {
        // fetch(`https://api.worldoftanks.eu/wot/account/list/?application_id=62da3ef417f70e5ffeb44cf6fa339e1e&search=${id}&limit=10`)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(JSON.stringify(data));
        //     })
    }

    return (
        <form
            className="header-search-form"
            action=""
            method="GET">
            <InputDropdown
                options={searchTypes}
                onSelect={handleTypeChange}
                value={type} />
            <InputDropdown
                options={serverOptions}
                onSelect={handleServerChange}
                value={server} />
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

