const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  course_description: {
    type: String,
  },
  instructor_name: {
    type: String,
  },
  schedule: {
    type: String,
  },
  location: {
    type: String,
  },
  available_seats: {
    type: Number,
    default: 0,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
