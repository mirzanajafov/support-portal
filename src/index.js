const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.get('', (req, res) => {
    res.send('worked')

})

app.listen(port, () => {
    console.log('Server is up in ' + port)
})