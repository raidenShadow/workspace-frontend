import types from '../actions/types';

const initialState = {
    selected: false,
    currentChat: {},
    chatsList: []
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
        default:
            return state;
    }
}