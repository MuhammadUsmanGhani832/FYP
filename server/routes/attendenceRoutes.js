const express = require('express');
const requireAuth = require('../middlewares/requireAuth')
const Attendance = require('../models/Attendence');
const router = express.Router();
router.use(requireAuth);

router.get('/attendance/:email/:courseId', async (req, res) => {
  try {
    const { email, courseId } = req.params;
    const attendance = await Attendance.find({ email, courseId });
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error retrieving attendance:', error);
    res.status(500).json({ error: 'Failed to retrieve attendance' });
  }
});

router.post('/attendance', async (req, res) => {
  try {
    const { attendanceArray, courseId, dayOfMonth, month } = req.body;

    const attendanceData = attendanceArray.map(({ email, status }) => {
      const currentDate = new Date();
      const dayOfMonth = currentDate.getDate();
      const month = currentDate.getMonth() + 1;

      const date = dayOfMonth + '/' + month;
      return {
        email,
        status,
        courseId,
        date,
      };
    });
    const savedAttendance = await Attendance.insertMany(attendanceData);
    console.log('Attendance saved:', savedAttendance);
    res.status(200).json({ message: 'Attendance saved successfully' });
  } catch (error) {
    console.error('Error saving attendance:', error);
    res.status(500).json({ error: 'Failed to save attendance' });
  }
});

module.exports = router;
