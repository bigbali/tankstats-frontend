import initialState from "../../initialState";
import * as actions from "../../actions/types";
import * as status from '../../statuscodes';

const userReducer = (state = initialState.user, action) => {
    const user = action.payload;
    
    switch (action.type){
        case actions.LOGIN:
            console.log("login")

            return user

        case actions.LOGOUT:
            console.log("logout")
            return null

        default:
            console.log("!DEFAULT!")
            return state;
    }
}

export default userReducer;