const pool = require('../utils/db');


const calculateStatus = (due_date) => {
  const currentDate = new Date().toISOString().split('T')[0]; 
  const dueDate = new Date(due_date).toISOString().split('T')[0]; 

  if (dueDate < currentDate) {
    return 'Overdue';
  } else if (dueDate === currentDate) {
    return 'Due Today';
  } else {
    return 'Pending';
  }
};

// Create a new task
const createTask = async (title, description, due_date) => {
  const status = calculateStatus(due_date);
  const result = await pool.query(
    'INSERT INTO tasks (title, description, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, due_date, status]
  );
  return result.rows[0];
};

// Update a task
const updateTask = async (id, fields) => {
 
  if (fields.due_date) {
    fields.status = calculateStatus(fields.due_date);
  }

 
  const updates = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(fields)) {
    updates.push(`${key} = $${index}`);
    values.push(value);
    index++;
  }

  if (updates.length === 0) {
    throw new Error('No fields to update');
  }

  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  const query = `
    UPDATE tasks
    SET ${updates.join(', ')}
    WHERE id = $${index}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete a task
const deleteTask = async (id) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

// Mark a task as completed
const markTaskAsCompleted = async (id) => {
  const result = await pool.query(
    'UPDATE tasks SET status = $1, completed_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    ['Completed', id]
  );
  return result.rows[0];
};

// Search tasks by title or description
const searchTasks = async (query) => {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE title ILIKE $1 OR description ILIKE $1',
    [`%${query}%`]
  );
  return result.rows;
};

// Get all tasks
const getAllTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks');
  const tasks = result.rows.map(task => {
    const status = calculateStatus(task.due_date);
    return { ...task, status }; 
  });
  return tasks;
};

const getOverdueTasks = async () => {
  const result = await pool.query(
    `SELECT * FROM tasks 
     WHERE due_date < CURRENT_DATE 
     AND status != 'Completed'`
  );
  return result.rows;
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  markTaskAsCompleted,
  searchTasks,
  getAllTasks,
  getOverdueTasks,
};