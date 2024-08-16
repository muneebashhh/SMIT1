const Assignment = require('../models/assignment.model');
const Submission = require('../models/submission.model');
const classes = require('../models/class.model');

const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, classId } = req.body;
    const newAssignment = new Assignment({ title, description, dueDate, class: classId });
    await newAssignment.save();
    const classToUpdate = await classes.findById(classId);
    classToUpdate.assignments.push(newAssignment._id);
    await classToUpdate.save();
    res.status(201).json({ message: 'Assignment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadSubmission = async (req, res) => {
  try {
    const { assignmentId, fileUrl, userId } = req.body;
    const newSubmission = new Submission({ assignment: assignmentId, student: userId, fileUrl });
    await newSubmission.save();
    const assignmentToUpdate = await Assignment.findById(assignmentId);
    assignmentToUpdate.submissions.push(newSubmission._id);
    await assignmentToUpdate.save();
    res.status(201).json({ message: 'Submission uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAssignment, uploadSubmission };
