import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_USER} from '../actionTypes'
import {useContext, createContext, useReducer} from 'react'

const loginState = createContext()
const loginDispatch = createContext()

const loginReducer = (state, action) => {
    switch(action.type){
        case LOGIN_USER_REQUEST:
            return {...state, loading:true}
        case LOGIN_USER_SUCCESS:
            return {...state, loading:false, user:action.payload, error:null}
        case LOGIN_USER_FAIL:
            return {...state, loading:false, error:action.error}
        case LOGOUT_USER:
            return {}
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const LoginProvider = ({children}) => {
    const initUser = {user:localStorage.getItem("USER_INFO") ? JSON.parse(localStorage.getItem("USER_INFO")):null}
    const [state, dispatch] = useReducer(loginReducer, initUser)

    return (
        <loginState.Provider value={state}>
            <loginDispatch.Provider value={dispatch}>
                {children}
            </loginDispatch.Provider>
        </loginState.Provider>
    )
}

const useLoginstate = () => {
    const context = useContext(loginState)
    if(context === undefined) throw new Error(`useloginstate must be used within a LoginProvider`)
    return context
}

const useLoginDispatch = () => {
    const context = useContext(loginDispatch)
    if(context === undefined) throw new Error(`useloginDispatch must be used within a LoginProvider`)
    return context
}

export {LoginProvider, useLoginstate, useLoginDispatch}