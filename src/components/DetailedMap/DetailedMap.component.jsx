import React, { useEffect } from 'react';
import { mapTypes } from '../../globals/maps';
import './DetailedMap.style.scss';


const DetailedMap = ({
    map,
    mapType,
    showGrid,
    showSize,
}) => {
    const getSource = () => {
        let type;

        switch (mapType) {
            case mapTypes[0]:
                type = "map_standard";
                break;
            case mapTypes[1]:
                type = "map_height";
                break;
            case mapTypes[2]:
                type = "map_terrain";
                break;
            default:
                return "http://www.coalitionrc.com/wp-content/uploads/2017/01/placeholder.jpg"
        }

        return map[type]

    }
    return (
        <div
            className={`map
                ${showGrid
                    ? "show-grid"
                    : ""
                }`
            }
            name={map.name}>
            <div className="image-wrapper">
                <img
                    id="pello"
                    src={getSource()}
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
        </div>
    )
}

export default DetailedMap
