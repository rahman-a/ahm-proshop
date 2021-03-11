import express from 'express'
const router = new express.Router()
import {createNewProduct,
        getAllProduct, 
        getProductById,
        updateProduct, 
        createNewReview,
        getTopProducts,
        deleteProduct} from '../controller/productController.js'
import Auth from '../middleware/auth.js'
import isAdmin from '../middleware/isAdmin.js'
import multer from 'multer'

const upload = multer({
    limits:{
        fileSize:2000000
    },
    fileFilter:(req, file, cb) => {
        if(file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG)$/)) return cb(undefined, true)
        return cb(new Error('Please Upload an Image'))
    }
})

router.post('/new', Auth, isAdmin, upload.single('image'), createNewProduct)

router.get('/', getAllProduct)
router.get('/top', getTopProducts)
router.get('/:id', getProductById)

router.patch('/edit/:id', Auth, isAdmin, upload.single('image'),updateProduct )
router.patch('/:id/review', Auth,createNewReview )
router.delete('/delete/:id', Auth, isAdmin, deleteProduct )

export default router

