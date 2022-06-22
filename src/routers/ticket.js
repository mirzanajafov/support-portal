const express = require('express')
const Ticket = require('../models/ticket')
const router = new express.Router()
const auth = require('../middleware/auth')
const Category = require('../models/category')
const { findOne } = require('../models/ticket')

router.post('/tickets', auth, async (req, res) => {
    const ticket = new Ticket({
        ...req.body,
        owner: req.user._id
    })

    try {
        await ticket.save()
        res.status(201).send(ticket)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tickets', auth, async (req, res) => {
    try {
        const tickets = await Ticket.find({ owner: req.user._id }).populate('category')
        res.send(tickets)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.get('/allTickets', auth, async (req, res) => {

    try {
        if (!req.user.role.permissions.includes('read_all_tickets')) {
            throw new Error('You have not permission for this action')
        }
        res.send(await Ticket.find({}).populate('category'))

    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/tickets/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        let ticket;
        if (!req.user.role.permissions.includes('read_all_tickets')) {
             ticket = await Ticket.findOne({ _id, owner: req.user._id }).populate('owner category').exec()
        } else {
             ticket = await Ticket.findOne({ _id }).populate('owner category').exec()
        }
    
        if(!ticket) {
            throw new Error('Ticket is not found!')
        }

        res.send(ticket)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.patch('/tickets/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const validUpdates = ['title','description','severity', 'category']
    const isValidOperation = updates.every((update) => validUpdates.includes(update))

    try {

        if(!isValidOperation){
            throw new Error('Invalid update')
        }

        const ticket = await Ticket.findOne({_id: req.params.id, owner: req.user._id })

        if(!ticket) {
            throw new Error('Ticket is not found!')
        }

        updates.forEach((update) => ticket[update] = req.body[update])

        await ticket.save()

        res.send(ticket)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete('/tickets/:id', auth, async (req, res) => {
    try {
        let ticket;

        if (!req.user.role.permissions.includes('remove')) {
             ticket = await Ticket.findOneAndDelete({_id: req.params.id, owner:req.user._id})
        } else {
             ticket = await Ticket.findOneAndDelete({_id: req.params.id})
        }

        if(!ticket) {
            throw new Error('Ticket is not found!')
        }

        res.send(ticket)
    } catch (e) {
        res.status(500).send(e.message) 
    }
})



module.exports = router