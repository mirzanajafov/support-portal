const checkUpdateFields =  (body, allowedUpdates) => {
    const updates = Object.keys(body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        throw new Error('Invalid Updates')
    }

    return updates
}

const userHasPermission = (permissionList, permissions) => {
        // let hasPermission;
      
        for( const permissionObj of permissionList) {
             const hasPermission  =  permissions.some(permission => permissionObj.permission == permission)
        
             if(hasPermission){
                return {access:hasPermission, accessType: permissionObj.type}
             }
           
        }
        return false
}

module.exports = {
    checkUpdateFields,
    userHasPermission
}