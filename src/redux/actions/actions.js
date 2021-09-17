import * as actions from './types';

/*************** Loading ***************/

export const toggleisLoading = () => {
    return {
        type: actions.LOADING_TOGGLE,
    }
}

export const setIsLoading = (isTrue) => {
    if (isTrue){
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

export const headerFormSelectType = (type) => {
    return {
        type: actions.HEADER_FORM_SELECT_TYPE,
        payload: {
            type
        }
    }
}

export const headerFormSelectServer = (server) => {
    return {
        type: actions.HEADER_FORM_SELECT_SERVER,
        payload: {
            server
        }
    }
}

export const headerFormSetId = (id) => {
    return {
        type: actions.HEADER_FORM_SELECT_SERVER,
        payload: {
            id
        }
    }
}
