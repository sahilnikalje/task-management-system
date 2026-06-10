const {validationResult}=require('express-validator')
const generateToken=require('../utils/generateToken')
const{sendSuccess, sendError}=require('../utils/responseHandler')
const{createActivityLog}=require('../services/activity.service')
const User=require('../models/User')

const registerUser=async(req, res, next)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return sendError(res, 400, errors.array()[0].msg)
        }
     
     const {name, email, password}=req.body

     const existingUser=await User.findOne({email})
     if(existingUser){
        return sendError(res, 400, 'Email already exists')
     }
     const user=await User.create({name, email, password})
     const token=generateToken(user._id, user.role)

     return sendSuccess(res, 201, 'User registered successfully', {
        token,
        user:{_id:user._id, name:user.name, email:user.email, role:user.role},
     })
    }
    catch(error){
        next(error)
    }
}

const loginUser=async(req, res, next)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return sendError(res, 400, errors.array()[0].msg)
        }

     const {email, password}=req.body

     const user=await User.findOne({email})
     if(!user){
        return sendError(res, 401, 'Invalid credentials')
     }

     if(user.status==='inactive'){
        return sendError(res, 403, 'Account is inactive')
     }

     const isMatch=await user.matchPassword(password)
       if(!isMatch){
        return sendError(res, 401, 'Invalid credentials')
       }

     await createActivityLog({userId:user._id, action:'LOGIN'})

     const token=generateToken(user._id, user.role)

     return sendSuccess(res, 200, 'Login successfull', {
        token,
        user:{_id:user._id, name:user.name, email:user.email, role:user.role}
     })
    }
    catch(error){
        next(error)
    }
}

module.exports={registerUser, loginUser}