import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import dashboardReducer from './dashboardReducer';
import boardReducer from './boardReducer';

export default combineReducers({
    user: userReducer,
    chat: chatReducer,
    dashboard: dashboardReducer,
    board: boardReducer
});