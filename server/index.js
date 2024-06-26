require("./models/User");
require("./models/Track");
require("./models/CourseModel");
require("./models/SubjectModel");
require('./models/Teacher');
require("./models/Enroll");
require("./models/ClassWork");
require("./models/ClassWork2");
require("./models/Admin");
require("./models/Student");
require("./models/Attendence");
require("./models/Event");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const courseRoutes = require('./routes/courseRoutes');
const subjectRoutes = require('./routes/subjectRoute');
const enrollmentRoutes = require('./routes/enrollRoutes');
const classWorkRoute = require('./routes/classWorkRoute');
const studentEmail = require('./routes/studentEmail');
const attendence = require('./routes/attendenceRoutes');
const event = require('./routes/eventRoute');
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
app.use(courseRoutes);
app.use(enrollmentRoutes);
app.use(classWorkRoute);
app.use(studentEmail);
app.use(subjectRoutes);
app.use(attendence);
app.use(event);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});
app.get("/check_email", (req, res) => {
  find({ email })
});
app.listen(process.env.PORT, () => {
  console.log("Listening on port :", process.env.PORT);
});
