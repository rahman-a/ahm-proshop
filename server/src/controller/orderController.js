import Order from '../models/orderModel.js'


const createOrder = async (req, res, next) => {
    const order = new Order({
        user:req.user._id,
        ...req.body
    })
    try {
        const newOrder = await order.save()
        res.send({id:newOrder._id})
    } catch (error) {
        next(error)
    }
}

const getOrderById = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')
        if(!order){
            res.status(404)
           throw new Error('No Order Found')
        }
        res.status(200).send(order)
    } catch (error) {
        next(error)
    }
}

const getAllUserOrders = async(req, res, next) => {
    try {
        const orders = await Order.find({user:req.user._id})
        if(!orders || orders.length === 0){
            res.status(404)
            throw new Error('No Orders Found')
        }
        res.status(200).send(orders)
    } catch (error) {
        next(error)
    }
}

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate('user','name')
        if(!orders || orders.length === 0){
            res.status(404)
            throw new Error('No Orders Found')
        }
        res.status(200).send(orders)
    } catch (error) {
        next(error)
    }
}

const confirmOrderDelivery = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
        if(!order){
            res.status(404)
            throw new Error('No Orders Found')
        }
        if(order.isPaid){
            order.isDelivered = true
            order.deliveredAt = new Date()
        }else{
            order.isPaid = true
            order.paidAt = new Date()
            order.isDelivered = true
            order.deliveredAt = new Date()
        }
        await order.save()
        res.status(200).send({message:'Order has been marked as Delivered'})
    } catch (error) {
        next(error)
    }
}
export {createOrder, getOrderById, getAllUserOrders, getAllOrders, confirmOrderDelivery}