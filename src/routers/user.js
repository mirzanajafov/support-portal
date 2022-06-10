const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth  = require('../middleware/auth');
const { sendWelcomeEmail } = require('../emails/account')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.FirstName + ' ' + user.LastName)
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token})
    } catch (e) {
        
        res.status(400).send(e) 
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.status(200).send('Logout successfully')
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send({error: 'Something wrong!'})
    }
})

router.get('/users/profile', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['FirstName', 'LastName' , 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates'})
    }

    try{

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send('Successfully Removed')
    } catch (error) {
        res.status(500).send(e)
    }
})

module.exports = router