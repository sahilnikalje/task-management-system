const {validationResult}=require('express-validator')
const{sendSuccess, sendError}=require('../utils/responseHandler')
const{createActivityLog}=require('../services/activity.service')
const Task=require('../models/Task')

const createTask=async(req, res, next)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return sendError(res, 400, errors.array()[0].msg)
        }

     const {title, description, status}=req.body

      const task=await Task.create({
        title,
        description,
        status:status,
        createdBy:req.user.id
      })

      await createActivityLog({userId:req.user.id, action:"TASK_CREATED", taskId:task._id})

      return sendSuccess(res, 201, 'Task created successfully', {task})
    }
    catch(error){
        next(error)
    }
}

const getOwnTasks=async(req, res, next)=>{
    try{
        const tasks=await Task.find({createdBy:req.user.id}).sort({createdAt:-1})
        return sendSuccess(res, 200, 'Tasks fetched', {tasks})
    }
    catch(error){
        next(error)
    }
}

const getSingleTask=async(req, res, next)=>{
    try{
        const task=await Task.findById(req.params.id)

        if(!task){
            return sendError(res, 404, 'Task not found')
        }

        if(req.user.role!=='admin' && task.createdBy.toString() !==req.user.id){
            return sendError(res, 403, 'Access denied')
        }

     return sendSuccess(res, 200, 'Task fetched', {task})
    }
    catch(error){
        next(error)
    }
}

const updateTask=async(req, res, next)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return sendError(res, 400, errors.array()[0].msg)
        }
     
        const task=await Task.findById(req.params.id)

        if(!task){
            return sendError(res, 404, 'Task not found')
        }
        if(req.user.role!=='admin' && task.createdBy.toString()!==req.user.id){
            return sendError(res, 403, 'Access denied')
        }

        const {title, description, status}=req.body
        if(title!==undefined) task.title=title
        if(description!==undefined)task.description=description
        if(status!==undefined) task.status=status

        await task.save()
        await createActivityLog({userId:req.user.id, action:'TASK_UPDATED', taskId:task._id})

        return sendSuccess(res, 200, 'Task updated successfully', {task})
    }
    catch(error){
        next(error)
    }
}

const deleteTask=async(req, res, next)=>{
    try{
        const task=await Task.findById(req.params.id)
        if(!task){
            return sendError(res, 404, 'Task not found')
        }

        if(req.user.role!=='admin' && task.createdBy.toString()!==req.user.id){
            return sendError(res, 403, 'Access denied')
        }

        await createActivityLog({userId:req.user.id, action:'TASK_DELETED', taskId:task._id})

        await task.deleteOne()

        return sendSuccess(res, 200, 'Task deleted successfully')
    }
    catch(error){
        next(error)
    }
}

module.exports={createTask, getOwnTasks, getSingleTask, updateTask, deleteTask}