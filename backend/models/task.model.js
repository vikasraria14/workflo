// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['toDo', 'inProgress', 'underReview', 'completed'],
    default: 'To-Do',
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'Urgent']
  },
  deadline: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
