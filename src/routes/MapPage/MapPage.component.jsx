import { useParams } from 'react-router-dom';
import MapDetailsPage from './MapDetailsPage';
import MapIndexPage from './MapIndexPage';

const MapPage = () => {
    const urlParams = useParams();
    const { id } = urlParams;

    if (!id) {
        return (
            <MapIndexPage />
        )
    }

    return (
        <MapDetailsPage id={id} />
    )
}

export default MapPage