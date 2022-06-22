const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const checkPermission = require('../middleware/checkPermission')
const ticketController = require('../controllers/ticket')

router.post('/tickets', auth, async (req, res) => {
    try {
        res.status(201).send(await ticketController.createTicket(req.body, req.user))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/tickets', auth, async (req, res) => {
    try {
        res.send(await ticketController.getUserTickets(req.user))
    } catch (e) {
        res.status(500).send(e)
    }

})

router.get('/allTickets', auth, checkPermission('read_all_tickets'), async (req, res) => {

    try {
        res.send(await ticketController.getAllTickets())

    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/tickets/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        res.send(await ticketController.getSingleTicket(req.params.id, req.user))
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.patch('/tickets/:id', auth, async (req, res) => {
    try {
        res.send(await ticketController.updateTicket(req.params.id, req.user, req.body))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete('/tickets/:id', auth, async (req, res) => {
    try {
        // let ticket;

        // if (!req.user.role.permissions.includes('remove')) {
        //     ticket = await Ticket.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        // } else {
        //     ticket = await Ticket.findOneAndDelete({ _id: req.params.id })
        // }

        // if (!ticket) {
        //     throw new Error('Ticket is not found!')
        // }

        res.send(await ticketController.removeTicket(req.params.id, req.user))
    } catch (e) {
        res.status(500).send(e.message)
    }
})



module.exports = router