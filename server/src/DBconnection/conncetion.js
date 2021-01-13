import mongoose from 'mongoose'
import chalk from 'chalk'

const connectDB = async _ => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log(chalk.cyan.underline(`MongoDB connected: ${conn.connection.host}`))
    } catch (error) {
        console.log(chalk.red.bold(`Error: ${error.message}`))
        process.exit(1)
    }
}

export default connectDB