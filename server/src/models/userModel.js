import mongoose from 'mongoose'
import bcrypt from 'bcrypt' 
import validator from 'validator'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('Please write email correctly')
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    tokens:[
        {
            token:{
                type:String,
                required:true 
            }
        }
    ]
},{
    timestamps:true
})

userSchema.methods.toJSON = function(){
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    if(!userObject.isAdmin) delete userObject.isAdmin

    return userObject
}

userSchema.statics.findByCredential = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error("Invalid Email or Password")
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error("Invalid Email or Password")
    return user
}

userSchema.methods.genToken = async function() {
    const token = jwt.sign({id:this._id.toString()},process.env.JWT_TOKEN,{expiresIn:'7 days'})
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

userSchema.pre("save", async function (next){
    if(this.isModified('password')){
       this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const User = mongoose.model('User', userSchema)

export default User