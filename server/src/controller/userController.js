import User from '../models/userModel.js'
import Stripe from 'stripe';
import dotenv from 'dotenv'


dotenv.config()
const stripe = new Stripe(process.env.STRIPE_KEY);

const registerNewUser = async(req, res ,next) => {
    const {email} = req.body
    const user = new User(req.body)
    try {
        const isExist = await User.findOne({email})
        if(isExist) {
            res.status(400)
            throw new Error("E-mail already exist, please choose a new one or sign in")
        }
        const newUser = await user.save()
        const token = await newUser.genToken()
        res.send({user, token})
    } catch (error) {
        next(error)
    }
}

const authenticateUser = async(req, res, next) => {
    const {email, password} = req.body
    try {
       const user = await User.findByCredential(email, password)
       const token = await user.genToken()
       res.send({user, token})
    } catch (error) {
        res.status(400)
        next(error)
    }
}


const getUserProfile = async(req, res, next) => {
    res.send(req.user)
}

const userLogout = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (error) {
        next(error)
    }
}

const userProfileUpdate = async(req, res, next) => {
    const user = req.user
    try {
        for(let key in req.body){
            user[key] = req.body[key]
        }
        user.tokens = user.tokens.filter(token => token.token !== req.token)
        const token = await user.genToken()
        await user.save()
        res.send({user,token, success:true})
    } catch (error) {
        next(error)
    }
}

const getUserById = async(req,res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404)
            throw new Error('User Not Found')
        }
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req, res ,next) => {
    try {
        const users = await User.find({})
        if(!users || users.length === 0){
            res.status(404)
            throw new Error ('No Users Registered Yet')
        }
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}

const deleteUserById = async(req, res, next) => {
    try {
        const user = await User.findById(req. params.id)
        if(!user){
            res.status(404)
            throw new Error('User Not Found')
        }
        await user.remove()
        res.status(200).send({message:'User has been Removed'})
    } catch (error) {
        next(error)
    }
}

const createPaymentIntent = async (req, res, next) => {
    try {
        const {amount,id} = req.body
        const paymentIntent = await stripe.paymentIntents.create({
           amount,
           currency:'USD',
           payment_method:id,
           confirm:true
        })
        res.send({paymentIntent}) 
    } catch (error) {
        next(error)
    }
    
}

const setUserAsAdmin = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(404)
            throw new Error('User Not Found')
        }
        user.isAdmin = !user.isAdmin
        await user.save()
        if(user.isAdmin){
            res.status(200).send({message:'User has been set as Admin'})
        }else {
            res.status(200).send({message:'Admin has been set as User'})
        }
    } catch (error) {
        next(error)
    }
}


export {authenticateUser, 
    registerNewUser, 
    getUserProfile, 
    userLogout, 
    userProfileUpdate, 
    createPaymentIntent,
    getAllUsers,
    getUserById,
    setUserAsAdmin,
    deleteUserById}