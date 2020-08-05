import { getBoardsRequest } from '../middlewares/boardAsync';

export const getBoards = token => async dispatch => await getBoardsRequest(token, dispatch);