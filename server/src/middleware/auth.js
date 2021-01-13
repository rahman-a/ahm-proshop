import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const authUser = async(req, res, next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.replace("Bearer ","")
        const decode = jwt.verify(token, process.env.JWT_TOKEN)
        const user = await User.findOne({_id:decode.id, 'tokens.token':token})
        if(!user) {
            res.status(401)
            next(new Error("Please Login First"))
        }
        req.user = user
        req.token = token
        next()
    } else {
        res.status(401)
        next(new Error("Please Login First"))
    }
}

export default authUser