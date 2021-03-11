import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import isAdmin from '../middleware/isAdmin.js'
import {
    authenticateUser, 
    registerNewUser, 
    getUserProfile, 
    userLogout,
    userProfileUpdate,
    getAllUsers,
    deleteUserById,
    getUserById,
    setUserAsAdmin,
    createPaymentIntent} from '../controller/userController.js'

/*********************************************/ 
/************ Routers for User
/*******************************************/
router.post('/register',registerNewUser)
router.post('/login',authenticateUser)
router.post('/logout',auth, userLogout)
router.patch('/update',auth, userProfileUpdate)
router.get('/profile',auth, getUserProfile)

/*********************************************/ 
/************ Routers for Admin
/*******************************************/
router.get('/info/:id',auth, isAdmin, getUserById)
router.delete('/delete/:id',auth, isAdmin,deleteUserById)
router.get('/index',auth,isAdmin ,getAllUsers)
router.patch('/setAdmin/:id',auth,isAdmin ,setUserAsAdmin)

/*********************************************/ 
/************ Router for User Payment
/*******************************************/
router.post('/payment_intent',auth, createPaymentIntent)



export default router