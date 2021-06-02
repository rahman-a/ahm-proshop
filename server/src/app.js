import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './DBconnection/conncetion.js'
import productRouter from './routers/productRouters.js'
import userRouter from './routers/userRouters.js'
import orderRouter from './routers/orderRouter.js'
import {notFound, errorHandler} from './middleware/errorHandler.js'


dotenv.config()
const app = express()
connectDB()

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({extended:false, limit:'50mb'}))
app.use(cors())
app.use(morgan('dev'))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use(notFound)
app.use(errorHandler)
export default app