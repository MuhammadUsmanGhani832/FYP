const mongoose = require('mongoose');

const classWorkSchema = new mongoose.Schema({
    courseId:  {
        type: String,
        default: ''
      }, 
      title: {
        type: String,
        default: ''
      }, 
      description: {
        type: String,
        default: ''
      }, 
      dueDate: {
        type: String,
        default: ""
      },
    messageAt: { type: Date, default: Date.now },
});
 

const ClassWork = mongoose.model('ClassWork', classWorkSchema);

module.exports = ClassWork; 