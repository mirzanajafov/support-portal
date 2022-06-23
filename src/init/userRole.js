const UserRole = require('../models/userRole')
const Logger = require('../logger');

const insertDefaultRoles = async () => {
    Logger.info(`Default roles begin for insert`)
    const defaultRoles = [
        {
          userRole: 'super_admin',
          roleName: 'Super Admin',
          permissions: ['read' , 'write', 'remove', 'assignment', 'assignTo', 'changeRole', 'closeTicket', 'read_all_tickets' ]  
        },
        {
            userRole: 'admin',
            roleName: 'Admin',
            permissions: ['read', 'write', 'assignment', 'closeTicket', 'read_all_tickets' ]
        },
        {
            userRole: 'user',
            roleName: 'User',
            permissions: ['read', 'openTicket', 'sendCloseRequest', 'read_own_tickets', 'remove_own_ticket']
        }
    ] 
   
    for(const role of defaultRoles){
        const count =  await UserRole.countDocuments({userRole: role.userRole})
        count == 0 &&   await new UserRole(role).save()
    }
}  
 
module.exports = insertDefaultRoles

