import { ADD_LIST, DELETE_LIST } from './actionTypes';

let nextListId = 0;

export const addList = content => ({
    type: ADD_LIST,
    payload: {
        id: ++nextListId,
        content
    }
});

export const deleteList = id => ({
    type: DELETE_LIST,
    payload: { id }
});