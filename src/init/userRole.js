const UserRole = require('../models/userRole')
const Logger = require('../logger');

const insertDefaultRoles = async () => {
    Logger.info(`Default roles begin for insert`)
    const defaultRoles = [
        {
          userRole: 'super_admin',
          roleName: 'Super Admin',
          permissions: ['read' , 'write', 'remove', 'assignment', 'assignTo', 'changeRole', 'closeTicket' ]  
        },
        {
            userRole: 'admin',
            roleName: 'Admin',
            permissions: ['read', 'write', 'assignment', 'closeTicket' ]
        },
        {
            userRole: 'user',
            roleName: 'User',
            permissions: ['read', 'openTicket', 'sendCloseRequest']
        }
    ] 
   
    for(const role of defaultRoles){
        const count =  await UserRole.countDocuments({userRole: role.userRole})
        count == 0 &&   await new UserRole(role).save()
    }
}  
 
module.exports = insertDefaultRoles

