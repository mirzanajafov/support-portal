const User = require('../models/user')
const UserRole = require('../models/userRole')
const Logger = require('../logger');



const insertDefaultUsers = async () => {
    Logger.info(`Default Users begin for insert`)

    const superAdmin = await UserRole.findOne({userRole: "super_admin"});

    const defaultUsers = [
        {
            email: 'mirzanajafov@gmail.com',
            password: '123456', 
            role: superAdmin
        },
       
    ]

    for(const user of defaultUsers){
        const count = await User.countDocuments({email: user.email})
        count == 0 &&   await new User(user).save()
    }

}

module.exports = insertDefaultUsers