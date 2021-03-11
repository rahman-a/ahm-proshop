import Product from '../models/productModel.js'


const createNewProduct = async(req, res, next) => {
    const product = new Product({
        user:req.user._id,
        ...req.body
    })
    try {
        product.image = req.file.buffer
        product.imageType = req.file.mimetype
        await product.save()
        res.status(200).send({message:'Product has been Created'})
    } catch (error) {
        next(error)
    }
}
//  products?keyword=iph&page=3
const getAllProduct = async (req, res, next) => {
    let keyword  = req.query.search !== 'null'
    ? {
        name:{
            $regex: req.query.search,
            $options: 'i'
        }
    } 
    : {}
   const page = parseInt(req.query.page) || 1
   const pageSize = 10
    try {
        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
        if(!products || products.length === 0)  {
            res.status(404)
            throw new Error('No Products Found') 
        }
        res.status(200).send({products, pageSize, page, count})
    } catch (error) {
        next(error)
    }
}

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product)  {
            res.status(404)
            throw new Error('No Product Found') 
        }
        res.status(200).send(product)
    } catch (error) {
        next(error)    
    }
}

const updateProduct = async(req, res, next) => {
    
    try {
        const product = await Product.findById(req. params.id)
        if(!product)  {
            res.status(404)
            throw new Error('No Product Found') 
        }
        for(let key in req.body){
            product[key] = req.body[key]
        }
        if(req.file){
            product.image = req.file.buffer
            product.imageType = req.file.mimetype
        }
        await product.save()
        res.status(200).send({message:'Product has been updated'})
    } catch (error) {
        next(error)
    }
}

const createNewReview = async(req, res, next) => {
    const {comment, rating} = req.body
    try {
        const product = await Product.findById(req.params.id)
        if(!product)  {
            res.status(404)
            throw new Error('No Product Found') 
        }
        const isProductReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())
        if(isProductReviewed){
            res.status(400)
            throw new Error('You Already Reviewed this Product') 
        }
        const review = {
            name: req.user.name,
            user:req.user._id,
            comment,
            rating
        }
        product.reviews = product.reviews.concat(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).send({message:'Review has been Created'})
    } catch (error) {
        next(error)
    }
}

const getTopProducts = async(req, res, next) => {
    console.log('Start')
    try {
    console.log('Start Try')

        const products = await Product.find({}).sort({rating:-1}).limit(3)
    console.log('After Get')

        if(!products)  {
            res.status(404)
            throw new Error('No Product Found') 
        }
        res.send(products)
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async(req, res,next) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product)  {
            res.status(404)
            throw new Error('No Product Found') 
        }
        await product.remove()
        res.status(200).send({message:'Product has been deleted'})
    } catch (error) {
        next(error)
    }
}

export {
    createNewProduct,
    getAllProduct,
    getProductById,
    deleteProduct,
    createNewReview,
    getTopProducts,
    updateProduct
}