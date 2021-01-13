import express from 'express'
const router = new express.Router()
import {getAllProduct, getProductById} from '../controller/productController.js'

router.get('/', getAllProduct)

router.get('/:id', getProductById)

export default router

