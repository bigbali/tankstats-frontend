import React from 'react';
import { useEffect, useState } from 'react';
import DetailedMap from '../../../components/DetailedMap';
import InputDropdown from '../../../components/InputDropdown';
import Checkbox from '../../../components/Checkbox';
import { mapTypes } from '../../../globals/maps';
import './MapDetailsPage.style.scss';

const transformToUserReadable = (mapType) => {
    switch (mapType) {
        case mapTypes[0]:
            return "Standard"
        case mapTypes[1]:
            return "Height"
        case mapTypes[2]:
            return "Ground resistance"
        default:
            return "Unknown"
    }
}

const MapDetailsPage = ({ id }) => {
    const [map, setMap] = useState(null);
    const [mapType, setMapType] = useState(mapTypes[0]);
    const [showGrid, setShowGrid] = useState(true);
    const [showSize, setShowSize] = useState(false);

    useEffect(() => {
        fetch(`http://www.localhost:8000/api/maps/${id}`)
            .then(response => response.json())
            .then(data => {
                setMap(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [id])

    if (map) {
        return (
            <main className="map-details-page"
                style={{
                    backgroundImage: `url(${map.cover})`
                }}>
                <div className="content">
                    <div className="title">
                        <a
                            className="link-back highlight-effect"
                            href="/maps">
                            <svg viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg">
                                <path id="chevron" d="M1.41 0.589996L6 
                                    5.17L10.59 0.589996L12 
                                    2L6 8L0 2L1.41 0.589996Z"
                                />
                            </svg>
                            Back to Maps
                        </a>
                        <h1>{map.name}</h1>
                        <p>{map.description}</p>
                    </div>
                    <div className="options-bar">
                        <InputDropdown
                            className="outline"
                            fixedWidth="13rem"
                            options={mapTypes}
                            value={mapType}
                            onSelect={setMapType}
                            letterCasing="capitalize"
                            displayTransform={transformToUserReadable}
                        />
                        <Checkbox
                            className="outline"
                            value={showGrid}
                            label="Show grid"
                            name="show-grid"
                            onChange={setShowGrid}
                        />
                        <Checkbox
                            className="outline"
                            value={showSize}
                            label="Show size"
                            name="show-size"
                            onChange={setShowSize}
                        />
                    </div>
                    <div className="map-wrapper">
                        <DetailedMap
                            map={map}
                            mapType={mapType}
                            showGrid={showGrid}
                            showSize={showSize}
                        />
                    </div>
                </div>
            </main >
        )
    }

    return null
}

export default MapDetailsPage