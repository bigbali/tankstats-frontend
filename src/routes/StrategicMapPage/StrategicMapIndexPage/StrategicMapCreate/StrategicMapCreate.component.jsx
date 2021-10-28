import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SEA from 'gun/sea';
import db from '../../../../util/db';
import Button from '../../../../components/Button';
import InfoButton from '../../../../components/InfoButton';
import InputField from '../../../../components/InputField';
import StyleableCloseIconSVG from '../../../../components/StyleableCloseIconSVG';
import TextField from '../../../../components/TextField';
import './StrategicMapCreate.style.scss';
import Checkbox from '../../../../components/Checkbox';

const wtfOverlay = {
    _0: {
        icon: "https://tankstats.s3.eu-central-1.amazonaws.com/media/arctic-region-standard.png",
        x: 0,
        y: 0
    }
}

const StrategicMapCreate = ({
    isExpanded,
    setIsExpanded
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);
    const user = useSelector(state => state.user);

    const createStrategicMap = async () => {
        // Get UUID from backend
        fetch("http://www.localhost:8765/api/uuid")
            .then(response => response.json())
            .then(async (data) => {
                // Should be on backend, for security reasons
                // (for example, malicious person could create a map in 
                // someone else's name or inject unsafe code that will be
                // executed on other user's client)
                let strategicMap = {
                    isEncrypted: false,
                    id: data.uuid,
                    map: {
                        background: "https://tankstats.s3.eu-central-1.amazonaws.com/media/arctic-region-standard.png",
                        overlays: {
                            overlay0: {
                                id: "overlay0",
                                icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F461042965385715712%2FURAC-hGN.jpeg&f=1&nofb=1",
                                x: 0,
                                y: 0
                            }
                        }
                    },
                    registry: {
                        name: name
                            || "",
                        description: description
                            || "",
                    },
                }


                if (password && isPrivate) {
                    //const pair = await SEA.pair();
                    //const data = await SEA.sign(strategicMap, pair)

                    strategicMap.isEncrypted = true;
                    strategicMap.map = await SEA.encrypt(strategicMap.map, password);
                    strategicMap.registry = await SEA.encrypt(strategicMap.registry, password);
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
                            label="Owner"
                            value={user ? user.nickname : "Anonymous"}
                            isDisabled={true}
                            placeholder="Unnamed"
                            infoButton={
                                <InfoButton>
                                    Username of owner. Automatically set to logged in user. Can't be edited.
                                </InfoButton>
                            }
                        />
                        <Checkbox
                            label="Private"
                            value={isPrivate}
                            onChange={() => {
                                setIsPrivate(value => !value)
                            }}
                        />
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
                            isDisabled={!isPrivate}
                            infoButton={
                                <InfoButton>
                                    Without a password, the strategic map
                                    will not be encrypted, therefore anybody
                                    will be able to access it.
                                    If password is given, it will be encrypted,
                                    and without the password, it will be impossible to unlock.
                                    <br />
                                    <strong>Remember your password!</strong>
                                </InfoButton>
                            }
                        />
                        <Button
                            isPrimary={true}

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
