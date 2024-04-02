const express = require('express');
const mongoose = require('mongoose');
const Student = mongoose.model('Student')
const requireAuth = require('../middlewares/requireAuth')
const router = express.Router();
// Create a new student
router.use(requireAuth);
router.get('/get_result/:email/:courseId', async (req, res) => {
  const { email, courseId } = req.params;
  // console.log(email,courseId)
  try {
    const result = await Student.findOne({ email, courseId });
    if (result) {
      console.log(result)
      res.send(result);
    } else {
      res.status(404).send("No result found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving result");
  }
});

// Update student result by email and courseId
router.put('/update_result', async (req, res) => {
  const { email, courseId, final, mid, quiz, assignment, presentation, other, total } = req.body;
  const student = await Student.findOne({ email, courseId })
  if (!student) {
    console.log('added')
    const student = new Student({ final, mid, quiz, assignment, presentation, other, total, email, courseId });

    student.save()
      .then(() => {
        res.status(201).json({ message: 'Student created successfully' });
      })
      .catch((error) => {
        res.send("This email already exit")
      });
  }
  else {
    console.log('update')
    Student.findOneAndUpdate(
      { email, courseId },
      { final, mid, quiz, assignment, other, presentation, total },
      { new: true }
    )
      .then((student) => {
        if (student) {
          console.log(student)
          res.status(200).json({ message: 'Student result updated successfully' });
        } else {
          res.status(404).json({ message: 'Student not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: 'Internal server error' });
      });
  }
});

//
module.exports = router;
