import { combineReducers } from 'redux';
import loadingReducer      from './partialReducers/loadingReducer';
import statusReducer       from './partialReducers/statusReducer';
import headerFormReducer   from './partialReducers/headerFormReducer';

const reducer = combineReducers({
    isLoading:  loadingReducer,
    status:     statusReducer,
    headerForm:   headerFormReducer
    });

export default reducer;