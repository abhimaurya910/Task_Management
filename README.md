# Task Management System - Backend

A backend application for managing tasks using **Node.js**, **Express**, and **PostgreSQL**. This system allows users to create, update, delete, search, and mark tasks as completed. It also automatically calculates task statuses (Pending, Due Today, Overdue) based on the `due_date`.

---

## Features

- **Create Tasks**: Add new tasks with a title, description, and due date.
- **Update Tasks**: Modify task details (title, description, due date, status).
- **Delete Tasks**: Remove tasks from the system.
- **Search Tasks**: Search for tasks by title or description.
- **Mark Tasks as Completed**: Update the status of a task to "Completed".
- **Automatic Status Calculation**:
  - **Pending**: Task is not yet started or due date is in the future.
  - **Due Today**: Task's `due_date` matches the current date.
  - **Overdue**: Task's `due_date` is before the current date, and the status is not "Completed".

---

## Setup and Installation

### Prerequisites

- **Node.js** (v20.11.0)
- **npm** (comes with Node.js)
- **PostgreSQL** (install locally or use a cloud-based service)

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/backend_project-for-new.git

   ```

2. **Navigate to the Project Folder**: cd backend_project-for-new
3. **Install Dependencies**: npm install
4. **Set up the database**:

   Create a PostgreSQL database.

   Update the .env file with your database credentials:
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=task_management
   PORT=3000

5. **Run the database migration script**: psql -U your_db_user -d postgres -f schema.sql
6. **Start the server: npm run dev**

***API Details***
Base URL :http://localhost:3000/api

Endpoints
Create a Task
**Method: POST**

URL: /tasks

Request Body: {
"title": "Complete project",
"description": "Finish the task management system",
"due_Date" : "not compulsry"
}

Get All Tasks
**Method: GET**

URL: /tasks

Update a Task
**Method: PUT**

URL: /tasks/:id
Request Body:{
"title": "Updated title",
"description": "Updated description",
"due_date": "2023-11-20",
"status": "In Progress"
}

**Method: DELETE**

URL: /tasks/:id

**Method: PATCH**

URL: /tasks/:id/complete
{
"id": 1,
"title": "Complete project",
"description": "Finish the task management system",
"due_date": "2023-11-15",
"status": "Completed",
"completed_at": "2023-11-08T12:00:00.000Z",
"created_at": "2023-11-08T12:00:00.000Z",
"updated_at": "2023-11-08T12:00:00.000Z"
}

**Method: GET**

URL: /tasks/search?query=project
