import { USER_ID_CHANGE, PASSWORD_CHANGE, LOADING, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAIL, RESET} from '../actions/types';

const INITIAL_STATE = {
    userid: '',
    password:'',
    loading:false,
    modalvisible:'false',
    error:'',
    show_fingerprint:false,
    user_id:''
}

export default (state=INITIAL_STATE, action) => {
    console.log(action.type);
    switch(action.type) {
        case USER_ID_CHANGE:
            return {...state, userid:action.payload};
        case PASSWORD_CHANGE:
            return {...state, password:action.payload};
        case LOADING:
            return {...state, loading:action.payload};
        case AUTHENTICATION_FAIL:
            return {...state, error:action.payload, loading:false};
        case AUTHENTICATION_SUCCESS:
            return {...state, loading:false, show_fingerprint:true,user_id:action.payload};
        case RESET:
            return {...INITIAL_STATE};
        default:
            return {...state};
    }
}