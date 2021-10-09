import React, { useEffect, useState } from 'react';
import db from '../../../util/db';
import axe from 'gun/axe';

window.db = db;

const StrategicMapDetailsPage = ({ id }) => {
    // SET TO NULL
    const [data, setData] = useState({
        initial: "nemo aranka"
    });

    window.data = data

    useEffect(() => {
        // fetch(`http://www.localhost:8000/api/strategic-maps/${id}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         //console.log(JSON.stringify(data))
        //         setData(data)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }, [id])

    useEffect(() => {
        db.get("stratMap").get(id).on((value, gunid) => {
            console.log(`%cON ${gunid}: ${JSON.stringify(value)}`, "background-color: black; color: white; padding: 0.25rem")

            setData(previousData => ({
                ...previousData,
                [gunid]: {
                    id: gunid,
                    name: value.name,
                    description: value.description,
                    owner: value.owner,
                    passwordProtected: value.passwordProtected
                }
            }))
        })
    }, [])

    useEffect(() => {
        console.log(`%cState updated.`, "background-color: purple; color: white; padding: 0.25rem")
    }, [data])

    if (data) {
        if (data.is_password_protected && !data.is_authorized) {
            return (
                <h2 onClick={() => {
                    // fetch(`http://www.localhost:8000/api/strategic-maps/authenticate`, {
                    //     method: "POST",
                    //     body: JSON.stringify({
                    //         id: id,
                    //         password: "szilva"
                    //     }),
                    //     headers: {
                    //         "Content-type": "application/json; charset=UTF-8"
                    //     }
                    // })
                    //     .then(response => response.json())
                    //     .then(data => {
                    //         //console.log(JSON.stringify(data))
                    //         setData(data)
                    //     })
                    //     .catch(error => {
                    //         console.log(error)
                    //     })
                }}>
                    This data is password protected.
                </h2>
            )
        }
        return (
            <div onClick={() => {
                const newStratMap = {
                    id: id,
                    name: "test name",
                    description: "lorem ipsum dolor sit amet",
                    owner: "567856644",
                    passwordProtected: true
                }

                db.get("stratMap").get(id).put(newStratMap, () => {
                    console.log(`%cPUT ${id}`, "background-color: blue; color: white; padding: 0.25rem")
                })
            }}>
                {/* <h1>INTERACTIVE MAP</h1> */}
                <pre>{JSON.stringify(data, "null", 4)}</pre>
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
