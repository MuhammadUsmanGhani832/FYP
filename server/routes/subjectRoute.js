const express = require('express');
const requireAuth=require('../middlewares/requireAuth')
const Subject = require('../models/SubjectModel');
const router=express.Router();
router.use(requireAuth);

// Get all subjects by student ID
router.get('/subjects/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    try {
      const subjects = await Subject.find({ studentId: studentId });
      res.send(subjects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch subjects' });
    }
  });
  // Get a single subject by ID for a specific student
router.get('/subjects/:studentId/:subjectId', async (req, res) => {
    const studentId = req.params.studentId;
    const subjectId = req.params.subjectId;
    
    try {
      const subject = await Subject.findOne({ _id: subjectId, studentId: studentId });
      
      if (subject) {
        res.json(subject);
      } else {
        res.status(404).json({ error: 'Subject not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch subject' });
    }
  });
  

// Create a new subject for a specific student
router.post('/subjects/:studentId', async (req, res) => {
    const studentId = req.params.studentId;

    try {
      const { courseID, CourseTitle, CR_HRS, GRADE } = req.body;
      const subject = new Subject({ courseID, CourseTitle, CR_HRS, GRADE ,studentId});
      const savedSubject = await subject.save();
      res.status(201).json(savedSubject);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create subject' });
    }
  });
  
  // Update a subject by ID for a specific student
  router.put('/subjects/:studentId/:subjectId', async (req, res) => {
    const studentId = req.params.studentId;
    const subjectId = req.params.subjectId;
  
    try {
      const updatedSubject = await Subject.findOneAndUpdate(
        { _id: subjectId, studentId: studentId },
        req.body,
        { new: true }
      );
  
      if (updatedSubject) {
        res.json(updatedSubject);
      } else {
        res.status(404).json({ error: 'Subject not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Failed to update subject' });
    }
  });
  
  // Delete a subject by ID for a specific student
  router.delete('/subjects/:studentId/:subjectId', async (req, res) => {
    const studentId = req.params.studentId;
    const subjectId = req.params.subjectId;
  
    try {
      const deletedSubject = await Subject.findOneAndDelete({ _id: subjectId, studentId: studentId });
  
      if (deletedSubject) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Subject not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete subject' });
    }
  });
  
module.exports=router;
