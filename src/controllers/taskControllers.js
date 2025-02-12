const taskModel = require("../models/taskModel");

// Create a new task
const addTask = async (req, res) => {
  const { title, description, due_date } = req.body;

  let formattedDueDate;
  if (due_date) {
    const currentDate = new Date();
    const dueDate = new Date(currentDate);
    dueDate.setDate(currentDate.getDate() + 7);
    formattedDueDate = dueDate.toISOString().split("T")[0];
  } else {
    formattedDueDate = due_date;
  }

  try {
    const newTask = await taskModel.createTask(
      title,
      description,
      formattedDueDate
    );
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;

  const fieldsToUpdate = {};
  if (title !== undefined) fieldsToUpdate.title = title;
  if (description !== undefined) fieldsToUpdate.description = description;
  if (due_date !== undefined) fieldsToUpdate.due_date = due_date;
  if (status !== undefined) fieldsToUpdate.status = status;

  try {
    const updatedTask = await taskModel.updateTask(id, fieldsToUpdate);
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await taskModel.deleteTask(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark a task as completed
const markTaskAsCompleted = async (req, res) => {
  const { id } = req.params;

  try {
    const completedTask = await taskModel.markTaskAsCompleted(id);
    if (!completedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(completedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search tasks by title or description
const searchTasks = async (req, res) => {
  const { query } = req.query;

  try {
    const tasks = await taskModel.searchTasks(query);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOverdueTasks = async (req, res) => {
  try {
    const overdueTasks = await taskModel.getOverdueTasks();
    res.status(200).json(overdueTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addTask,
  updateTask,
  deleteTask,
  markTaskAsCompleted,
  searchTasks,
  getAllTasks,
  getOverdueTasks,
};
