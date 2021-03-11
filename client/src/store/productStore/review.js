import { 
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
} 
from '../actionTypes'

import { useReducer, createContext, useContext } from 'react'

const createReviewState = createContext()
const createReviewAction = createContext()

const createReviewReducer = (state, action) => {
    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
            return {...state, loading:true}
        case CREATE_REVIEW_SUCCESS:
            return {...state, loading:false, message:action.payload}
        case CREATE_REVIEW_FAIL:
            return {...state, loading:false, error:action.payload}
        default:
            throw new Error(`Unhandled action type: (${action.type})`)
    }
}


const CreateReviewProvider = ({children}) => {
    const [state, dispatch] = useReducer(createReviewReducer,{})

    return (
        <createReviewState.Provider value={state}>
            <createReviewAction.Provider value={dispatch}>
                {children}
            </createReviewAction.Provider>
        </createReviewState.Provider>
    )
}


const useCreateReviewState = () => {
    const context = useContext(createReviewState)
    if (context === undefined) throw new Error('useCreateReviewSate must be used within a CreateReviewProvider')
    return context
}

const useCreateReviewDispatch = () => {
    const context = useContext(createReviewAction)
    if (context === undefined) throw new Error('useCreateReviewAction must be used within a CreateReviewProvider')
    return context
}

export {CreateReviewProvider, useCreateReviewState, useCreateReviewDispatch}