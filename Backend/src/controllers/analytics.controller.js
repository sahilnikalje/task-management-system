const {sendSuccess}=require('../utils/responseHandler')
const User=require('../models/User')
const Task=require('../models/Task')

const getAnalytics=async(req, res, next)=>{
    try{
        const[totalUsers, totalTasks, completedTasks, pendingTasks, inProgressTasks]=await Promise.all([
            User.countDocuments({role:'user'}),
            Task.countDocuments(),
            Task.countDocuments({status:'completed'}),
            Task.countDocuments({status:'pending'}),
            Task.countDocuments({status:'in-progress'})
        ])
     return sendSuccess(res, 200, 'Analytics fetched', {
        analytics:{totalUsers, totalTasks, completedTasks, pendingTasks, inProgressTasks},
     })
    }
    catch(error){
        next(error)
    }
}

module.exports={getAnalytics}