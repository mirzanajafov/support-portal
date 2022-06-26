const { isUserTicket } = require("../controllers/ticket")
const { userHasPermission } = require("../utils/utils")


const checkPermission =  (neededPermissions) => {
    return async (req, res, next) => {
        try {
          
            const permissionAccess = userHasPermission(req.user.role.permissions,neededPermissions)
            if(!permissionAccess.access){
                throw new Error('You have not permission for this action')
            }
           
            if(permissionAccess.accessType !== 'super'){
               
                if(await isUserTicket(req.params.id, req.user._id) === null){
                    throw new Error('Ticket is not found or This is not your ticket')
                }
            }
           
            next()
        } catch (e) {
            res.status(403).send(e.message)
        }
    }
   
}

module.exports = checkPermission