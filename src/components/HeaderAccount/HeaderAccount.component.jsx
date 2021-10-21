import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import appId from '../../globals/appId';
import { login, logout } from '../../redux/actions/actions';
import db from '../../util/db';
import useClickOutside from '../../util/useClickOutside';
import Button from '../Button';
import InfoButton from '../InfoButton';
import StyleableAccountIconSVG from '../StyleableAccountIconSVG';
import { LOGIN_URL } from '../../globals/url';
import './HeaderAccount.style.scss';


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
        console.log(JSON.stringify(user))
    })

    // Hide account menu when clicked outside
    useClickOutside(thisComponent, () => {
        setIsExpanded(false);
    })

    const renewAccessToken = () => {
        // WG API only accepts formdata
        let formData = new FormData();
        formData.append('application_id', appId);
        formData.append('access_token', user.access_token);

        fetch("https://api.worldoftanks.eu/wot/auth/prolongate/", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then((data) => {
                if (data.status === "ok") {
                    console.log("Renewing access token.")
                    let _user = db.get("users").get(user.account_id);

                    // Update both client and database
                    _user.put({
                        access_token: data.data.access_token,
                        expires_at: data.data.expires_at
                    })

                    dispatch(login({
                        ...user,
                        access_token: data.data.access_token,
                        expires_at: data.data.expires_at.toString()
                        // Convert to string because original is also a string
                    }))
                }
                //console.log("Something went wrong")
            })
            .catch(error => {
                console.log(error)
            })
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

    const PenisButton = () => {
        return (
            <Button
                isPrimary={false}
                onClick={() => {
                    fetch(`https://api.worldoftanks.eu/wot/auth/login/?application_id=62da3ef417f70e5ffeb44cf6fa339e1e&nofollow=1&redirect_uri=http://${window.location.host}/api/auth/`.replace("3000", "8765"), { method: "POST" })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            window.location.href = data.data.location;
                        })
                        .catch(error => console.log(error))
                }}
            >
                SUPERLOGIN
            </Button>
        )
    }

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
                <PenisButton />
            </div>

    )
}

export default HeaderAccount
