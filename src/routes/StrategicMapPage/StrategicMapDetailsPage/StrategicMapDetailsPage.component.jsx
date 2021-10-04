import React, { useEffect, useState } from 'react';

const StrategicMapDetailsPage = ({ id }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`http://www.localhost:8000/api/interactive-maps/${id}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [id])

    if (data) {
        return (
            <div>
                <h1>INTERACTIVE MAP</h1>
                <h2>{JSON.stringify(data)}</h2>
            </div>
        )
    }

    return (
        <h1>
            No data.
        </h1>
    )
}

export default StrategicMapDetailsPage
