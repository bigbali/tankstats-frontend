import initialState from "../../initialState";
import * as actions from "../../actions/types";
import * as status from '../../statuscodes';

const flashReducer = (state = initialState.flash, action) => {
    switch (action.type) {
        case actions.FLASH:
            console.log("flash")
            return {
                title: action.payload.title,
                message: action.payload.message
            }

        default:
            console.log("flash default")
            return state;
    }
}

export default flashReducer;