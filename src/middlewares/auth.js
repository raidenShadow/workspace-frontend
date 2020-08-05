import types from '../actions/types';
import { fetchData } from '../utils/fetch';

export const loginRequest = async (loginData, dispatch, cb) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(loginData),
        redirect: 'follow'
    }
    try {
        const { result, response } = await fetchData({
            URL: 'http://185.211.59.101:8080/user/login',
            requestOptions
        });
        if (response.status !== 200) {
            throw new Error("Couldn't Log in");
        }
        cb(result.token);
        return dispatch(loginSuccess(result.user));
    } catch (err) {
        return dispatch(loginFailed(err));
    }
} 

const loginSuccess = userData => ({
    type: types.LOGIN_USER_SUCCESS,
    payload: userData
});

const loginFailed = err => ({
    type: types.LOGIN_USER_FAILED,
    payload: err
});

export const registerUserRequest = async (body, dispatch, cb) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body),
        redirect: 'follow'
    }
    try {
        const { result, response } = await fetchData({
            URL: 'http://185.211.59.101:8080/user/register',
            requestOptions
        });
        if (response.status !== 201) {
            throw new Error("Couldn't register!");
        }
        cb(result.token);
        return dispatch(registerUserSuccess(result));
    } catch (e) {
        return dispatch(registerUserFailed(e));
    }
}

export const registerUserStart = () => ({
    type: types.REGISTER_USER_STARTED
});

const registerUserSuccess = data => ({
    type: types.REGISTER_USER_STARTED,
    payload: data
});

const registerUserFailed = err => ({
    type: types.REGISTER_USER_FAILED,
    payload: err
});

export const isLoggedInRequest = async(token, dispatch, cb = null) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token
        },
        redirect: 'follow'
    };
    try {
        const { result, response } = await fetchData({
            URL: 'http://185.211.59.101:8080/user/is-logged-in',
            requestOptions
        });
        if (response.status !== 200) {
            throw new Error('Not logged in before');
        }
        if (cb) {
            cb(result.user);
        }
        return dispatch(isLoggedInSuccess(result.user));
    } catch (err) {
        cb(null);
        return dispatch(isLoggedInFailed(err));
    }
}

const isLoggedInSuccess = user => ({
    type: types.ALREADY_LOGGEDIN_SUCCESS,
    payload: user
});

const isLoggedInFailed = err => ({
    type: types.ALREADY_LOGGEDIN_FAILED,
    payload: err
});
