import {
    registerUserStart, registerUserRequest, isLoggedInRequest, loginRequest
} from '../middlewares/auth';


export const fetchUser = (loginData, cb) => async dispatch => {
    return await loginRequest(loginData, dispatch, cb);
};

export const registerUser = (body, cb) => async dispatch => {
    dispatch(registerUserStart());
    return await registerUserRequest(body, dispatch, cb);
};

export const isLoggedIn = (token, cb = null) => async dispatch => {
    return await isLoggedInRequest(token, dispatch, cb);
}
