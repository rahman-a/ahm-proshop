import {
    PRODUCTS_ALL_REQUEST,
    PRODUCTS_ALL_SUCCESS,
    PRODUCTS_ALL_FAIL,
    PRODUCT_ONE_REQUEST,
    PRODUCT_ONE_SUCCESS,
    PRODUCT_ONE_FAIL
} from '../actionTypes'

import productService from '../../services/productsAPI'

export const fetchAll = async (dispatch) => {
    dispatch({type:PRODUCTS_ALL_REQUEST})
    try {
        const {data} = await productService.index()
        dispatch({
            type:PRODUCTS_ALL_SUCCESS, 
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCTS_ALL_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const fetchOne = async (dispatch, id) => {
    dispatch({type:PRODUCT_ONE_REQUEST})
    try {
        const {data} = await productService.fetch(id)
        dispatch({type:PRODUCT_ONE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:PRODUCT_ONE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}