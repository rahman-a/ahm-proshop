import app from './app.js'

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV 

app.listen(PORT, () => {
    console.log(`server is running in ${NODE_ENV} mode on port ${PORT}`)
})

