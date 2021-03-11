import express from 'express'
import Auth from '../middleware/auth.js'
import isAdmin from '../middleware/isAdmin.js'
import {createOrder, getOrderById, getAllUserOrders, getAllOrders,confirmOrderDelivery} from '../controller/orderController.js'
const router = new express.Router()


router.post('/', Auth, createOrder)
router.get('/all', Auth, isAdmin,getAllOrders)
router.get('/:id', Auth, getOrderById)
router.get('/', Auth, getAllUserOrders)
router.patch('/deliver/:id', Auth, isAdmin,confirmOrderDelivery)


export default router