import types from '../actions/types';
import { fetchData } from '../utils/fetch';

export const getBoardsRequest = async (token, dispatch) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token
        },
        redirect: 'follow'
    };
    try {
        const { result, response } = await fetchData({
            URL: 'http://185.211.59.101:8080/board/all',
            requestOptions
        });
        if (response.status !== 200) {
            throw new Error("Couldn't get boards");
        }
        return dispatch(getBoardsSuccess(result));
    } catch (err) {
        return dispatch(getBoardsFailed(err));
    }
}

const getBoardsSuccess = boards => ({
    type: types.GET_BOARDS_SUCCESS,
    payload: boards
});

const getBoardsFailed = err => ({
    type: types.GET_BOARDS_FAILED,
    payload: err
});