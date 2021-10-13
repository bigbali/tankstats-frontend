import React from 'react';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/actions';

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

export default LoginPage
