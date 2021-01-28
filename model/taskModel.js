const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        required:true,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false  
     },
     owner : { 
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : 'User'
    },
    project : { 
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : 'Project'
    }
},{
  timestamps : true
})

// module.exports.taskSchema = taskSchema;
const Task = mongoose.model('Task', taskSchema)
module.exports = Task