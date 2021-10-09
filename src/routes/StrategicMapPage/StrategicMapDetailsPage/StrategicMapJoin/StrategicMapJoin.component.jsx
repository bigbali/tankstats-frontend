import React, { useState } from 'react';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import './StrategicMapJoin.style.scss';

const StrategicMapJoin = () => {
    const [mapId, setMapId] = useState(null);
    const [mapPassword, setMapPassword] = useState(null);

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
                isPrimary={true}>
                Join
            </Button>
        </div>
    )
}

export default StrategicMapJoin
