import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const InteractiveMapPage = () => {
    const [data, setData] = useState(null);
    const urlParams = useParams();
    const { id } = urlParams;


    useEffect(() => {
        fetch(`http://www.localhost:8000/api/interactive-map/${id}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [id])

    return (
        <div>
            <h1>INTERACTIVE MAP</h1>
            <h2>{JSON.stringify(data)}</h2>
        </div>
    )
}

export default InteractiveMapPage
