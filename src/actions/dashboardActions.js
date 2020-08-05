import types from './types';

export const changeComponent = name => dispatch => dispatch({
    type: types.CURRENT_COMPONENT,
    payload: name
});