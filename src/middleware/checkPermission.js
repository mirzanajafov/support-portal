const checkPermission =  (neededPermissions) => {
    return async (req, res, next) => {
        try {
            if(!req.user.role.permissions.includes(neededPermissions)){
                throw new Error()
            }
    
            next()
        } catch (e) {
            res.status(403).send({error: 'You have not permission for this action'})
        }
    }
   
}

module.exports = checkPermission