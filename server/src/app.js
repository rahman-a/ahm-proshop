import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './DBconnection/conncetion.js'
import productRouter from './routers/productRouters.js'
import userRouter from './routers/userRouters.js'
import orderRouter from './routers/orderRouter.js'
import {notFound, errorHandler} from './middleware/errorHandler.js'


dotenv.config()
const app = express()
connectDB()

const _dirname = path.resolve()

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({extended:false, limit:'50mb'}))
app.use(cors())
app.use(morgan('dev'))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

if(process.env.NODE_ENV === 'production'){
    console.log('Directory Name: ',_dirname);
    app.use(express.static(path.join(_dirname, '/client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(_dirname, '/client/build/index.html'))
    })
}

app.use(notFound)
app.use(errorHandler)
export default app