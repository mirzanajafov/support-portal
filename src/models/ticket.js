const mongoose = require('mongoose')
const validator = require('validator')

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category' 
    },
    status: {
        type: String,
        default: 'Waiting'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket