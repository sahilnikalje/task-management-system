const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, default:''},
    status:{type:String, enum:['pending', 'in-progress', 'completed'], default:'pending'},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
},{
    timestamps:true
})

taskSchema.index({createdBy:1})
taskSchema.index({status:1})

module.exports=mongoose.model('Task', taskSchema)