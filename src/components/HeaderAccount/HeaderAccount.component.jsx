import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { login, logout } from '../../redux/actions/actions';
import Button from '../Button';
import StyleableAccountIconSVG from '../StyleableAccountIconSVG';
import './HeaderAccount.style.scss';


const HeaderAccount = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const loginUrl = `https://api.worldoftanks.eu/wot/auth/login/?application_id=62da3ef417f70e5ffeb44cf6fa339e1e&redirect_uri=http://${window.location.host}/login/?redirect=${location.pathname}`;

    const getDaysLeft = () => {
        // Get days left till access token expires
        const futureDate = new Date(user.expires_at * 1000);
        const currentDate = new Date();
        const offset = 14 * 24 * 3600 * 1000;
        const delta = new Date(futureDate.getTime() - offset)

        return Math.floor((futureDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24))
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
                    }`}>
                    <Nickname />
                    <StyleableAccountIconSVG onClick={() => {
                        setIsExpanded(previous => !previous)
                    }} />
                    <div className="menu">
                        <div>
                            Your token will expire in {getDaysLeft()} days.
                        </div>
                        <div>
                            {/* TODO: */}
                            Renew token
                        </div>
                        <LogoutButton />
                    </div>
                </div>
            )
            : <LoginButton />

    )
}

export default HeaderAccount
