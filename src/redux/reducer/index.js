import { combineReducers } from 'redux';
import loadingReducer      from './partialReducers/loadingReducer';
import statusReducer       from './partialReducers/statusReducer';
import headerFormReducer   from './partialReducers/headerFormReducer';
import statisticsSearchReducer   from './partialReducers/statisticsSearchReducer';
import userReducer from './partialReducers/userReducer';

const reducer = combineReducers({
    user: userReducer
});

export default reducer;