import types from './types';
import { addChatRequest, chatListRequest, getMessagesRequest } from '../middlewares/chatAsync';

export const selectChat = chatData => dispatch => {
    dispatch({
        type: types.SELECT_CHAT,
        payload: chatData
    });
};

export const addChat = (input, token) => async dispatch => await addChatRequest(input, token, dispatch);

export const getChats = token => async dispatch => await chatListRequest(token, dispatch);

export const getMessages = input => async dispatch => await getMessagesRequest(input, dispatch);