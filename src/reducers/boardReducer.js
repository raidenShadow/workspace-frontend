import types from '../actions/types';

const initialState = {
    boards: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_BOARDS_SUCCESS:
            return {
                ...state,
                boards: action.payload
            };
        case types.GET_BOARDS_FAILED:
            return state;
        default:
            return state;
    }
}