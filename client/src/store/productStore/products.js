import { 
    PRODUCTS_ALL_REQUEST, 
    PRODUCTS_ALL_SUCCESS, 
    PRODUCTS_ALL_FAIL } 
from '../actionTypes'

import { useReducer, createContext, useContext } from 'react'

const productsReducer = (state, action) => {
    switch (action.type) {
        case PRODUCTS_ALL_REQUEST:
            return {...state, loading:true, products:[]}
        case PRODUCTS_ALL_SUCCESS:
            return {...state, loading:false, products:action.payload}
        case PRODUCTS_ALL_FAIL:
            return {...state, loading:false, error:action.payload}
        default:
            throw new Error(`Unhandled action type: (${action.type})`)
    }
}


const productsState = createContext()
const productsAction = createContext()


const ProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer(productsReducer, {})

    return (
        <productsState.Provider value={state}>
            <productsAction.Provider value={dispatch}>
                {children}
            </productsAction.Provider>
        </productsState.Provider>
    )
}


const useProductsSate = _ => {
    const context = useContext(productsState)
    if(context === undefined) throw new Error('useProductsSate must be used within a ProductsProvider')
    return context
}

const useProductsDispatch = _ => {
    const context = useContext(productsAction)
    if(context === undefined) throw new Error('uuseProductsAction must be used within a ProductsProvider')
    return context
}

export {ProductsProvider, useProductsSate, useProductsDispatch}