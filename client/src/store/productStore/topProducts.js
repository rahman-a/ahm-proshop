import { 
    TOP_PRODUCTS_REQUEST,
    TOP_PRODUCTS_SUCCESS,
    TOP_PRODUCTS_FAIL} 
from '../actionTypes'

import { useReducer, createContext, useContext } from 'react'

const topProductsReducer = (state, action) => {
    switch (action.type) {
        case TOP_PRODUCTS_REQUEST:
            return {...state, loading:true, products:[]}
        case TOP_PRODUCTS_SUCCESS:
            return {...state, 
                loading:false, error:null, products:action.payload}
        case TOP_PRODUCTS_FAIL:
            return {...state, loading:false, error:action.payload}
        default:
            throw new Error(`Unhandled action type: (${action.type})`)
    }
}


const topProductsState = createContext()
const topProductsAction = createContext()


const TopProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer(topProductsReducer, {})

    return (
        <topProductsState.Provider value={state}>
            <topProductsAction.Provider value={dispatch}>
                {children}
            </topProductsAction.Provider>
        </topProductsState.Provider>
    )
}


const useTopProductsSate = _ => {
    const context = useContext(topProductsState)
    if(context === undefined) throw new Error('useTopProductsSate must be used within a TopProductsProvider')
    return context
}

const useTopProductsDispatch = _ => {
    const context = useContext(topProductsAction)
    if(context === undefined) throw new Error('useTopProductsAction must be used within a TopProductsProvider')
    return context
}

export {TopProductsProvider, useTopProductsSate, useTopProductsDispatch}