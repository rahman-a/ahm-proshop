import {
    PRODUCTS_ALL_REQUEST,
    PRODUCTS_ALL_SUCCESS,
    PRODUCTS_ALL_FAIL,
    PRODUCT_ONE_REQUEST,
    PRODUCT_ONE_SUCCESS,
    PRODUCT_ONE_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    TOP_PRODUCTS_SUCCESS,
    TOP_PRODUCTS_REQUEST,
    TOP_PRODUCTS_FAIL
} from '../actionTypes'

import productService from '../../services/productsAPI'
import {message } from 'antd';


export const fetchAll = async (dispatch, keyword,page) => {
    dispatch({type:PRODUCTS_ALL_REQUEST})
    try {
        const {data} = await productService.index(keyword,page)
        dispatch({
            type:PRODUCTS_ALL_SUCCESS, 
            payload:data.products,
            page:data.page,
            size:data.pageSize,
            count:data.count
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

export const updateProduct = async (dispatch, id, data) => {
    dispatch({type:UPDATE_PRODUCT_REQUEST})
    try {
        const {data:{message:done}} = await productService.update(id, data)
        dispatch({type:UPDATE_PRODUCT_SUCCESS, payload:message})
        message.success(done)
    } catch (error) {
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const createProduct = async (dispatch,data) => {
    dispatch({type:CREATE_PRODUCT_REQUEST})
    try {
        const {data:{message:done}} = await productService.create(data)
        dispatch({type:CREATE_PRODUCT_SUCCESS, payload:done})
        message.success(done)
    } catch (error) {
        dispatch({
            type:CREATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const createReview = async (dispatch,id, data) => {
    dispatch({type:CREATE_REVIEW_REQUEST})
    try {
        const {data:{message:done}} = await productService.review(id,data)
        dispatch({type:CREATE_REVIEW_SUCCESS, payload:done})
        message.success(done)
    } catch (error) {
        dispatch({
            type:CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const getTopProduct = async (dispatch) => {
    dispatch({type:TOP_PRODUCTS_REQUEST})
    try {
        const {data} = await productService.top()
        dispatch({type:TOP_PRODUCTS_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:TOP_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}