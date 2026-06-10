const ActivityLog=require('../models/ActivityLog')

const createActivityLog=async({userId, action, taskId=null, targetUserId=null, metadata={}})=>{
    try{
        await ActivityLog.create({
            user:userId,
            action,
            task:taskId,
            targetUser:targetUserId,
            metadata
        })
    }
    catch(err){
        console.error('Activity log error:', err.message)
    }
}

module.exports={createActivityLog}