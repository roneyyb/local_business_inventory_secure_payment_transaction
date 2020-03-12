import { ITEM_LIST_SET_STATE, CLEAR_ALL } from '../actions/types';

const INITIAL_STATE = {
    items: [],
    total_price: 0
};

export default (state=INITIAL_STATE, action) => {
    console.log('reducer',state);
    console.log(action);
    switch(action.type) {
        case ITEM_LIST_SET_STATE:
            return { ...state, items: [...state.items,action.payload.item], total_price: state.total_price + action.payload.totalprice };
        case CLEAR_ALL:
            return INITIAL_STATE;
        default:
            return state;
    }
}