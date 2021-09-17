import initialState from "../../initialState";
import * as actions from "../../actions/types";
import * as status from '../../statuscodes';

const statusReducer = (state = initialState.status, action) => {
    switch (action.type){
        case actions.STATUS_OK:
            return status.STATUS_OK

        case actions.STATUS_API_OFFLINE:
            return status.STATUS_API_OFFLINE

        case actions.STATUS_DATA_EMPTY:
            return status.STATUS_DATA_EMPTY

        case actions.STATUS_DATA_CORRUPTED:
            return status.STATUS_DATA_CORRUPTED

        default:
            return state;
    }
}

export default statusReducer;