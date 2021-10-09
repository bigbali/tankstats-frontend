import React, { useState } from 'react';
import InputField from '../../../../components/InputField';
import './StrategicMapCreate.style.scss';

const StrategicMapCreate = ({
    isExpanded
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={`strategic-map-create 
            ${isExpanded
                ? "expanded"
                : ""
            }`}>
            <h1>Create a Strategic Map</h1>
            <InputField
                type="text"
                label="Name of strategic map"
                placeholder="Unnamed"
                onChange={setName}
            />
            {/*TODO: make textfield */}
            {/*TODO: hover tooltip component */}
            <InputField
                type="text"
                label="Description"
                placeholder="My strategic map"
                onChange={setDescription}
            />
            <InputField
                type="password"
                label="Password"
                placeholder="MyPassword123"
                onChange={setPassword}
            />
        </div>
    )
}

export default StrategicMapCreate
