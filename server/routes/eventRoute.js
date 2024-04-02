// routes/eventRoutes.js
const express = require('express');
const Event = require('../models/Event');
const requireAuth=require('../middlewares/requireAuth')
const router = express.Router();
router.use(requireAuth);
// Create a new event
router.post('/events', (req, res) => {
  const { title, description,createDate } = req.body;
  const date=(new Date().getHours() + ":" + new Date().getMinutes() + " (" + new Date().getUTCDate() + "/" + new Date().getMonth()+ "/" + new Date().getFullYear() + ")")
  const event = new Event({
    title,
    description,
    date,createDate
  });

  event.save()
    .then(() => {
      res.status(201).json({ message: 'Event created successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create event' });
    });
});

// Fetch all events
router.get('/events', async (req, res) => {
    try {
      const events = await Event.find();
      if (events.length === 0) {
        res.send("No events found");
      } else {
        
        res.send(events);
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
  
module.exports = router;
