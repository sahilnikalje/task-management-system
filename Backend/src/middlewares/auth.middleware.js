const jwt=require('jsonwebtoken')
const User=require('../models/User')
const {sendError}=require('../utils/responseHandler')

const authMiddleware=async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return sendError(res, 401, 'Unauthorized')
        }

     const token=authHeader.split(' ')[1]
     const decoded=jwt.verify(token, process.env.JWT_SECRET)

     const user=await User.findById(decoded.id).select('-password')

     if(!user){
        return sendError(res, 401, 'Unauthorized')
     }
     if(user.status==='inactive'){
        return sendError(res, 403, 'Account is inactive')
     }

     req.user={id:user._id.toString(), role:user.role}
     next()
    }
    catch(err){
        return sendError(res, 401, 'Unauthorized')
    }
}

module.exports=authMiddleware