import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './DBconnection/conncetion.js'
import productRouter from './routers/productRouters.js'
import userRouter from './routers/userRouters.js'
import {notFound, errorHandler} from './middleware/errorHandler.js'


const app = express()
dotenv.config()
connectDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use(notFound)
app.use(errorHandler)

export default app