import React, { useEffect, useState } from 'react';
import db from '../../../util/db';
import axe from 'gun/axe';
import SEA from 'gun/sea';
import InputField from '../../../components/InputField';
import './StrategicMapDetailsPage.style.scss';
import StrategicMap from '../../../components/StrategicMap';

window.db = db;
//let SEA = Gun.SEA()
const StrategicMapDetailsPage = ({ id }) => {
    const [password, setPassword] = useState("");
    const [strategicMap, setStrategicMap] = useState(null);
    const [mapNode, setMapNode] = useState(null);
    // const mapArea = {
    //     x: 320,
    //     y: 320
    // }
    // let x = {};

    window.stratmap = strategicMap

    useEffect(() => {
        setMapNode(db.get("stratMap").get(id).once((map, gunid) => {
            if (strategicMap !== map) {
                setStrategicMap(map)
            }
        }))
    }, [])

    useEffect(() => {
        const decr = async () => {
            if (strategicMap) {
                const decrypted = await SEA.decrypt(strategicMap.registry, password)

                if (decrypted) {
                    setStrategicMap(prev => ({
                        ...prev,
                        registry: decrypted
                    }))
                }
            }
        }
        decr()
    }, [password, strategicMap])

    const mapOverlays = (overlays) => {
        if (overlays) {
            return (
                <img src={overlays._0.icon} alt="" style={{ width: "3rem", position: "absolute", left: overlays._0.x + "px" }}
                    draggable="true"
                    onDrag={async (e) => {

                        // const x = e.clientX - mapArea.left;
                        // const y = e.clientY - mapArea.top;
                        const x = e.clientX;
                        const y = e.clientY;

                        const data = {
                            ...strategicMap.data,
                            name: strategicMap.data.name + "1",
                            overlays: {
                                _0: {
                                    icon: strategicMap.data.overlays._0.icon,
                                    x: x,
                                    y: y,
                                }
                            }
                        }
                        const encr = await SEA.encrypt(data, password)

                        mapNode.put({ data: encr }, (ack) => {
                            console.log(ack)
                        })
                    }} />
            )
        }
    }

    if (strategicMap) {
        if (strategicMap.isEncrypted) {
            return (
                <>
                    <h2>
                        This data is encrypted.
                        <InputField
                            onChange={value => {
                                setPassword(value)
                            }}
                        />
                    </h2>
                    <pre>{JSON.stringify(strategicMap, "null", 4)}</pre>
                    <div>
                        <StrategicMap id={strategicMap.id} decryptionKey={password} />
                    </div>
                </>
            )
        }

        return (
            <div onClick={async () => {
            }}>
                {/* <h1>INTERACTIVE MAP</h1> */}
                <pre>{JSON.stringify(strategicMap, "null", 4)}</pre>
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
