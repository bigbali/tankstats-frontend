import React, { useState } from 'react';
import InfoButton from '../../../../components/InfoButton';
import InputField from '../../../../components/InputField';
import StyleableCloseIconSVG from '../../../../components/StyleableCloseIconSVG';
import TextField from '../../../../components/TextField';
import './StrategicMapCreate.style.scss';

const StrategicMapCreate = ({
    isExpanded,
    setIsExpanded
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <div className={`strategic-map-create 
            ${isExpanded
                    ? "expanded"
                    : ""
                }`}>
                <h1>Create a Strategic Map</h1>
                <StyleableCloseIconSVG
                    onClick={() => {
                        setIsExpanded(false);
                    }}
                />
                <div className="wrapper">
                    <div className="left">
                        <InputField
                            type="text"
                            label="Name of strategic map"
                            placeholder="Unnamed"
                            onChange={setName}
                            infoButton={
                                <InfoButton>
                                    Name of your strategic map. Doesn't need to be unique.
                                </InfoButton>
                            }
                        />
                        {/*TODO: make textfield */}
                        {/*TODO: hover tooltip component */}
                        <TextField
                            type="text"
                            label="Description"
                            placeholder="My strategic map"
                            isResizable={false}
                            onChange={setDescription}
                            infoButton={
                                <InfoButton>
                                    Name of your strategic map. Doesn't need to be unique.
                                </InfoButton>
                            }
                        />
                        <InputField
                            type="password"
                            label="Password"
                            placeholder="MyPassword123"
                            onChange={setPassword}
                        />
                    </div>
                    <div className="right">

                    </div>
                </div>
            </div>
            <div
                className={`backdrop 
                    ${isExpanded
                        ? "expanded"
                        : ""
                    }`}
                onClick={() => {
                    setIsExpanded(false);
                }}
            >
            </div>
        </>
    )
}

export default StrategicMapCreate
