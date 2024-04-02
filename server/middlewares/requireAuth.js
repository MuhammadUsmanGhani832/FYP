const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Teacher = mongoose.model('Teacher')
const Admin = mongoose.model('Admin')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === 'Bearer laksjdflaksdjasdfklj'

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    if (!user) {
      const user = await Teacher.findById(userId);
      if(!user){
        const user= await Admin.findById(userId); 
        req.user = user;
        next();
      }
      else {
        req.user = user;
        next();
      }
    }
    else {
      req.user = user;
      next();
    }
  });
};
