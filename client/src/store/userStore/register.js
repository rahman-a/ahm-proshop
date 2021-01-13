import {REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL} from '../actionTypes'
import {useContext, createContext, useReducer} from 'react'

const registerState = createContext()
const registerDispatch = createContext()

const registerReducer = (state, action) => {
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return {...state, loading:true}
        case REGISTER_USER_SUCCESS:
            return {...state, loading:false, error:null}
        case REGISTER_USER_FAIL:
            return {...state, loading:false, error:action.error}
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const RegisterProvider = ({children}) => {
    const [state, dispatch] = useReducer(registerReducer, {})

    return (
        <registerState.Provider value={state}>
            <registerDispatch.Provider value={dispatch}>
                {children}
            </registerDispatch.Provider>
        </registerState.Provider>
    )
}

const useRegisterstate = () => {
    const context = useContext(registerState)
    if(context === undefined) throw new Error(`useRegisterstate must be used within a RegisterProvider`)
    return context
}

const useRegisterDispatch = () => {
    const context = useContext(registerDispatch)
    if(context === undefined) throw new Error(`useRegisterDispatch must be used within a RegisterProvider`)
    return context
}

export {RegisterProvider, useRegisterstate, useRegisterDispatch}