import * as actions from './types';

/*************** Loading ***************/

export const toggleisLoading = () => {
    return {
        type: actions.LOADING_TOGGLE,
    }
}

export const setIsLoading = (isTrue) => {
    if (isTrue) {
        return {
            type: actions.LOADING_SET_TRUE,
        }
    }
    else {
        return {
            type: actions.LOADING_SET_FALSE,
        }
    }
}

/*************** Status ***************/

export const setStatus = (statusActionType) => {
    return {
        type: statusActionType,
    }
}

export const statisticsSearchSelectType = (type) => {
    return {
        type: actions.STATISTICS_SEARCH_SELECT_TYPE,
        payload: {
            type
        }
    }
}

export const statisticsSearchSelectServer = (server) => {
    return {
        type: actions.STATISTICS_SEARCH_SELECT_SERVER,
        payload: {
            server
        }
    }
}

export const statisticsSearchSetName = (name) => {
    return {
        type: actions.STATISTICS_SEARCH_SET_NAME,
        payload: {
            name
        }
    }
}

export const statisticsSearchSetId = (id) => {
    return {
        type: actions.STATISTICS_SEARCH_SET_ID,
        payload: {
            id
        }
    }
}

export const login = (userData) => {
    return {
        type: actions.LOGIN,
        payload: userData
    }
}

export const logout = () => {
    return {
        type: actions.LOGOUT
    }
}

export const flash = (flashObject) => {
    return {
        type: actions.FLASH,
        payload: {
            title: flashObject.title,
            message: flashObject.message
        }
    }
}
