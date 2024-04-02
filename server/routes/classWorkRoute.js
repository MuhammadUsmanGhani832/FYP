const express = require('express');
const router = express.Router();
const ClassWork = require('../models/ClassWork');
const ClassWork2 = require('../models/ClassWork2');
const requireAuth=require("../middlewares/requireAuth")
router.use(requireAuth);

  
router.get('/classwork/:courseId', async (req, res) => {
    const  courseId=req.params.courseId;
    
  
    const tracks = await ClassWork.find( {courseId });
  
    res.send(tracks);
  });
  router.get('', async (req, res) => {
  
    const tracks = await Enrollment.find({ userId: req.user._id });
  
    res.send(tracks);
  });

router.post('/classchat', async (req, res) => {
  const { courseId,title,description,dueDate } = req.body;

  if ( !courseId) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and locations' });
  }


    const classchat = new ClassWork({ courseId, title,description,dueDate });
   
    await classchat.save();
    res.send(classchat);
  
});
router.get('/classwork2/:courseId', async (req, res) => {
    const  courseId=req.params.courseId;
    
   
    const tracks = await ClassWork2.find( {courseId });
   
    res.send(tracks);
  });
  router.get('', async (req, res) => {
  
    const tracks = await Enrollment.find({ userId: req.user._id });
  
    res.send(tracks);
  });

router.post('/classchat2', async (req, res) => {
  const { courseId,title,description,dueDate } = req.body;

  if ( !courseId) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and locations' });
  }


    const classchat = new ClassWork2({ courseId, title,description,dueDate });
    
    await classchat.save();
    res.send(classchat);
  
});

module.exports = router;
