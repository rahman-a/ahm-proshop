import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../actionTypes'
import {useContext, createContext, useReducer} from 'react'

const cartState = createContext()
const cartDispatch = createContext()

const cartReducer = (state, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const isItemExist = state.find(it => it.id === item.id)
            let cartItems = []
            if(isItemExist){
                cartItems = state.map(it => it.id === item.id ? item : it)
            }else {
                cartItems = [...state, item]
            }
            localStorage.setItem('CART_ITEM', JSON.stringify(cartItems))
            return cartItems
        case CART_REMOVE_ITEM:
            const updatedCartItems = state.filter(it => it.id !== action.id)
            localStorage.setItem('CART_ITEM', JSON.stringify(updatedCartItems))
            return updatedCartItems
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}


const CartProvider = ({children}) => {
    const initCart = localStorage.getItem('CART_ITEM') ? JSON.parse(localStorage.getItem('CART_ITEM')):[]
    const [state, dispatch] = useReducer(cartReducer, initCart)
    return (
        <cartState.Provider value={state}>
            <cartDispatch.Provider value={dispatch}>
                {children}
            </cartDispatch.Provider>
        </cartState.Provider>
    )
}

const useCartState = () => {
    const context = useContext(cartState)
    if(context === undefined) throw new Error(`useCartState must be used within a CartProvider`)
    return context
}

const useCartDipatch = () =>{
    const context = useContext(cartDispatch)
    if(context === undefined) throw new Error(`useCartDispatch must be used within a CartProvider`)
    return context
}

export {CartProvider, useCartState, useCartDipatch}