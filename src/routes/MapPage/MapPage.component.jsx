import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MapIndexPage from './MapIndexPage';

const MapPage = () => {
    const [map, setMap] = useState(null)
    const urlParams = useParams();
    const { id } = urlParams;

    useEffect(() => {
        if (id) {
            fetch(`http://www.localhost:8000/api/maps/${id}`)
                .then(response => response.json())
                .then(data => {
                    setMap(data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [id])

    if (!id) {
        return (
            <MapIndexPage />
        )
    }

    return (
        <h1>{JSON.stringify(map)}</h1>
    )
}

export default MapPage