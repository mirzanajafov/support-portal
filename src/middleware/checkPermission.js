const checkPermission =  (neededPermission) => {
    return async (req, res, next) => {
        try {
            if(!req.user.role.permissions.includes(neededPermission)){
                throw new Error()
            }
    
            next()
        } catch (e) {
            res.status(403).send({error: 'You have not permission for this action'})
        }
    }
   
}

module.exports = checkPermission