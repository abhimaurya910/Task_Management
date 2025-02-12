-- Create the database
CREATE DATABASE task_management;

-- Connect to the database
\c task_management;

-- Create the tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optionally, add sample data
INSERT INTO tasks (title, description, due_date, status, completed_at) VALUES
('Complete project', 'Finish the task management system', '2023-12-31', 'Pending', NULL),
('Learn PostgreSQL', 'Study advanced PostgreSQL features', '2023-11-15', 'Completed', '2023-11-01 10:00:00');