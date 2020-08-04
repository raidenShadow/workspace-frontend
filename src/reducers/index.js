import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReduer';

export default combineReducers({
    user: userReducer,
    chat: chatReducer
});