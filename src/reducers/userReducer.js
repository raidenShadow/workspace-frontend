import types from '../actions/types';

const initialState = {
    loading: false,
    activeUser: {},
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.REGISTER_USER_STARTED:
            return {
                ...state,
                loading: true
            }
        case types.REGISTER_USER_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                activeUser: action.payload 
            } 
        case types.REGISTER_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.ALREADY_LOGGEDIN_SUCCESS: 
            return {
                ...state,
                error: null,
                activeUser: action.payload,
            }
        case types.ALREADY_LOGGEDIN_FAILED:
            return {
                ...state,
                error: action.payload,
                activeUser: {}
            }
        case types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                error: null,
                activeUser: action.payload
            }
        case types.LOGIN_USER_FAILED:
            return {
                ...state,
                error: action.payload,
                activeUser: {}
            }
        default:
            return state;
    }
}