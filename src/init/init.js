const  user = require('./user')
const userRole  = require('./userRole')
const category = require('./category');

const Logger = require('../logger');

const init = async () => {
    Logger.info(`The Initialization begins`)
    try {
        await userRole()
        Logger.info(`Default roles inserted successfully!`)
        await user()  
        Logger.info(`Default users inserted successfully!`)
        await category()
        Logger.info(`Default categories inserted successfully!`)
    } catch (error) {
        Logger.error(`Something wrong! ${error.message}`)
    }
    
    }
 
 
module.exports = init