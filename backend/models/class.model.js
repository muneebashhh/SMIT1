const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    section: { type: String },
    subject: { type: String, required: true },
    teacher: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }]
});

module.exports = mongoose.model('classes', classSchema);
