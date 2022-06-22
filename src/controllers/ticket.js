const Ticket = require('../models/ticket');
const utils = require('../utils/utils')

const createTicket = async (body, user) => {
    const ticket = new Ticket({
        ...body,
        owner: user._id
    })

    await ticket.save()

    return ticket

}

const getUserTickets = async (user) => {
    const tickets = await Ticket.find({ owner: user._id }).populate('category')

    return tickets
}

const getAllTickets = async () => {
    return await Ticket.find({}).populate('category')
}

const getSingleTicket = async (id, user) => {
    ticket = await Ticket.findOne({ _id: id, owner: user._id }).populate('owner category').exec()

    if (!ticket) {
        throw new Error('Ticket is not found!')
    }

    return ticket
}

const updateTicket = async (id, user, body) => {
    const updates = utils.checkUpdateFields(body, ['title', 'description', 'severity', 'category'])

    const ticket = await Ticket.findOne({ _id: id, owner: user._id })

    if (!ticket) {
        throw new Error('Ticket is not found!')
    }

    updates.forEach((update) => ticket[update] = body[update])

    await ticket.save()
    return ticket
}

const removeTicket = async (id, user) => {
    ticket = await Ticket.findOneAndDelete({ _id: id, owner: user._id })

    if (!ticket) {
        throw new Error('Ticket is not found!')
    }

    return ticket
}

module.exports = {
    createTicket,
    getUserTickets,
    getAllTickets,
    getSingleTicket,
    updateTicket,
    removeTicket
}