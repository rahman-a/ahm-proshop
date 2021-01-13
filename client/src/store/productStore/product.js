import { 
    PRODUCT_ONE_REQUEST, 
    PRODUCT_ONE_SUCCESS, 
    PRODUCT_ONE_FAIL } 
from '../actionTypes'

import { useReducer, createContext, useContext } from 'react'

const productState = createContext()
const productAction = createContext()

const productReducer = (state, action) => {
    switch (action.type) {
        case PRODUCT_ONE_REQUEST:
            return {...state, loading:true, product:{}}
        case PRODUCT_ONE_SUCCESS:
            return {...state, loading:false, product:action.payload}
        case PRODUCT_ONE_FAIL:
            return {...state, loading:false, error:action.payload}
        default:
            throw new Error(`Unhandled action type: (${action.type})`)
    }
}


const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(productReducer, {})

    return (
        <productState.Provider value={state}>
            <productAction.Provider value={dispatch}>
                {children}
            </productAction.Provider>
        </productState.Provider>
    )
}


const useProductState = () => {
    const context = useContext(productState)
    if (context === undefined) throw new Error('useProductSate must be used within a ProductProvider')
    return context
}

const useProductDispatch = () => {
    const context = useContext(productAction)
    if (context === undefined) throw new Error('useProductAction must be used within a ProductProvider')
    return context
}

export {ProductProvider, useProductState, useProductDispatch}