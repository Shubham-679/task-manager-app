const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
//   tasks : {
//     type : new mongoose.Schema({
//         task: {
//             type: String,
//             minlength: 5,
//             maxlength: 255
//           },
//           completed: { 
//             type: Boolean, 
//             default: false,
//           }   
//     }),
// },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
}, {
  timestamps: true
})

const Project = mongoose.model('Project', projectSchema);
module.exports = Project