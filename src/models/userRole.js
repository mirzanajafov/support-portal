const mongoose = require('mongoose')
const validator = require('validator')



const userRoleSchema = mongoose.Schema({
    userRole: {
        type: String,
        required: true
    },
    roleName: {
        type: String,
        required: true
    },
    permissions: {
        type: Array,
        required: true
    }
})

// userRoleSchema.virtual('users', {
//     ref: 'User',
//     localField: '_id',
//     foreignField: 'role'
// })  

const UserRole = mongoose.model('UserRole', userRoleSchema)



module.exports = UserRole