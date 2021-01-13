import app from './app.js'
import chalk from 'chalk'

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV 

app.listen(PORT, () => {
    console.log(chalk.yellow.bold(`server is running in ${NODE_ENV} mode on port ${PORT}`))
})

