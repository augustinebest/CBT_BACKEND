const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    name: { type: String, required: true },
    questions: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Question'}]
});

module.exports = mongoose.model('Subject', subjectSchema);