const mongoose = require('mongoose');

const classWorkSchema2 = new mongoose.Schema({
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
 

const ClassWork2 = mongoose.model('ClassWork2', classWorkSchema2);

module.exports = ClassWork2; 