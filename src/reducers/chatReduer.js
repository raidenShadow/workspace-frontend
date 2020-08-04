import types from '../actions/types';

const initialState = {
    currentChat: {},
    chatsList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SELECT_CHAT:
            return {
                ...state,
                currentChat: action.payload
            }
        case types.UPDATE_CHAT_LIST:
            return {
                ...state,
                chatsList: action.payload
            }
        default:
            return state;
    }
}