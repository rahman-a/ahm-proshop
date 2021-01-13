import Product from '../models/productModel.js'


const getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find({})
        if(!products || products.length === 0)  {
            res.status(404)
            throw new Error('No Products Found') 
        }
        res.status(200).send(products)
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

export {
    getAllProduct,
    getProductById
}