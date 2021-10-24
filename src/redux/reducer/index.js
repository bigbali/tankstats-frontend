import { combineReducers } from 'redux';
import loadingReducer from './partialReducers/loadingReducer';
import statusReducer from './partialReducers/statusReducer';
import headerFormReducer from './partialReducers/headerFormReducer';
import statisticsSearchReducer from './partialReducers/statisticsSearchReducer';
import userReducer from './partialReducers/userReducer';
import flashReducer from './partialReducers/flashReducer';

const reducer = combineReducers({
    user: userReducer,
    flash: flashReducer
});

export default reducer;