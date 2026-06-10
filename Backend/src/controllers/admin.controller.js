const{sendSuccess, sendError}=require('../utils/responseHandler')
const{createActivityLog}=require('../services/activity.service')
const User=require('../models/User')
const Task=require('../models/Task')

const getAllUsers=async(req, res, next)=>{
    try{
        const users=await User.find().select('-password').sort({createdAt:-1})
        return sendSuccess(res, 200, 'Users fetched', {users})
    }
    catch(error){
        next(error)
    }
}

const getSingleUser=async(req, res, next)=>{
    try{
        const user=await User.findById(req.params.id).select('-password')
        if(!user) return sendError(res, 404, 'User not found')
        return sendSuccess(res, 200, "user fetched", {user})
    }
    catch(error){
        next(error)
    }
}

const updateUserStatus=async(req, res, next)=>{
    try{
        const{status}=req.body

        if(!['active', 'inactive'].includes(status)){
            return sendError(res, 400, 'Invalid status value')
        }

        const user=await User.findById(req.params.id)
        if(!user)return sendError(res, 404, 'User not found')

      user.status=status
      await user.save()

      await createActivityLog({
        userId:req.user.id,
        action:'USER_STATUS_UPDATED',
        targetUserId:user._id,
        metadata:{status}
      })

      return sendSuccess(res, 200, 'User status updated')
    }
    catch(error){
        next(error)
    }
}

const deleteUser=async(req, res, next)=>{
    try{
        if(req.user.id===req.params.id){
            return sendError(res, 400, 'Cannot delete your own account')
        }

        const user=await User.findById(req.params.id)
        if(!user)return sendError(res, 404, 'User not found')

        await user.deleteOne()
        return sendSuccess(res, 200, 'User deleted successfully')
    }
    catch(error){
        next(error)
    }
}

const getAllTasksAdmin=async(req, res, next)=>{
    try{
        const tasks=await Task.find()
             .populate('createdBy', 'name email')
             .sort({createdAt:-1})
     return sendSuccess(res, 200, 'Tasks fetched', {tasks})
    }
    catch(error){
        next(error)
    }
}

const deleteAnyTask=async(req, res, next)=>{
    try{
        const task=await Task.findById(req.params.id)
        if(!task) return sendError(res, 404, 'Task not found')
        
        await createActivityLog({
            userId:req.user.id,
            action:'TASK_DELETED',
            taskId:task._id,
        })
     await task.deleteOne()

     return sendSuccess(res, 200, 'Task deleted successfully')
    }
    catch(error){
        next(error)
    }
}

module.exports={getAllUsers, getSingleUser, updateUserStatus, deleteUser, getAllTasksAdmin, deleteAnyTask}