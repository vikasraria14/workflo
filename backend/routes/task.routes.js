// routes/task.js
const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getFormattedTasks
} = require('../controllers/task.controller.js');
const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);
router.get('/formatted', protect, getFormattedTasks);
// router.post('/',  createTask);
// router.get('/',  getTasks);
// router.put('/:id',  updateTask);
// router.delete('/:id',  deleteTask);
// router.get('/formatted',  getFormattedTasks);

module.exports = router;
