import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import './StrategicMapJoin.style.scss';

const StrategicMapJoin = ({
    isExpanded
}) => {
    const [mapId, setMapId] = useState("");
    const history = useHistory()

    // Redirect
    const join = () => {
        history.push(`${history.location.pathname}/${mapId}`)
    }

    return (
        <div className={`strategic-map-join 
            ${isExpanded
                ? "expanded"
                : ""
            }`}>
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
            <Button
                isPrimary={true}
                onClick={join}>
                Join
            </Button>
        </div>
    )
}

export default StrategicMapJoin
