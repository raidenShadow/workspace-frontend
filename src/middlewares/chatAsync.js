import types from '../actions/types';

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
        const response = await fetch('http://185.211.59.101:8080/chat/create-direct', requestOptions);
        if (response.status !== 201) {  
            throw new Error("Couldn't create new chat");
        }
        const result = await response.json();
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
        const response = await fetch('http://185.211.59.101:8080/chat/all', requestOptions);
        if (response.status !== 201) { // Status code gonna get changed
            throw new Error("Couldn't find any chat");
        }
        const result = await response.json();
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
