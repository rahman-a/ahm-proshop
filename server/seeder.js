import users from './src/data/users.js'
import products from './src/data/products.js'
import User from './src/models/userModel.js'
import Product from './src/models/productModel.js'
import Order from './src/models/orderModel.js'
import mongoDB from './src/DBconnection/conncetion.js'
import dotEnv from 'dotenv'
import chalk from 'chalk'

dotEnv.config()
mongoDB()

const importData = async _ => {
    try {
        await User.deleteMany();
        // await Product.deleteMany();
        // await Order.deleteMany();

        await User.insertMany(users)
        // const admin = createdUsers.find(user => user.isAdmin === true)
        // const sampleProducts = products.map(product => {
        //     return {...product, user:admin._id}
        // })
        // await Product.insertMany(sampleProducts)
        console.log(chalk.green.bold.underline('Data Imported Successfully'))
        process.exit()
    } catch (error) {
        console.log(chalk.red.bold.underline(`Failed to Import Data: ${error.message}`))
        process.exit(1)
    }
}

const destroyData = async _ => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log(chalk.yellow.bold.underline('Data Destroyed Successfully'))
        process.exit()
    } catch (error) {
        console.log(chalk.red.bold.underline(`Failed to Destroy Data: ${error.message}`))
        process.exit(1)
    }
}

if(process.argv[2] === '-D'){
    destroyData()
}else {
    importData()
}