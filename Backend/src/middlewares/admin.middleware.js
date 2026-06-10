const {sendError}=require('../utils/responseHandler')

const adminMiddleware=(req,res,next)=>{
    if(req.user.role!=='admin'){
        return sendError(res, 403, 'Access denied')
    }
    next()
}

module.exports=adminMiddleware