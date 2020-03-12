import { USER_ID_CHANGE, PASSWORD_CHANGE, LOADING, AUTHENTICATION_FAIL,AUTHENTICATION_SUCCESS, RESET} from './types';
import Constants from 'expo-constants';
const { manifest } = Constants;

export const onUseridChange = text => ({
    type: USER_ID_CHANGE,
    payload: text
  });
  
  export const onPasswordChange = password => ({
    type: PASSWORD_CHANGE,
    payload: password
  });

  export const onReset = () => ({
    type:RESET
  });

  export const onButtonPress = (userid, password) => {
    const url = `http://${manifest.debuggerHost
    .split(`:`)
    .shift()
    .concat(`:3000/bankauthentication`)}`;
    console.log(url);
    return dispatch => {
    dispatch({ type:LOADING, payload:true });
     fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userid,
          password
        })
      })
        .then(response => response.json())
        .then(res => {
          if (res.error) {
            return dispatch({
              type: AUTHENTICATION_FAIL,
              payload: 'Invalid credentials / unregistered user'
            });
          }
          return dispatch({
            type: AUTHENTICATION_SUCCESS,
            payload: res.userid
          });
        })
      .catch((error) => {
        console.log('Error while fetching server +>',error);
        return dispatch({
          type: AUTHENTICATION_FAIL,
          payload: 'Server Is Down!!'
        });
      });
    };
  };
  