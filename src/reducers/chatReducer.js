import types from '../actions/types';

const initialState = {
    selected: false,
    currentChat: {},
    chatsList: [],
    messages: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SELECT_CHAT:
            return {
                ...state,
                selected: true,
                currentChat: action.payload
            }
        case types.GET_CHATS_SUCCESS:
            return {
                ...state,
                chatsList: action.payload
            }
        case types.GET_CHATS_FAILED:
            return state
        case types.ADD_CHAT_SUCCESS:
            return {
                ...state,
                chatsList: [
                    ...state.chatsList,
                    action.payload
                ]
            }
        case types.ADD_CHAT_FAILED:
            return state;
        case types.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.payload
            };
        case types.GET_MESSAGES_FAILED:
            return state;
        case types.UPDATE_LATEST_MESSAGE:
            return {
                ...state,
                currentChat: {
                    ...state.currentChat,
                    latestMessage: {
                        ...state.currentChat.latestMessage,
                        content: action.payload
                    }
                }
            }
        default:
            return state;
    }
}