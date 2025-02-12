const express = require('express');
const taskController = require('../controllers/taskControllers');

const router = express.Router();

// Create a new task
router.post('/tasks', taskController.addTask);

// Update a task
router.put('/tasks/:id', taskController.updateTask);

// Delete a task
router.delete('/tasks/:id', taskController.deleteTask);

// Mark a task as completed
router.patch('/tasks/:id/complete', taskController.markTaskAsCompleted);

// Search tasks
router.get('/tasks/search', taskController.searchTasks);

// Get all tasks
router.get('/tasks', taskController.getAllTasks);

module.exports = router;