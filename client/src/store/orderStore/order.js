import { 
   USER_ORDER_REQUEST,
    USER_ORDER_SUCCESS,
    USER_ORDER_FAIL } 
from '../actionTypes'

import { useReducer, createContext, useContext } from 'react'

const orderState = createContext()
const orderAction = createContext()

const orderReducer = (state, action) => {
    switch (action.type) {
        case USER_ORDER_REQUEST:
            return {...state, loading:true, order:{}}
        case USER_ORDER_SUCCESS:
            return {...state, loading:false, order:action.payload}
        case USER_ORDER_FAIL:
            return {...state, loading:false, error:action.payload}
        default:
            throw new Error(`Unhandled action type: (${action.type})`)
    }
}


const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(orderReducer, {})

    return (
        <orderState.Provider value={state}>
            <orderAction.Provider value={dispatch}>
                {children}
            </orderAction.Provider>
        </orderState.Provider>
    )
}


const useOrderState = () => {
    const context = useContext(orderState)
    if (context === undefined) throw new Error('useOrderSate must be used within a OrderProvider')
    return context
}

const useOrderDispatch = () => {
    const context = useContext(orderAction)
    if (context === undefined) throw new Error('useOrderAction must be used within a OrderProvider')
    return context
}

export {OrderProvider, useOrderState, useOrderDispatch}