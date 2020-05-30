import axios from 'axios'
import { returnErrors } from './messages'

import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGSITER_SUCCESS, REGSITER_FAIL } from './types'


//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    //USER LOADING
    dispatch({ type: USER_LOADING });


    //GET THE TOKEN FROM STATE
    //const token = getState().auth.token

    //HEADERS
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    //If Token, add to headers
    // if (token) {
    //     config.headers['Authorization'] = `Token ${token}`;
    // }

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}


//LOGIN USER
export const login = (username, password) => (dispatch) => {


    //HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //REQUEST BOADY
    const body = JSON.stringify({ username, password });


    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}


//Register User
export const regsiter = ({ username, email, password }) => (dispatch) => {


    //HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //REQUEST BOADY
    const body = JSON.stringify({ username, email, password });


    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGSITER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGSITER_FAIL
            })
        })
}




//CHECK TOKEN & Logout USER
export const logout = () => (dispatch, getState) => {



    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
}

//SETUP CONFIG WITH TOKEN _HELPER FUNCTION
export const tokenConfig = getState => {

    //GET THE TOKEN FROM STATE
    const token = getState().auth.token

    //HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //If Token, add to headers
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
} 