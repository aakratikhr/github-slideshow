# Task Manager API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Health Check

Check if the API is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "message": "Backend API is running"
}
```

**Status Codes:**
- `200 OK` - API is running successfully

---

### 2. Get All Tasks

Retrieve all tasks.

**Endpoint:** `GET /api/tasks`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Sample Task 1",
      "description": "This is a sample task",
      "completed": false
    },
    {
      "id": 2,
      "title": "Sample Task 2",
      "description": "Another sample task",
      "completed": true
    }
  ]
}
```

**Status Codes:**
- `200 OK` - Successfully retrieved tasks

---

### 3. Get Task by ID

Retrieve a specific task by its ID.

**Endpoint:** `GET /api/tasks/:id`

**URL Parameters:**
- `id` (number) - Task ID

**Example:** `GET /api/tasks/1`

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Task 1",
    "description": "This is a sample task",
    "completed": false
  }
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Status Codes:**
- `200 OK` - Task found and returned
- `404 Not Found` - Task with specified ID does not exist

---

### 4. Create Task

Create a new task.

**Endpoint:** `POST /api/tasks`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Task Title",
  "description": "Optional task description"
}
```

**Required Fields:**
- `title` (string) - Task title (required)

**Optional Fields:**
- `description` (string) - Task description

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "New Task Title",
    "description": "Optional task description",
    "completed": false
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Title is required"
}
```

**Status Codes:**
- `201 Created` - Task created successfully
- `400 Bad Request` - Missing required fields

---

### 5. Update Task

Update an existing task.

**Endpoint:** `PUT /api/tasks/:id`

**URL Parameters:**
- `id` (number) - Task ID

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "completed": true
}
```

**Fields (all optional):**
- `title` (string) - New task title
- `description` (string) - New task description
- `completed` (boolean) - Task completion status

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Task Title",
    "description": "Updated description",
    "completed": true
  }
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Status Codes:**
- `200 OK` - Task updated successfully
- `404 Not Found` - Task with specified ID does not exist

---

### 6. Delete Task

Delete a task.

**Endpoint:** `DELETE /api/tasks/:id`

**URL Parameters:**
- `id` (number) - Task ID

**Example:** `DELETE /api/tasks/1`

**Response (Success):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Status Codes:**
- `200 OK` - Task deleted successfully
- `404 Not Found` - Task with specified ID does not exist

---

## Error Responses

### 404 Not Found (Route)
When accessing a non-existent route:
```json
{
  "success": false,
  "message": "Route not found"
}
```

### 500 Internal Server Error
For unexpected server errors:
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Example Usage

### Using cURL

**Create a task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread"}'
```

**Get all tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Update a task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

### Using JavaScript (Axios)

```javascript
const axios = require('axios');
const API_URL = 'http://localhost:5000/api';

// Create a task
const createTask = async () => {
  const response = await axios.post(`${API_URL}/tasks`, {
    title: 'New Task',
    description: 'Task description'
  });
  console.log(response.data);
};

// Get all tasks
const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  console.log(response.data);
};

// Update a task
const updateTask = async (id) => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, {
    completed: true
  });
  console.log(response.data);
};

// Delete a task
const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/tasks/${id}`);
  console.log(response.data);
};
```

---

## Notes

- All responses are in JSON format
- The API uses in-memory storage, so data will be lost when the server restarts
- CORS is enabled for all origins in development mode
- All timestamps are in UTC
- Task IDs are auto-incremented integers
