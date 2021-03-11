import {USERS_INDEX_REQUEST, USERS_INDEX_SUCCESS, USERS_INDEX_FAIL} from '../actionTypes'
import {useContext, createContext, useReducer} from 'react'

const usersIndexState = createContext()
const usersIndexDispatch = createContext()

const usersIndexReducer = (state, action) => {
    switch(action.type){
        case USERS_INDEX_REQUEST:
            return {...state, loading:true, users:[]}
        case USERS_INDEX_SUCCESS:
            return {...state, loading:false, users:action.payload}
        case USERS_INDEX_FAIL:
            return {...state, loading:false, error:action.error}
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const UsersIndexProvider = ({children}) => {
    const [state, dispatch] = useReducer(usersIndexReducer, [])

    return (
        <usersIndexState.Provider value={state}>
            <usersIndexDispatch.Provider value={dispatch}>
                {children}
            </usersIndexDispatch.Provider>
        </usersIndexState.Provider>
    )
}

const useUsersIndexstate = () => {
    const context = useContext(usersIndexState)
    if(context === undefined) throw new Error(`useUsersIndexstate must be used within a UsersIndexProvider`)
    return context
}

const useUsersIndexDispatch = () => {
    const context = useContext(usersIndexDispatch)
    if(context === undefined) throw new Error(`useUsersIndexDispatch must be used within a UsersIndexProvider`)
    return context
}

export {UsersIndexProvider, useUsersIndexstate, useUsersIndexDispatch}