import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import {
    authenticateUser, 
    registerNewUser, 
    getUserProfile, 
    userLogout,
    userProfileUpdate} from '../controller/userController.js'


router.post('/register',registerNewUser)
router.post('/login',authenticateUser)
router.post('/logout',auth, userLogout)
router.patch('/update',auth, userProfileUpdate)
router.get('/profile',auth, getUserProfile)


export default router