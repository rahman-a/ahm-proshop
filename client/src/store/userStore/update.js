import {UPDATE_USER_REQUEST, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS} from '../actionTypes'
import {useContext, createContext, useReducer} from 'react'

const updateUserState = createContext()
const updateUserDispatch = createContext()

const updateUserReducer = (state, action) => {
    switch(action.type){
        case UPDATE_USER_REQUEST:
            return {...state, loading:true}
        case UPDATE_USER_SUCCESS:
            return {...state, loading:false, error:null, success:action.payload}
        case UPDATE_USER_FAIL:
            return {...state, loading:false, error:action.error}
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const UpdateUserProvider = ({children}) => {
    const [state, dispatch] = useReducer(updateUserReducer, {})

    return (
        <updateUserState.Provider value={state}>
            <updateUserDispatch.Provider value={dispatch}>
                {children}
            </updateUserDispatch.Provider>
        </updateUserState.Provider>
    )
}

const useUpdateUserstate = () => {
    const context = useContext(updateUserState)
    if(context === undefined) throw new Error(`useUpdateUserstate must be used within a UpdateUserProvider`)
    return context
}

const useUpdateUserDispatch = () => {
    const context = useContext(updateUserDispatch)
    if(context === undefined) throw new Error(`useUpdateUserDispatch must be used within a UpdateUserProvider`)
    return context
}

export {UpdateUserProvider, useUpdateUserstate, useUpdateUserDispatch}