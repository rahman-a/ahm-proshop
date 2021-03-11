import {USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAIL} from '../actionTypes'
import {useContext, createContext, useReducer} from 'react'

const userState = createContext()
const userDispatch = createContext()

const userReducer = (state, action) => {
    switch(action.type){
        case USER_INFO_REQUEST:
            return {...state, loading:true}
        case USER_INFO_SUCCESS:
            return {...state, loading:false, user:action.payload}
        case USER_INFO_FAIL:
            return {...state, loading:false, error:action.error}
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {})

    return (
        <userState.Provider value={state}>
            <userDispatch.Provider value={dispatch}>
                {children}
            </userDispatch.Provider>
        </userState.Provider>
    )
}

const useUserstate = () => {
    const context = useContext(userState)
    if(context === undefined) throw new Error(`useUserstate must be used within a UserProvider`)
    return context
}

const useUserDispatch = () => {
    const context = useContext(userDispatch)
    if(context === undefined) throw new Error(`useUserDispatch must be used within a UserProvider`)
    return context
}

export {UserProvider, useUserstate, useUserDispatch}