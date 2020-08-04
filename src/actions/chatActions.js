import types from './types';
import { addChatRequest, chatListRequest } from '../middlewares/chatAsync';

export const selectChat = chatData => dispatch => {
    dispatch({
        type: types.SELECT_CHAT,
        payload: chatData
    });
};

export const addChat = (input, token) => async dispatch => await addChatRequest(input, token, dispatch);

export const getChats = token => async dispatch => await chatListRequest(token, dispatch);