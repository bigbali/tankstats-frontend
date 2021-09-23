import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MapIndexPage = () => {
    const [maps, setMaps] = useState(null)

    useEffect(() => {
        fetch(`http://www.localhost:8000/api/maps`)
            .then(response => response.json())
            .then(data => {
                setMaps(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <h1>{JSON.stringify(maps)}</h1>
    )
}

export default MapIndexPage