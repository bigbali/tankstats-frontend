import { useEffect, useState } from 'react';
import Checkbox from '../../../components/Checkbox';
import InputDropdown from '../../../components/InputDropdown';
import InputField from '../../../components/InputField';
import Map from '../../../components/Map';
import './MapIndexPage.style.scss';

const mapSeasonOptions = [
    "all",
    "summer",
    "winter",
    "desert"
]

const MapIndexPage = () => {
    const [maps, setMaps] = useState(null);
    const [filterSeason, setFilterSeason] = useState(mapSeasonOptions[0]);
    const [filterName, setFilterName] = useState(null);
    const [showName, setShowName] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [showSize, setShowSize] = useState(true);

    const getMaps = () => {
        let relevantMaps = maps.maps;

        if (filterSeason && filterSeason !== "all") {
            relevantMaps = relevantMaps.filter(map => {
                return map.season === filterSeason;
            })
        }

        if (filterName) {
            relevantMaps = relevantMaps.filter(map => {
                return map.name
                    .toLowerCase()
                    .startsWith(
                        filterName.toLowerCase()
                    )
            })
        }

        return relevantMaps.map(map => {
            return (
                <Map
                    key={map.slug}
                    map={map}
                    showName={showName}
                    showGrid={showGrid}
                    showSize={showSize}
                    isAnchor={true}
                />
            )
        })
    }

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

    if (maps) {
        return (
            <main className="map-index-page">
                <h1>Maps</h1>
                <h2>
                    Detailed information about all the maps in World of Tanks.
                </h2>
                <div className="options-bar">
                    <InputDropdown
                        className="outline"
                        fixedWidth="7.5rem"
                        options={mapSeasonOptions}
                        value={filterSeason}
                        onSelect={setFilterSeason}
                        letterCasing="capitalize"
                    />
                    <InputField
                        className="outline"
                        type="text"
                        placeholder="Filter by name"
                        onChange={setFilterName}
                    />
                    <Checkbox
                        className="outline"
                        value={showName}
                        label="Show name"
                        name="show-name"
                        onChange={setShowName}
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
                <div className="map-field">
                    {getMaps()}
                </div>
            </main>
        )
    }

    return null
}

export default MapIndexPage