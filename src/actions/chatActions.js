import types from './types';


export const selectChat = chatData => dispatch => {
    dispatch({
        type: types.SELECT_CHAT,
        payload: chatData
    });
};

export const updateChatList = chats => dispatch => {
    dispatch({
        type: types.UPDATE_CHAT_LIST,
        payload: chats
    });
}