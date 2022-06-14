const express = require('express')
require('./db/mongoose')
const init = require('./init/init')
const userRouter = require('./routers/user')
const app = express()
const port = process.env.PORT
const Logger = require('./logger');
app.use(express.json())



const Initialization = async () => {
    try {
        await init()
        Logger.info(`Initialization finished successfully!`)
    } catch (error) {
        Logger.error(`Something wrong! ${error.message}`)
    }
    
}

Initialization()
app.use(userRouter)
app.get('', (req, res) => {
    res.send('worked')

})

app.listen(port, () => {
    console.log('Server is up in ' + port)
})  