// Define attendance schema and model
const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    email: { type: String, required: true },
    status: { type: Boolean, required: true },
    courseId: { type: String, required: true },
    date: { type: String, default: '' },
    
  });
  
  const Attendance = mongoose.model('Attendance', attendanceSchema);
  module.exports = Attendance; 