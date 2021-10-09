import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import './StrategicMapJoin.style.scss';

const StrategicMapJoin = () => {
    const [mapId, setMapId] = useState("");
    const [mapPassword, setMapPassword] = useState("");

    const history = useHistory()

    const join = () => {
        history.push(`${history.location.pathname}/${mapId}`)
    }

    return (
        <div className="strategic-map-join">
            <h2>
                Join a Strategic Map
            </h2>
            <InputField
                type="text"
                value={mapId}
                placeholder="Unique ID of strategic map"
                onChange={(value) => {
                    setMapId(value)
                }}
            />
            <InputField
                type="password"
                value={mapPassword}
                placeholder="Password"
                onChange={(value) => {
                    setMapPassword(value)
                }}
            />
            <Button
                isPrimary={true}
                onClick={join}>
                Join
            </Button>
        </div>
    )
}

export default StrategicMapJoin
