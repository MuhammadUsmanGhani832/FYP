const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Teacher = mongoose.model("Teacher")
const Admin = mongoose.model("Admin")
const User = mongoose.model('User');


router.get("/check/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  if (!user) {
    const user = await Teacher.findOne({ email });
    if (!user) {
      const sendMe = {
        text: "not found"
      }
      res.send(sendMe);

    } else {
      const sendMe = {
        user,
        text: "teacher found"
      }
      res.send(sendMe);

    }
  } else {
    const sendMe = {
      user,
      text: "student found"
    }
    res.send(sendMe);
  }
});


router.post('/signup', async (req, res) => {
  const { name, email, rollNum, password } = req.body;
  const user = await Teacher.findOne({ email })
  if (user) {
    res.send("Email or roll number already exists");
  } else {
    try {
      const user = new User({ name, email, rollNum, password });
      await user.save();
      const userId = user._id;
      const token = jwt.sign({ userId }, 'MY_SECRET_KEY');
      const userInfo = {
        token,
        userId,
      };
      res.status(200).send(userInfo);
    }
    catch (err) {
      return res.send("Email or roll number already exists")
    }
  }
});

// Signin Endpoint
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).send({ error: 'Invalid password or email' });
    }

    await user.comparePassword(password);
    const userId = user._id;
    const token = jwt.sign({ userId }, 'MY_SECRET_KEY');
    const userInfo = {
      token,
      user,
    };
    console.log(userInfo);
    res.send(userInfo);
  } catch (err) {
    return res.send('Invalid password');
  }
});
// Get Single User by ID Endpoint
router.get('/one_users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send(user);
  } catch (err) {
    return res.status(500).send({ error: 'An error occurred' });
  }
});
router.get('/one_teacher/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Teacher.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send(user);
  } catch (err) {
    return res.status(500).send({ error: 'An error occurred' });
  }
});
// Change Password Endpoint
router.put('/users/:userId/password', async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the old password matches
    const isOldPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isOldPasswordCorrect) {
      return res.send('Old password is incorrect');
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.send('Password updated successfully');
  } catch (err) {
    return res.send('Old password is incorrect');
  }
});

// Delete User Endpoint
router.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    await user.remove();
    res.send({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).send({ error: 'An error occurred' });
  }
});
router.delete('/teacher/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Teacher.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    await user.remove();
    res.send({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).send({ error: 'An error occurred' });
  }
});

// Get All Users Endpoint
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // password k bagair
    res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'An error occurred' });
  }
});


router.put('/teacher/:userId/password', async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await Teacher.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the old password matches
    const isOldPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isOldPasswordCorrect) {
      return res.send('Old password is incorrect');
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.send('Password updated successfully');
  } catch (err) {
    return res.send('Old password is incorrect');
  }
});
router.post('/teacher_signup', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email })
  if (user) {
    res.send("Email already exists");
  } else {
    try {
      const user = new Teacher({ name, email, password });
      await user.save();
      const userId = user._id;
      const token = jwt.sign({ userId }, 'MY_SECRET_KEY');
      const userInfo = {
        token,
        userId,
      };
      res.status(200).send(userInfo);
    } catch (err) {
      return res.send("Email already exists");
    }
  }
});

// Signin Endpoint
router.post('/teacher_signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  try {
    const user = await Teacher.findOne({ email });
    if (!user) {
      return res.status(422).send({ error: 'Invalid password or email' });
    }

    await user.comparePassword(password);
    const userId = user._id;
    const token = jwt.sign({ userId }, 'MY_SECRET_KEY');
    const userInfo = {
      token,
      user,
    };
    console.log(userInfo);
    res.send(userInfo);
  } catch (err) {
    return res.send('Invalid password');
  }
});

// Get All Teachers Endpoint
router.get('/teacher', async (req, res) => {
  try {
    const users = await Teacher.find({}, { password: 0 }); // password k bagair
    res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'An error occurred' });
  }
});


router.post('/admin_signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new Admin({ email, password });
    await user.save();
    const userId = user._id;
    const token = jwt.sign({ userId }, 'MY_SECRET_KEY');
    const userInfo = {
      token: { token },
      userId: { userId }
    }
    res.send(userInfo);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/admin_signin', async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  console.log(password)

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const userId = user._id;
    const token = jwt.sign({ userId }, 'MY_SECRET_KEY');
    const userInfo = {
      token: { token },
      userId: { userId }
    }
    res.send(userInfo);
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});


module.exports = router;
