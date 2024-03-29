import React from 'react';
import { useParams } from 'react-router-dom';
import StrategicMapDetailsPage from './StrategicMapDetailsPage';
import StrategicMapIndexPage from './StrategicMapIndexPage';
import db from '../../util/db';

const StrategicMapPage = () => {
    const urlParams = useParams();
    const { id } = urlParams;

    if (id) {
        return <StrategicMapDetailsPage id={id} />
    }

    return <StrategicMapIndexPage />
}

export default StrategicMapPage
