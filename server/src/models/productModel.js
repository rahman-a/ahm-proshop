import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    comment:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps:true})

const productSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:Buffer,
        required:true,
    },
    imageType:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
    reviews:[reviewSchema]
    
},{
    timestamps:true
})

productSchema.methods.toJSON = function(){
    const productObject = this.toObject()
    productObject.image = `data:${this.imageType};UTF-8;base64,${this.image.toString('base64')}`
    delete productObject.imageType
    return productObject
}
const Product = mongoose.model('Product', productSchema)

export default Product