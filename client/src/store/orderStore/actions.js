import { 
    USER_ORDER_REQUEST,
     USER_ORDER_SUCCESS,
     USER_ORDER_FAIL,
     USER_ORDERS_REQUEST,
     USER_ORDERS_SUCCESS,
     USER_ORDERS_FAIL,
    ORDERS_INDEX_REQUEST,
    ORDERS_INDEX_SUCCESS,
    ORDERS_INDEX_FAIL} 
 from '../actionTypes'
 import orderServices from '../../services/ordersAPI'

 export const getOrderById = async (dispatch,id) => {
     dispatch({type:USER_ORDER_REQUEST})
     try {
         const {data} = await orderServices.fetch(id)
         dispatch({type:USER_ORDER_SUCCESS, payload:data})
     } catch (error) {
         dispatch({
            type:USER_ORDER_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
     }
 }

 export const getALlUserOrders = async (dispatch) => {
    dispatch({type:USER_ORDERS_REQUEST})
    try {
        const {data} = await orderServices.fetchAll()
        dispatch({type:USER_ORDERS_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
           type:USER_ORDERS_FAIL,
           payload: error.response && error.response.data.message 
           ? error.response.data.message 
           : error.message
       })
    }
}

export const indexALlOrders = async (dispatch) => {
    dispatch({type:ORDERS_INDEX_REQUEST})
    try {
        const {data} = await orderServices.index()
        dispatch({type:ORDERS_INDEX_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
           type:ORDERS_INDEX_FAIL,
           payload: error.response && error.response.data.message 
           ? error.response.data.message 
           : error.message
       })
    }
}