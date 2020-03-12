import { combineReducers } from 'redux';
import Itemlist from './itemlist';
import Paybill from './paybill';

export default combineReducers({
    itemlist: Itemlist,
    paybill: Paybill
});