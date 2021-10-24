import initialState from "../../initialState";
import * as actions from "../../actions/types";

const flashReducer = (state = initialState.flash, action) => {
    if (action.type === actions.FLASH) {
        return { ...action.payload }
    }

    return state;
}

export default flashReducer;