import React from 'react';
import './Map.style.scss';

const Map = ({
    map,
    showName,
    showGrid,
    showSize,
}) => {
    return (
        <a
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
}

export default Map
