const mongoose=require('mongoose')

const activityLogSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    action:{type:String, required:true, enum:['LOGIN', 'TASK_CREATED', 'TASK_UPDATED', 'TASK_DELETED', 'USER_DELETED', 'USER_STATUS_UPDATED']},
    task:{type:mongoose.Schema.Types.ObjectId, ref:'Task', default:null},
    targetUser:{type:mongoose.Schema.Types.ObjectId, ref:'User', default:null},
    metadata:{type:Object, default:{}},
    createdAt:{type:Date, default:Date.now}
})

activityLogSchema.index({ user: 1 })
activityLogSchema.index({ action: 1 })
activityLogSchema.index({ createdAt: -1 })

module.exports=mongoose.model('ActivityLog', activityLogSchema)