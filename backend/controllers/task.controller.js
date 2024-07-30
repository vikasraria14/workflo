// controllers/taskController.js
const Task = require('../models/task.model');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, priority, deadline } = req.body;
        const task = new Task({
            user: req.user._id,
            title,
            description,
            status,
            priority,
            deadline
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority, deadline } = req.body;
        // const {  status} = req.body;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ensure the task belongs to the user
        // if (task.user.toString() !== req.user._id.toString()) {
        //     return res.status(401).json({ message: 'Not authorized' });
        // }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.deadline = deadline || task.deadline;

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ensure the task belongs to the user
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await task.remove();
        res.status(200).json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Get tasks formatted for frontend
exports.getFormattedTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });

        const formattedTasks = tasks.map(task => ({
            id: task._id,
            columnId: task.status,
            content: task.title,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline
        }));

        res.status(200).json(formattedTasks);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
