import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import StyleableCloseIconSVG from '../../../../components/StyleableCloseIconSVG';
import './StrategicMapJoin.style.scss';

const StrategicMapJoin = ({
    isExpanded,
    setIsExpanded
}) => {
    const [mapId, setMapId] = useState("");
    const history = useHistory()

    // Redirect
    const join = () => {
        history.push(`${history.location.pathname}/${mapId}`)
    }

    return (
        <>
            <div className={`strategic-map-join 
            ${isExpanded
                    ? "expanded"
                    : ""
                }`}>
                <h2>
                    Join a Strategic Map
                </h2>
                <StyleableCloseIconSVG
                    onClick={() => {
                        setIsExpanded(false);
                    }}
                />
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

export default StrategicMapJoin
