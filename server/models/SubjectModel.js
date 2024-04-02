const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  courseID: {
    type: String,
  },
  CourseTitle: {
    type: String,
  },
  CR_HRS: {
    type: String,
  },
  GRADE: {
    type: String,
  },
  studentId:{
    type:String
  }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
