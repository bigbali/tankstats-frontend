import { useEffect, useState } from 'react';
import Checkbox from '../../../components/Checkbox';
import InputDropdown from '../../../components/InputDropdown';
import InputField from '../../../components/InputField';
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

    const getMaps = (suppliedMaps) => {
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
                <a
                    key={map.name}
                    className={`map-card 
                        ${showName
                            ? "show-name"
                            : ""
                        }
                        ${showGrid
                            ? "show-grid"
                            : ""
                        }`
                    }
                    href={`maps/${map.slug}`}
                    name={map.name}>
                    <div className="image-wrapper">
                        <img
                            src={map.map_standard}
                            alt={map.name}
                        />
                        <span className={`size
                            ${showSize
                                ? "show"
                                : ""
                            }`}>
                            {map.size} x {map.size}
                        </span>
                    </div>
                    <div className="grid">
                        <ul className="horizontal">
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                            <li>7</li>
                            <li>8</li>
                            <li>9</li>
                            <li>0</li>
                        </ul>
                        <ul className="vertical">
                            <li>A</li>
                            <li>B</li>
                            <li>C</li>
                            <li>D</li>
                            <li>E</li>
                            <li>F</li>
                            <li>G</li>
                            <li>H</li>
                            <li>J</li>
                            <li>K</li>
                        </ul>
                    </div>
                </a>
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