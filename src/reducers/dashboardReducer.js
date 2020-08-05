import types from '../actions/types';

const initialState = {
    currentComponent: 'Dashboard'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.CURRENT_COMPONENT:
            return {
                ...state,
                currentComponent: action.payload
            }
        default:
            return state;
    }
}