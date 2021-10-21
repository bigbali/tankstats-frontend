import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/actions';
import db from '../../util/db';
import appId from '../../globals/appId';
import { AUTH_ENDPOINT } from '../../globals/url';

const LoginPage = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const dispatch = useDispatch();

    const redirect = params.get('redirect');
    const status = params.get('status');
    const access_token = params.get('access_token');
    const nickname = params.get('nickname');
    const account_id = params.get('account_id');
    const expires_at = params.get('expires_at');

    useEffect(() => {
        const authenticateUser = async () => {
            const user = await fetch(AUTH_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_token: access_token
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch((error) => {
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
