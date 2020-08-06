import types from '../actions/types';
import { fetchData } from '../utils/fetch';

export const addChatRequest = async (input, token, dispatch) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            _id: input
        }),
        redirect: 'follow'
    };
    try {
        const { result, response } = await fetchData({ 
            URL: 'http://185.211.59.101:8080/chat/create-direct',
            requestOptions
        });
        if (response.status !== 201) {  
            throw new Error("Couldn't create new chat");
        }
        dispatch(addChatSuccess(result.user));
    } catch (err) {
        dispatch(addChatFailed(err));
    }
}

const addChatSuccess = result => ({
    type: types.ADD_CHAT_SUCCESS,
    payload: result
});

const addChatFailed = err => ({
    type: types.ADD_CHAT_FAILED,
    payload: err
});

export const chatListRequest = async (token, dispatch) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token
        },
        redirect: 'follow'
    };
    try {
        const { result, response } = await fetchData({
            URL: 'http://185.211.59.101:8080/chat/all',
            requestOptions
        });
        if (response.status !== 200) { // Status code gonna get changed
            throw new Error("Couldn't find any chat");
        }
        dispatch(chatListSuccess(result));
    } catch (err) {
        dispatch(chatListFailed(err));
    }
}

const chatListSuccess = result => ({
    type: types.GET_CHATS_SUCCESS,
    payload: result
});

const chatListFailed = err => ({
    type: types.GET_CHATS_FAILED,
    payload: err
});

export const getMessagesRequest = async ({ token, chatId }, dispatch) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token
        },
        redirect: 'follow'
    };
    try {
        const { result, response } = await fetchData({
            URL: `http://185.211.59.101:8080/chat/messages/${chatId}`,
            requestOptions
        });
        if (response.status !== 200) {
            throw new Error("Couldn't get messages for the chat");
        }
        dispatch(getMessagesSuccess(result));
    } catch (err) {
        dispatch(getMessagesFailed(err));
    }
}

const getMessagesSuccess = result => ({
    type: types.GET_MESSAGES_SUCCESS,
    payload: result
});

const getMessagesFailed = err => ({
    type: types.GET_MESSAGES_FAILED,
    payload: err
});