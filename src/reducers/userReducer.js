import types from '../actions/types';

const initialState = {
    activeUser: {}
};

export default function (state = initialState, action) {
    if (action.type in types) {
        return {
            ...state,
            activeUser: action.payload
        };
    } else {
        return state;
    }
}