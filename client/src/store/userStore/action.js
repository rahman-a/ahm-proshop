import {
    LOGIN_USER_REQUEST, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL, 
    LOGOUT_USER,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USERS_INDEX_REQUEST,
    USERS_INDEX_SUCCESS,
    USERS_INDEX_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAIL} from '../actionTypes'

import userServices from '../../services/usersAPI'
import {message} from 'antd'

export const authenticateUser = async (dispatch, credential) => {
    dispatch({type:LOGIN_USER_REQUEST})
    try {
        const {data} = await userServices.login(credential)
        localStorage.setItem("USER_INFO", JSON.stringify(data))
        dispatch({type:LOGIN_USER_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:LOGIN_USER_FAIL, 
            error: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
} 


export const userLogout = async (dispatch) => {
    await userServices.logout()
    localStorage.removeItem('USER_INFO')
    dispatch({type:LOGOUT_USER})
}

export const registerNewUser = async (registerDispatch, loginDispatch, credential) => {
    registerDispatch({type:REGISTER_USER_REQUEST})
    try {
        const {data} = await userServices.register(credential)
        localStorage.setItem("USER_INFO", JSON.stringify(data))
        registerDispatch({type:REGISTER_USER_SUCCESS})
        loginDispatch({type:LOGIN_USER_SUCCESS, payload:data})
    } catch (error) {
        registerDispatch({
            type:REGISTER_USER_FAIL, 
            error: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
} 

export const updateUserProfile = async (updateDispatch, loginDispatch, credential) => {
    updateDispatch({type:UPDATE_USER_REQUEST})
    try {
        const {data} = await userServices.update(credential)
        const payload = {user:data.user, token:data.token}
        localStorage.setItem("USER_INFO", JSON.stringify(payload))
        updateDispatch({type:UPDATE_USER_SUCCESS, payload:data.success})
        loginDispatch({type:LOGIN_USER_SUCCESS, payload})
    } catch (error) {
        updateDispatch({
            type:UPDATE_USER_FAIL, 
            error: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
} 

export const indexAllUsers = async (dispatch) => {
    dispatch({type:USERS_INDEX_REQUEST})
    try {
        const {data} = await userServices.index()
        dispatch({type:USERS_INDEX_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:USERS_INDEX_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const deleteUser = async(dispatch, id) => {
    dispatch({type:USER_DELETE_REQUEST})
    try {
        const {data:{message:done}} = await userServices.delete(id)
        dispatch({type:USER_DELETE_SUCCESS})
        message.success(done)
    } catch (error) {
        dispatch({
            type:USER_DELETE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const getUserById = async(dispatch, id) => {
    dispatch({type:USER_INFO_REQUEST})
    try {
        const {data} = await userServices.info(id)
        dispatch({type:USER_INFO_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:USER_INFO_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
} 