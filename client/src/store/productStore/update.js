import { 
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
} 
from '../actionTypes'

import { useReducer, createContext, useContext } from 'react'

const updateProductState = createContext()
const updateProductAction = createContext()

const productReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return {...state, loading:true}
        case UPDATE_PRODUCT_SUCCESS:
            return {...state, loading:false, message:action.payload}
        case UPDATE_PRODUCT_FAIL:
            return {...state, loading:false, error:action.payload}
        default:
            throw new Error(`Unhandled action type: (${action.type})`)
    }
}


const UpdateProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(productReducer, {})

    return (
        <updateProductState.Provider value={state}>
            <updateProductAction.Provider value={dispatch}>
                {children}
            </updateProductAction.Provider>
        </updateProductState.Provider>
    )
}


const useUpdateProductState = () => {
    const context = useContext(updateProductState)
    if (context === undefined) throw new Error('useUpdateProductSate must be used within a UpdateProductProvider')
    return context
}

const useUpdateProductDispatch = () => {
    const context = useContext(updateProductAction)
    if (context === undefined) throw new Error('useUpdateProductAction must be used within a UpdateProductProvider')
    return context
}

export {UpdateProductProvider, useUpdateProductState, useUpdateProductDispatch}