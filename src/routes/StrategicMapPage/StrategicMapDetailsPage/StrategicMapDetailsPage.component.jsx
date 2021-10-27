import React, { useEffect, useState } from 'react';
import db from '../../../util/db';
import axe from 'gun/axe';
import SEA from 'gun/sea';
import InputField from '../../../components/InputField';
import './StrategicMapDetailsPage.style.scss';

window.db = db;
//let SEA = Gun.SEA()
// FIX: don't rerender whole page on icon drag
const StrategicMapDetailsPage = ({ id }) => {
    const [password, setPassword] = useState("");
    const [strategicMap, setStrategicMap] = useState(null);
    const [mapNode, setMapNode] = useState(null);
    const [mapArea, setMapArea] = useState(null);

    window.stratmap = strategicMap

    useEffect(() => {
        // setX(db.get("stratMap").get(id).on((map, gunid) => {
        //     console.log(`%cON ${gunid}: ${JSON.stringify(map)}`, "background-color: black; color: white; padding: 0.25rem");

        //     //setStrategicMap(map)
        // }))
        setMapNode(db.get("stratMap").get(id).on((map, gunid) => {
            setStrategicMap(map)
        }))
    }, [])

    useEffect(() => {
        const decr = async () => {
            if (strategicMap) {
                const decrypted = await SEA.decrypt(strategicMap.data, password)

                if (decrypted) {
                    setStrategicMap(prev => ({
                        ...prev,
                        data: decrypted
                    }))
                    console.log(document.querySelector("#map"))
                    setMapArea(document.querySelector("#map").getBoundingClientRect());

                }
            }
        }
        decr()
    }, [password, strategicMap])


    // useEffect(() => {
    //     console.log(`%cState updated.`, "background-color: purple; color: white; padding: 0.25rem")
    // }, [data])

    const mapOverlays = (overlays) => {
        if (overlays) {
            return (
                <img src={overlays._0.icon} alt="" style={{ width: "3rem", position: "absolute", left: overlays._0.x + "px" }}
                    // onClick={async (e) => {

                    //     const data = {
                    //         ...strategicMap.data,
                    //         name: strategicMap.data.name + "1",
                    //         overlays: {
                    //             _0: {
                    //                 icon: strategicMap.data.overlays._0.icon,
                    //                 x: strategicMap.data.overlays._0.x + 10,
                    //                 y: strategicMap.data.overlays._0.y + 10,
                    //             }
                    //         }
                    //     }
                    //     const encr = await SEA.encrypt(data, password)

                    //     mapNode.put({ data: encr }, (ack) => {
                    //         console.log(ack)
                    //     })
                    // }}
                    draggable="true"
                    onDrag={async (e) => {

                        const x = e.clientX - mapArea.left;
                        const y = e.clientY - mapArea.top;

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
                    <h2 onClick={() => {

                    }}>
                        This data is encrypted.
                        <InputField
                            onChange={value => {
                                setPassword(value)
                            }}
                        />
                    </h2>
                    <pre>{JSON.stringify(strategicMap, "null", 4)}</pre>
                    <div>
                        <div className="overlay">
                            {mapOverlays(strategicMap.data.overlays)}
                        </div>
                        <img src={strategicMap.data.map} alt="" id="map" style={{ width: "20rem", height: "20rem" }} />
                    </div>
                </>
            )
        }

        return (
            <div onClick={async () => {
                // const newStratMap = {
                //     id: id,
                //     name: "test name",
                //     description: "lorem ipsum dolor sit amet",
                //     owner: "567856644",
                //     passwordProtected: true
                // }

                // // pair
                // // encrypt
                // // decrypt

                // // let pair = await SEA.pair();
                // // let x = await SEA.encrypt(newStratMap, pair);
                // // var data = await SEA.sign(x, pair);
                // // var msg = await SEA.verify(data, pair.pub);
                // // var dec = await SEA.decrypt(msg, pair);
                // // console.log(pair)
                // // console.log(x)
                // // console.log(data)
                // // console.log(msg)
                // // console.log(dec)

                // let encdata = await SEA.encrypt(newStratMap, "thispassword")
                // let decdata = await SEA.decrypt(encdata, "thispassword")
                // let fakedecdata = await SEA.decrypt(encdata, "notthispassword")

                // console.log(encdata)
                // console.log(decdata)
                // console.log(fakedecdata)

                // // db.get("stratMap").get(id).put(newStratMap, () => {
                // //     console.log(`%cPUT ${id}`, "background-color: blue; color: white; padding: 0.25rem")
                // // })
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
