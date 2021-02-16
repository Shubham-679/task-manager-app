const mongoose = require('mongoose');
const moment = require('moment');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: 'todo'
  },
  owner: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
      }
    }),
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project'
  },
  createdAt: {
    type: String,
    default: moment().format('ll'),
    required : true
  },
  deadline: {
    type: String,
    required : true
  }
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task