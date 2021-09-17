import initialState from "../../initialState";
import * as actions from "../../actions/types";

const headerFormReducer = (state = initialState.headerForm, action) => {
    switch (action.type) {
        case actions.HEADER_FORM_SELECT_TYPE:
            return {
                ...state,
                type: action.payload.type
            }
        case actions.HEADER_FORM_SELECT_SERVER:
            return {
                ...state,
                server: action.payload.server
            }
        case actions.HEADER_FORM_SET_ID:         
            return {
                ...state,
                id: action.payload.id
            }     
        default:
            return state;
    }
}

export default headerFormReducer;