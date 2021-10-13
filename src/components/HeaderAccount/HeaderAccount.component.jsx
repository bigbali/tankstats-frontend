import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { login, logout } from '../../redux/actions/actions';
import Button from '../Button';
import StyleableAccountIconSVG from '../StyleableAccountIconSVG';
import './HeaderAccount.style.scss';


const HeaderAccount = () => {
    const location = useLocation();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const loginUrl = `https://api.worldoftanks.eu/wot/auth/login/?application_id=62da3ef417f70e5ffeb44cf6fa339e1e&redirect_uri=http://${window.location.host}/login/?redirect=${location.pathname}`;

    const LoginButton = () => {
        return (
            <a href={loginUrl}>
                <Button>
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

    useEffect(() => {
        console.log(location)
    }, [location])


    return (
        user
            ? (
                <div className="header-account">
                    <LogoutButton />
                    <StyleableAccountIconSVG onClick={() => {
                        dispatch(login("mialófasz a nevem"));
                        console.log(user)
                    }} />
                </div>
            )
            : <LoginButton />

    )
}

export default HeaderAccount
