import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/actions';
import db from '../../util/db';
import { SEA } from 'gun';
import { AUTH_ENDPOINT } from '../../globals/url';
import flashMessage from '../../util/flash';
import './LoginPage.style.scss';
import store from '../../redux/store';

// REFACTOR
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

                        flashMessage({
                            delay: 1000,
                            title: "Success:",
                            message: "Login successful"
                        })

                        // Prevent bug where we could get stuck on auth error page
                        if (hasFailed) {
                            setHasFailed(false);
                        }
                        // Login successful, now please redirect me to wherever I was
                        setHasFinished(true);
                    })
                })
                .catch((error) => {
                    setHasFailed(true);
                })
        }

        if (status === "ok") {
            authenticateUser();
        }
        else if (status === "error") {
            flashMessage({
                delay: 500,
                title: "Error:",
                message: "We received an error status from Wargaming."
            })
            setHasFailed(true);
        }
        else {
            // This means user is doing stupid => redirect
            setHasFinished(true);
        }
    }, [access_token, account_id, dispatch, hasFailed, nickname, status])

    useEffect(() => {
        // Edge case, where user navigates to login page and fills out GET query params correctly
        if (hasFailed) {
            if (store.getState().user) {
                flashMessage({
                    delay: 500,
                    title: "Error:",
                    message: "You are logged in already!"
                })
            }
            else {
                flashMessage({
                    delay: 500,
                    title: "Error:",
                    message: "Login failed"
                })
            }
        }
    }, [hasFailed])

    if (hasFinished && !hasFailed) {
        // If for some reason login page redirects to login page, redirect to 
        // home page instead
        if (redirect && redirect.includes("login")) {
            return <Redirect to="" />
        }
        // Make sure we don't try to redirect to 'null'
        return <Redirect to={redirect || ""} />
    }
    if (hasFailed) {
        return (
            <div className="login-page">
                <div className="auth-failed">
                    <h1>
                        Authentication has failed
                    </h1>
                    <p>
                        We couldn't log you in. Please try again.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="login-page">
            <div className="wait-for-login">
                <h1>
                    Waiting to log you in
                </h1>
                <p>
                    We rely on data from Wargaming to create a seamless experience for you.
                    It may take some time for Wargaming to send us that data, and then, it
                    might take us some more time to securely encrypt it.
                    Usually, this should only take a moment.
                    Contact us if this takes more than 5 seconds!
                </p>
            </div>
        </div>
    )
}

export default LoginPage
