const isAdmin = async(req, res ,next) => {
    if(req.user.isAdmin) next()
    else {
        res.status(400)
        next(new Error('Not Authorized to handle that request'))
    }
}

export default isAdmin