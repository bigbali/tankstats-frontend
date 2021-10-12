import React, { useState } from 'react';
import db from '../../../../util/db';
import SEA from 'gun/sea';
import Button from '../../../../components/Button';
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

    const createStrategicMap = async () => {
        // Get UUID from backend
        fetch("http://www.localhost:8000/api/uuid")
            .then(response => response.json())
            .then(async (data) => {
                console.log(data.uuid)

                let strategicMap = {
                    id: data.uuid,
                    name: name,
                    description: description,
                    isPublic: true
                }

                if (password) {
                    strategicMap.isPublic = false;
                    strategicMap = await SEA.encrypt(strategicMap, password);
                }

                db.get("stratMap").get(data.uuid).put(strategicMap, () => {
                    console.log(`Created strategic map with UUID ${data.uuid}`)
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

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
                            label="Name of your strategy"
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
                                    Describe your strategy.
                                </InfoButton>
                            }
                        />
                        <InputField
                            type="password"
                            label="Password"
                            placeholder="MyPassword123"
                            onChange={setPassword}
                        />
                        <Button
                            isPrimary={true}
                            className="mt-5"
                            onClick={createStrategicMap}
                        >
                            Create
                        </Button>
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
