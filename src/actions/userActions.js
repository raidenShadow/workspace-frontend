import types from './types';


export const fetchUser = (loginData, cb) => async dispatch => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(loginData),
        redirect: 'follow'
    }
    const response = await fetch('http://localhost:8080/user/login', requestOptions);
    const result = await response.json();
    if (response.status === 200) {
        dispatch({
            type: types.FETCH_USER,
            payload: result.user
        });
        return cb(result.token);
    }
    dispatch({
        type: types.FETCH_USER,
        payload: result.user
    });
};

export const registerUser = (body, cb) => async dispatch => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body),
        redirect: 'follow'
    }
    const response = await fetch('http://localhost:8080/user/register', requestOptions);
    const result = await response.json();
    if (response.status === 201) {
        dispatch({
            type: types.REGISTER_USER,
            payload: result.user
        });
        return cb(result.token);
    }
    dispatch({
        type: types.REGISTER_USER,
        payload: {}
    });
};

export const isLoggedIn = (token, cb) => async dispatch => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token
        },
        redirect: 'follow'
    };
    const response = await fetch('http://localhost:8080/user/is-logged-in', requestOptions);
    if (response.status === 200) {
        const result = await response.json();
        dispatch({
            type: types.ALREADY_LOGGEDIN,
            payload: result.user
        });
        return cb(result.user);
    }
    dispatch({
        type: types.ALREADY_LOGGEDIN,
        payload: {}
    });
}
