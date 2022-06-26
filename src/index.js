require('./db/mongoose')

const express = require('express')
const init = require('./init')
const userRouter = require('./routers/user')
const ticketRouter = require('./routers/ticket')
const { userHasPermission } = require('./utils/utils')
const { isUserTicket } = require('./controllers/ticket')
const app = express()
const port = process.env.PORT


app.use(express.json())

// init()

app.use(userRouter)
app.use(ticketRouter)

app.listen(port, () => {
    console.log('Server is up in ' + port)
})  
