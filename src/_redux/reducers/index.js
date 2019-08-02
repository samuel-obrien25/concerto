import { ADD_LIST } from '../actionTypes';

const initialState = {
    lists: []
};

function rootReducer (state = initialState, action) {
    if(action.type === ADD_LIST) {
        return Object.assign({}, state, {
            lists: state.lists.concat(action.payload)
        });
    }
    return state;
}

export default rootReducer;