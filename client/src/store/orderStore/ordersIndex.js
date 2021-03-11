import { 
    ORDERS_INDEX_REQUEST,
     ORDERS_INDEX_SUCCESS,
     ORDERS_INDEX_FAIL } 
 from '../actionTypes'
 
 import { useReducer, createContext, useContext } from 'react'
 
 const indexOrdersState = createContext()
 const indexOrdersAction = createContext()
 
 const indexOrdersReducer = (state, action) => {
     switch (action.type) {
         case ORDERS_INDEX_REQUEST:
             return {...state, loading:true, orders:[]}
         case ORDERS_INDEX_SUCCESS:
             return {...state, loading:false, orders:action.payload}
         case ORDERS_INDEX_FAIL:
             return {...state, loading:false, error:action.payload}
         default:
             throw new Error(`Unhandled action type: (${action.type})`)
     }
 }
 
 
 const IndexOrdersProvider = ({children}) => {
     const [state, dispatch] = useReducer(indexOrdersReducer, [])
 
     return (
         <indexOrdersState.Provider value={state}>
             <indexOrdersAction.Provider value={dispatch}>
                 {children}
             </indexOrdersAction.Provider>
         </indexOrdersState.Provider>
     )
 }
 
 
 const useIndexOrdersState = () => {
     const context = useContext(indexOrdersState)
     if (context === undefined) throw new Error('useIndexOrdersSate must be used within a IndexOrdersProvider')
     return context
 }
 
 const useIndexOrdersDispatch = () => {
     const context = useContext(indexOrdersAction)
     if (context === undefined) throw new Error('useIndexOrdersAction must be used within a IndexOrdersProvider')
     return context
 }
 
 export {IndexOrdersProvider, useIndexOrdersState, useIndexOrdersDispatch}