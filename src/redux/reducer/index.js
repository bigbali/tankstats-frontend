import { combineReducers } from 'redux';
import loadingReducer      from './partialReducers/loadingReducer';
import statusReducer       from './partialReducers/statusReducer';
import headerFormReducer   from './partialReducers/headerFormReducer';
import statisticsSearchReducer   from './partialReducers/statisticsSearchReducer';

const reducer = combineReducers({
    statistics: statisticsSearchReducer,
    isLoading:  loadingReducer,
    status:     statusReducer,
    headerForm:   headerFormReducer
    });

export default reducer;