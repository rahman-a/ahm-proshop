import { 
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
} 
from '../actionTypes'

import { useReducer, createContext, useContext } from 'react'

const createProductState = createContext()
const createProductAction = createContext()

const createProductReducer = (state, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {...state, loading:true}
        case CREATE_PRODUCT_SUCCESS:
            return {...state, loading:false, message:action.payload}
        case CREATE_PRODUCT_FAIL:
            return {...state, loading:false, error:action.payload}
        default:
            throw new Error(`Unhandled action type: (${action.type})`)
    }
}


const CreateProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(createProductReducer, {})

    return (
        <createProductState.Provider value={state}>
            <createProductAction.Provider value={dispatch}>
                {children}
            </createProductAction.Provider>
        </createProductState.Provider>
    )
}


const useCreateProductState = () => {
    const context = useContext(createProductState)
    if (context === undefined) throw new Error('useCreateProductSate must be used within a CreateProductProvider')
    return context
}

const useCreateProductDispatch = () => {
    const context = useContext(createProductAction)
    if (context === undefined) throw new Error('useCreateProductAction must be used within a CreateProductProvider')
    return context
}

export {CreateProductProvider, useCreateProductState, useCreateProductDispatch}