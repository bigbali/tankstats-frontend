import React, { useEffect, useState } from 'react';
import db from '../../../util/db';
import axe from 'gun/axe';
import SEA from 'gun/sea';
import InputField from '../../../components/InputField';

window.db = db;
//let SEA = Gun.SEA()

const StrategicMapDetailsPage = ({ id }) => {
    // SET TO NULL
    const [data, setData] = useState("404: Doesn't exist");
    const [isEncrypted, setIsEncrypted] = useState(false);

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
        db.get("stratMap").get(id).on(async (value, gunid) => {
            console.log(`%cON ${gunid}: ${JSON.stringify(value)}`, "background-color: black; color: white; padding: 0.25rem");

            // If 404, we never get here to begin with
            setData(value)

            if (!value.isPublic) {
                setIsEncrypted(true)
            }
            else {
            }

            // if (!data) {
            //     data = await SEA.decrypt(value, "password")
            // }

            // const decrypted = await SEA.decrypt(value, "password")
            // console.log(decrypted)


            // setData(previousData => ({
            //     //...previousData,
            //     // [gunid]: {
            //     //     id: gunid,
            //     //     name: value.name,
            //     //     description: value.description,
            //     //     owner: value.owner,
            //     //     passwordProtected: value.passwordProtected
            //     // }
            //     [gunid]: data
            // }))
        })
    }, [])

    useEffect(() => {
        console.log(`%cState updated.`, "background-color: purple; color: white; padding: 0.25rem")
    }, [data])

    if (data) {
        if (isEncrypted) {
            return (
                <>
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
                        This data is encrypted.
                        <InputField
                            onChange={async (value) => {
                                console.log(data)
                                console.log(value)
                                const decrypted = await SEA.decrypt(data, value)

                                if (decrypted) {
                                    setData(decrypted)
                                    setIsEncrypted(false)
                                }
                            }}
                        />
                    </h2>
                    <pre>{JSON.stringify(data, "null", 4)}</pre>
                </>
            )
        }
        return (
            <div onClick={async () => {
                const newStratMap = {
                    id: id,
                    name: "test name",
                    description: "lorem ipsum dolor sit amet",
                    owner: "567856644",
                    passwordProtected: true
                }

                // pair
                // encrypt
                // decrypt

                // let pair = await SEA.pair();
                // let x = await SEA.encrypt(newStratMap, pair);
                // var data = await SEA.sign(x, pair);
                // var msg = await SEA.verify(data, pair.pub);
                // var dec = await SEA.decrypt(msg, pair);
                // console.log(pair)
                // console.log(x)
                // console.log(data)
                // console.log(msg)
                // console.log(dec)

                let encdata = await SEA.encrypt(newStratMap, "thispassword")
                let decdata = await SEA.decrypt(encdata, "thispassword")
                let fakedecdata = await SEA.decrypt(encdata, "notthispassword")

                console.log(encdata)
                console.log(decdata)
                console.log(fakedecdata)

                // db.get("stratMap").get(id).put(newStratMap, () => {
                //     console.log(`%cPUT ${id}`, "background-color: blue; color: white; padding: 0.25rem")
                // })
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
