const express = require('express');
const requireAuth=require('../middlewares/requireAuth')
const Attendance = require('../models/Attendence');
const router=express.Router();
router.use(requireAuth);

// GET route to retrieve attendance by email and courseId
router.get('/attendance/:email/:courseId', async (req, res) => {
  try {
    const { email, courseId } = req.params;

    // Find attendance records matching the email and courseId
    const attendance = await Attendance.find({ email, courseId });

    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error retrieving attendance:', error);
    res.status(500).json({ error: 'Failed to retrieve attendance' });
  }
});

// Create a POST route to handle attendance submissions
router.post('/attendance', async (req, res) => {
  try {
    const { attendanceArray, courseId, dayOfMonth, month } = req.body;

    // Create an array of attendance records with courseId and specified date
    const attendanceData = attendanceArray.map(({ email, status }) => {
      const currentDate = new Date();
      const dayOfMonth = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Adding 1 because month is zero-based
      
      const date = dayOfMonth + '/' + month;
      
      
      return {
        email,
        status,
        courseId,
        date,
      };
    });

    // Save each attendance record in the database
    const savedAttendance = await Attendance.insertMany(attendanceData);

    console.log('Attendance saved:', savedAttendance);
    res.status(200).json({ message: 'Attendance saved successfully' });
  } catch (error) {
    console.error('Error saving attendance:', error);
    res.status(500).json({ error: 'Failed to save attendance' });
  }
});

module.exports=router;
