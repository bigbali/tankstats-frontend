/**
 * This file is responsible for constructing the URLs needed to navigate the
 * page and fetch data from Wargaming.
 */

import { isDev } from '../util/appEnv';

const dev = isDev();
const port = dev
    ? 3000
    : 443;
const apiPort = 8765;
const releaseDomain = "https://imaginary-domain.com";
const developmentDomain = "http://localhost";

const host = `${dev ? developmentDomain : releaseDomain}:${port}`
const apiHost = `${dev ? developmentDomain : releaseDomain}:${apiPort}`

export const LOGIN_URL = `${host}/login/`
export const AUTH_ENDPOINT = `${apiHost}/api/auth/`

