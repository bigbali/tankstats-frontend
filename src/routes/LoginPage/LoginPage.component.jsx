import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/actions';
import db from '../../util/db';
import appId from '../../globals/appId';
import { SEA } from 'gun';
import { AUTH_ENDPOINT } from '../../globals/url';

const LoginPage = () => {
    const params = new URLSearchParams(window.location.search);
    const dispatch = useDispatch();

    const [hasFinished, setHasFinished] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);

    // Allow calling from console
    window.gun = db;

    const redirect = params.get('redirect');
    const status = params.get('status');
    const access_token = params.get('access_token');
    const nickname = params.get('nickname');
    const account_id = params.get('account_id');
    const expires_at = params.get('expires_at');

    useEffect(() => {
        const authenticateUser = async () => {
            fetch(AUTH_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_token: access_token,
                    account_id: account_id,
                    nickname: nickname
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    localStorage.setItem("secret_key", data.encryptionKey)
                    return data.encryptionKey
                })
                .then(key => {
                    if (!key) {
                        setHasFailed(true);
                        return null // Prevent trying to decrypt without key
                    }

                    // After decryption key is set in localStorage,
                    // forward it here and use it to decrypt user data,
                    // then log user in
                    db.get("users").get(account_id).once(async (user) => {
                        const decryptedUser = await SEA.decrypt(user, key);

                        dispatch(login({
                            ...decryptedUser
                        }))

                        // Login successful, now please redirect me to wherever I was
                        setHasFinished(true);
                    })
                })
                .catch((error) => {
                    setHasFailed(true);
                    console.log(error)
                })
        }

        if (status === "ok") {
            authenticateUser();
        }
        else {
            console.error(`Status not ok?`)
        }
    }, [])

    if (hasFinished && !hasFailed) {
        return <Redirect to={redirect} />
    }
    else if (hasFinished && hasFailed) {
        return <h1>Authentication failed</h1>
    }

    // DO: if no key, or for whatever reason login fails, display message
    return <h1>
        Waiting for redirect, please wait
    </h1>
}

// Encryption
// const [isEncrypted, setIsEncrypted] = useState(false);

//     const search = window.location.search;
//     const params = new URLSearchParams(search);
//     const dispatch = useDispatch();

//     let access_token = params.get('access_token');
//     let redirect = params.get('redirect');
//     let status = params.get('status');
//     let nickname = params.get('nickname');
//     let account_id = params.get('account_id');
//     let expires_at = params.get('expires_at');

//     useEffect(() => {
//         if (status === "ok") {
//             const encrypt = async () => {
//                 access_token = await SEA.encrypt(access_token, "getenv_secretkey")
//                 expires_at = await SEA.encrypt(expires_at, "getenv_secretkey")
//             }

//             encrypt().then(() => {
//                 dispatch(login({
//                     access_token,
//                     expires_at,
//                     nickname,
//                     account_id
//                 }));

//                 setIsEncrypted(true);
//             })
//         }
//     }, [])


//     if (isEncrypted) {
//         return (
//             <Redirect to={redirect} />
//         )
//     }
//     else {
//         return <div>Failed to authenticate</div>
//     }

export default LoginPage
