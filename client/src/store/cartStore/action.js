import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../actionTypes'
import productServices from '../../services/productsAPI'


export const addItemTOCart = async (dispatch,id,qty,userId) => {
    try {
        const {data}  = await productServices.fetch(id)
        const cart = {
            id:data._id, 
            name:data.name, 
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            quantity:qty,
        }
        if(userId) cart.user = userId
        dispatch({type:CART_ADD_ITEM, payload:cart})
    } catch (error) {
        console.log(error)
    }
}

export const removeItemFromCart = (dispatch,id) => {
   dispatch({type:CART_REMOVE_ITEM, id})
}

