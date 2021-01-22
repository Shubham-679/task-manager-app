const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
        title : {
        type : String,
        required:true,
        trim : true
    },
    task : { 
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Task'
      },
     user : { 
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : 'User'
    }
},{
  timestamps : true
})

const Project = mongoose.model('Project', projectSchema); 
module.exports = Project