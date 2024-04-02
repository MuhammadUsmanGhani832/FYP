// models/event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: { type: String },
    date: {
        type: String
    },
    createDate: {
        type: String
    }
});

module.exports = mongoose.model('Event', eventSchema);
