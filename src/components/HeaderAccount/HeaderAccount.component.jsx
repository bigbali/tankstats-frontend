import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import appId from '../../globals/appId';
import { flash, login, logout } from '../../redux/actions/actions';
import db from '../../util/db';
import SEA from 'gun/sea';
import useClickOutside from '../../util/useClickOutside';
import Button from '../Button';
import InfoButton from '../InfoButton';
import StyleableAccountIconSVG from '../StyleableAccountIconSVG';
import { AUTH_ENDPOINT, LOGIN_URL } from '../../globals/url';
import './HeaderAccount.style.scss';
import flashMessage from '../../util/flash';


const HeaderAccount = () => {
    // TODO: make this ugly mess not so ugly
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const loginUrl = `https://api.worldoftanks.eu/wot/auth/login/?application_id=62da3ef417f70e5ffeb44cf6fa339e1e&redirect_uri=${LOGIN_URL}/?redirect=${location.pathname}`;
    const thisComponent = useRef();
    let futureDate;

    db.get("users").map().on((user) => {
        //console.log(user)
        // console.log(JSON.stringify(user))
        //console.log(localStorage.getItem("secret_key"))
    })

    db.get("users").once(users => console.log(users))

    // Hide account menu when clicked outside
    useClickOutside(thisComponent, () => {
        setIsExpanded(false);
    })

    const renewAccessToken = () => {
        // REFACTOR
        if (user) {
            fetch(AUTH_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_token: user.access_token,
                    account_id: user.account_id,
                    nickname: user.nickname
                })
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("secret_key", data.encryptionKey)
                    console.log("NO KEY YO")
                    return data.encryptionKey
                })
                .then(key => {
                    if (!key) {
                        flashMessage({
                            delay: 500,
                            title: "Error:",
                            message: "Failed to renew access token"
                        })

                        return null // Prevent trying to decrypt without key
                    }

                    // After decryption key is set in localStorage,
                    // forward it here and use it to decrypt user data,
                    // then log user in
                    db.get("users").get(user.account_id).once(async (user) => {
                        const decryptedUser = await SEA.decrypt(user, key);

                        dispatch(login({
                            ...decryptedUser
                        }))

                        flashMessage({
                            delay: 500,
                            timeout: 3000,
                            title: "Success:",
                            message: "Access token renewal succesful"
                        })
                    })
                })
                .catch((error) => {
                    dispatch(flash({
                        delay: 500,
                        title: "Error:",
                        message: "Failed to renew access token"
                    }))
                })
        }
    }

    // Get days left till access token expires
    const getDaysLeft = () => {
        futureDate = new Date(user.expires_at * 1000);
        const currentDate = new Date();
        const offset = 14 * 24 * 3600 * 1000;
        const delta = new Date(futureDate.getTime() - offset)

        return Math.ceil((futureDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24))
    }

    const LoginButton = () => {
        // This will redirect to WG for authentication, which in turn will redirect
        // to local login page, which will ask backend to confirm identity of user
        return (
            <a href={loginUrl}>
                <Button
                    isPrimary={true}
                >
                    Log in
                </Button>
            </a>
        )
    }

    // DO: 
    const LogoutButton = () => {
        return (
            <Button onClick={() => {
                dispatch(logout());
            }}>
                Log out
            </Button>
        )
    }

    const Nickname = () => {
        return (
            <span className="medium">
                {user.nickname}
            </span>
        )
    }

    useEffect(() => {
        console.log(location)
    }, [location])

    return (
        user
            ? (
                <div className={`header-account 
                    ${isExpanded
                        ? "expanded"
                        : ""
                    }`}
                    ref={thisComponent}
                >
                    <Nickname />
                    <StyleableAccountIconSVG onClick={() => {
                        setIsExpanded(previous => !previous)
                    }} />
                    <div className="menu">
                        <div className="expire">
                            Your token will expire in {getDaysLeft()} days.
                            <InfoButton>
                                Upon login, Wargaming issues an access token
                                that is used to authenticate your account to Wargaming services.
                                This access token will expire on {futureDate.toLocaleDateString()}
                                &nbsp;and you will be logged out automatically.
                            </InfoButton>
                        </div>
                        <div className="renew relative">
                            <Button onClick={renewAccessToken}>
                                Renew token
                            </Button>
                        </div>
                        <LogoutButton />
                    </div>
                </div>
            )
            : <div>
                <LoginButton />
            </div>

    )
}

export default HeaderAccount
