import React from 'react';
import { useState } from 'react';
import InputDropdown from '../InputDropdown/InputDropdown.component';
import InputField from '../SearchField/InputField.component';
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
        alert(`Submitted: ${id}`)
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
            <InputField
                placeholder={`Search for ${type}`}
                onSubmit={handleSubmit}
                type="text"
            />
        </form>
    )
}

export default HeaderSearchForm

