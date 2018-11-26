const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    instruction: { type: String },
    heading: { type: String, required: true },
    answers: [],
    correct: { type: Number, required: true }
});

module.exports = mongoose.model('Question', questionSchema);