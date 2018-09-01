import {
    INIT_REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';
import { sbConnect } from '../sendbirdActions';
import { sUpdateProfile } from '../subyeonActions';
import firebase from '@firebase/app'




export const userRegister=({userId,password}) =>{
  return(dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(userId, password)
    .then((user) => {registerSuccess(dispatch,user)
    console.log('user created')
    firebase.auth().signInWithEmailAndPassword(userId, password)
    .then(() => {
    console.log('user loggedIn');
    sbConnect(userId)
    .then( (user) => loginSuccess(dispatch, user) )
    .catch( (error) => loginFail(dispatch, error) );} )
    .catch((error) => loginFail(dispatch, error.message) );
  })
    .catch((error) => {console.log('에러러??',error.message);registerFail(dispatch, error.message)});
  }
}




export const initregister = () => {
    return { type: INIT_REGISTER };
}


const registerFail = (dispatch, error) => {
    dispatch({
        type: REGISTER_FAIL,
        payload: error
    });
}

const registerSuccess = (dispatch, user) => {
    dispatch({
        type: REGISTER_SUCCESS,
        payload: user
    });
}


const loginFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_FAIL,
        payload: error
    });
}

const loginSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: user
    });
}
