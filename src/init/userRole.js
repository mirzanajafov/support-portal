const UserRole = require('../models/userRole')
const Logger = require('../logger');

const insertDefaultRoles = async () => {
    Logger.info(`Default roles begin for insert`)
    const defaultRoles = [
        {
          userRole: 'super_admin',
          roleName: 'Super Admin',
          permissions: [{permission:'read',type: 'basic'} , {permission:'write',type: 'super'}, {permission:'remove', type: 'super'}, {permission: 'assignment', type: 'super'}, {permission: 'assignTo', type: 'super'}, {permission: 'changeRole', type: 'super'},{permission: 'closeTicket', type: 'super'}, {permission: 'read_all_tickets', type:'super'} ]  
        },
        {
            userRole: 'admin',
            roleName: 'Admin',
            permissions: [{permission:'read',type: 'basic'}, {permission:'write',type: 'super'}, {permission: 'assignment', type: 'super'}, {permission: 'closeTicket', type: 'super'}, {permission: 'read_all_tickets', type:'super'} ]
        },
        {
            userRole: 'user',
            roleName: 'User',
            permissions: [{permission:'read',type: 'basic'}, {permission:'openTicket',type: 'basic'}, {permission:'sendCloseRequest',type: 'basic'},{permission:'read_own_tickets',type: 'basic'} , {permission:'remove_own_ticket',type: 'basic'}]
        }
    ] 
   
    for(const role of defaultRoles){
        const count =  await UserRole.countDocuments({userRole: role.userRole})
        count == 0 &&   await new UserRole(role).save()
    }
}  
 
module.exports = insertDefaultRoles

