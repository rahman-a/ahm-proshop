import { 
    USER_ORDERS_REQUEST,
     USER_ORDERS_SUCCESS,
     USER_ORDERS_FAIL } 
 from '../actionTypes'
 
 import { useReducer, createContext, useContext } from 'react'
 
 const ordersState = createContext()
 const ordersAction = createContext()
 
 const ordersReducer = (state, action) => {
     switch (action.type) {
         case USER_ORDERS_REQUEST:
             return {...state, loading:true, orders:[]}
         case USER_ORDERS_SUCCESS:
             return {...state, loading:false, orders:action.payload}
         case USER_ORDERS_FAIL:
             return {...state, loading:false, error:action.payload}
         default:
             throw new Error(`Unhandled action type: (${action.type})`)
     }
 }
 
 
 const OrdersProvider = ({children}) => {
     const [state, dispatch] = useReducer(ordersReducer, [])
 
     return (
         <ordersState.Provider value={state}>
             <ordersAction.Provider value={dispatch}>
                 {children}
             </ordersAction.Provider>
         </ordersState.Provider>
     )
 }
 
 
 const useOrdersState = () => {
     const context = useContext(ordersState)
     if (context === undefined) throw new Error('useOrdersSate must be used within a OrdersProvider')
     return context
 }
 
 const useOrdersDispatch = () => {
     const context = useContext(ordersAction)
     if (context === undefined) throw new Error('useOrdersAction must be used within a OrdersProvider')
     return context
 }
 
 export {OrdersProvider, useOrdersState, useOrdersDispatch}