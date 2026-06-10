const {sendSuccess}=require('../utils/responseHandler')
const ActivityLog=require('../models/ActivityLog.js')

const getActivityLogs=async(req, res, next)=>{
    try{
        const logs=await ActivityLog.find()
              .populate('user', 'name email')
              .populate('task', 'title')
              .populate('targetUser', 'name email')
              .sort({createdAt:-1})
       return sendSuccess(res, 200, 'Activity logs fetched', {logs})
    }
    catch(error){
        next(error)
    }
}

module.exports={getActivityLogs}