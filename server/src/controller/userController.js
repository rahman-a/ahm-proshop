import User from '../models/userModel.js'

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
export {authenticateUser, registerNewUser, getUserProfile, userLogout, userProfileUpdate}