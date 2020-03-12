import { ITEM_LIST_SET_STATE, CLEAR_ALL } from './types';

export const Updatelist = (item, totalprice) => ({
    type: ITEM_LIST_SET_STATE,
    payload: {item, totalprice}
});

export const clearAll =  () => ({
    type: CLEAR_ALL
});
