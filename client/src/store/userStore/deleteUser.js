import {USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL} from '../actionTypes'
import {useContext, createContext, useReducer} from 'react'

const userDeleteState = createContext()
const userDeleteDispatch = createContext()

const userDeleteReducer = (state, action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {...state, loading:true}
        case USER_DELETE_SUCCESS:
            return {...state, loading:false}
        case USER_DELETE_FAIL:
            return {...state, loading:false, error:action.error}
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const UserDeleteProvider = ({children}) => {
    const [state, dispatch] = useReducer(userDeleteReducer, {})

    return (
        <userDeleteState.Provider value={state}>
            <userDeleteDispatch.Provider value={dispatch}>
                {children}
            </userDeleteDispatch.Provider>
        </userDeleteState.Provider>
    )
}

const useUserDeletestate = () => {
    const context = useContext(userDeleteState)
    if(context === undefined) throw new Error(`useUserDeletestate must be used within a UserDeleteProvider`)
    return context
}

const useUserDeleteDispatch = () => {
    const context = useContext(userDeleteDispatch)
    if(context === undefined) throw new Error(`useUserDeleteDispatch must be used within a UserDeleteProvider`)
    return context
}

export {UserDeleteProvider, useUserDeletestate, useUserDeleteDispatch}