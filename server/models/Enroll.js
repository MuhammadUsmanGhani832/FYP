const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    
      email: {
        type: String,
      },
      courseId:  {
        type: String,
        default: ''
      },
    enrolledAt: { type: Date, default: Date.now },
});
 

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;