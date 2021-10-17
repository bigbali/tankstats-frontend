import React from 'react';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/actions';
import db from '../../util/db';

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

    if (status === "ok") {
        let user = db.get("users").get(account_id);

        user.once((currentUser) => {
            if (!currentUser) {
                console.log("User does not exist. Creating it...")

                user.put({
                    nickname,
                    access_token,
                    expires_at
                })
            }
            else if (currentUser && currentUser.access_token !== access_token) {
                console.log("User exists but access token doesn't match! Updating...")

                user.put({
                    access_token,
                    expires_at
                })
            }
        })

        dispatch(login({
            access_token,
            nickname,
            account_id,
            expires_at
        }));
    }
    else {
        console.error(`Authentication failed with error ${status}`)
    }

    return (
        <Redirect to={redirect} />
    )
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
