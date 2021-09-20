import * as actions from "../../actions/types";
import initialState from "../../initialState";

const statisticsSearchReducer = (state = initialState.statistics, action) => {
    switch (action.type) {
        case actions.STATISTICS_SEARCH_SELECT_TYPE:
            return {
                ...state,
                searchType: action.payload.type
            }
        case actions.STATISTICS_SEARCH_SELECT_SERVER:
            return {
                ...state,
                server: action.payload.server
            }
        case actions.STATISTICS_SEARCH_SET_NAME:         
            return {
                ...state,
                name: action.payload.name
            }     
        case actions.STATISTICS_SEARCH_SET_ID:         
            return {
                ...state,
                id: action.payload.id
            }     
        default:
            return state;
    }
}

export default statisticsSearchReducer;