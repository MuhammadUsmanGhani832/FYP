const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enroll');
const requireAuth = require('../middlewares/requireAuth');

router.use(requireAuth);
router.get('/enrollments/course/:courseId', async (req, res) => {
  const { courseId } = req.params;

  try {
    const enrollments = await Enrollment.find({ courseId });
    const students = enrollments.map(enrollment => enrollment);
    res.send(students);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});


router.get('/enrollments/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const tracks = await Enrollment.find({ email });
    
    res.send(tracks);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.post('/enroll', async (req, res) => {
  const { email, courseId } = req.body;

  if (!email || !courseId) {
    return res
      .status(422)
      .send({ error: 'You must provide an email and courseId' });
  }

  try {
    const track = new Enrollment({ email, courseId });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
