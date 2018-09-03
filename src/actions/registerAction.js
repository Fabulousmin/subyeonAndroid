import {
    INIT_REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';
import { sbConnect } from '../sendbirdActions';
import { sUpdateProfile } from '../subyeonActions';
import firebase from '@firebase/app'




export const userRegister=({userId,password}) =>{
  return(dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(userId, password)
    .then((user) => {registerSuccess(dispatch,user)
    console.log('user created')
  })
    .catch((error) => {registerFail(dispatch, error)});
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
