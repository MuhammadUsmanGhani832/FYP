const express = require('express');
const requireAuth=require('../middlewares/requireAuth')
const Course = require('../models/CourseModel');
const router=express.Router();
router.use(requireAuth);

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get a single course by ID
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (error) {
    res.status(404).json({ error: 'Course not found' });
  }
});

// Create a new course
router.post('/courses', async (req, res) => {
  
  try {
    const {course_name,course_description,instructor_name,schedule,location,available_seats}=req.body;
    const course = new Course({course_name,course_description,instructor_name,schedule,location,available_seats});
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create course' });
  }
});

// Update a course by ID
router.put('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update course' });
  }
});

// Delete a course by ID
router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete course' });
  }
});

module.exports=router;
