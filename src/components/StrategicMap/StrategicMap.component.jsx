import SEA from 'gun/sea';
import React, { useEffect, useState } from 'react'
import db from '../../util/db';

let nodeReference = null;
let positions = {
    x: 0,
    y: 0
}

const StrategicMap = ({
    id,
    decryptionKey
}) => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const getDecrypted = async (encrypted) => {
            return await SEA.decrypt(encrypted, decryptionKey)
        }

        nodeReference = db.get("stratMap").get(id).get("map").on(async (encryptedMap, gunid) => {
            setMap(await getDecrypted(encryptedMap));
        })

        // setInterval(async () => {
        //     const newMap = {
        //         ...map,
        //         overlays: {
        //             ...map.overlays,
        //             overlay0: {
        //                 id: "overlay0",
        //                 icon: map.overlays.overlay0.icon,
        //                 x: positions.x,
        //                 y: positions.y
        //             }
        //         }
        //     }

        //     const encr = await SEA.encrypt(newMap, decryptionKey)
        //     nodeReference.put(encr)
        // }, 100)
    }, [id, decryptionKey])

    const mapOverlays = (overlays) => {
        overlays = Object.entries(overlays);
        return overlays.map(overlay => {
            const key = overlay[0];
            const { id, icon, x, y } = overlay[1];

            return (
                <img key={key} src={icon} alt="zulu" style={{ width: "2rem", height: "2rem", position: "absolute", left: `${x}px`, top: `${y}px` }}
                    draggable="true" onDrag={async (e) => {
                        const x = e.clientX;
                        const y = e.clientY;

                        positions.x = x;
                        positions.y = y;

                        const newMap = {
                            ...map,
                            overlays: {
                                ...map.overlays,
                                [key]: {
                                    id: key,
                                    icon: icon,
                                    x: x,
                                    y: y
                                }
                            }
                        }

                        const encr = await SEA.encrypt(newMap, decryptionKey)
                        nodeReference.put(encr)
                    }} />
            )
        })
    }

    if (!map) return null

    return (
        <div>
            <div className="overlay">
                {mapOverlays(map.overlays)}
            </div>
            <img src={map.background} alt="" id="map" style={{ width: "20rem", height: "20rem" }} />
        </div>
    )
}

export default StrategicMap
