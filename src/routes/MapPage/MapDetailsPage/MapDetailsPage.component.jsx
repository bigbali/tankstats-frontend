import React from 'react';
import { useEffect, useState } from 'react';
import './MapDetailsPage.style.scss';

const MapDetailsPage = ({ id }) => {
    const [map, setMap] = useState(null)

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
                    <div className="map-wrapper">
                        <img
                            className="map"
                            src={map.map_standard}
                            alt=""
                        />
                    </div>
                </div>
            </main >
        )
    }

    return null
}

export default MapDetailsPage