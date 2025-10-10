# Application Verification Guide

This document provides guidance on verifying that the Task Manager application is working correctly.

## Pre-Deployment Verification

### 1. File Structure Verification

Verify that all required files are present:

```bash
# Check backend files
ls -la backend/
ls -la backend/src/
ls -la backend/tests/

# Check frontend files
ls -la frontend/
ls -la frontend/src/
ls -la frontend/public/

# Check Docker files
ls docker-compose.yml
```

Expected structure:
```
.
├── backend/
│   ├── src/
│   │   └── server.js
│   ├── tests/
│   │   └── api.test.js
│   ├── Dockerfile
│   ├── package.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── App.test.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
├── README.md
└── API.md
```

### 2. Docker Compose Configuration Verification

Check that docker-compose.yml is properly configured:

```bash
# Validate docker compose configuration
docker compose config
```

This should display the parsed configuration without errors.

## Deployment Verification

### Method 1: Using Docker Compose (Recommended)

#### Step 1: Build the Application

```bash
docker compose build
```

Expected output:
- Successfully builds both backend and frontend images
- No build errors

#### Step 2: Start the Application

```bash
docker compose up
```

Expected output:
```
[+] Running 2/2
 ✔ Container task-manager-backend   Started
 ✔ Container task-manager-frontend  Started
```

You should see logs showing:
- Backend: "Server is running on port 5000"
- Frontend: Nginx serving the React app

#### Step 3: Verify Containers Are Running

In a new terminal:
```bash
docker ps
```

Expected output should show two running containers:
```
CONTAINER ID   IMAGE                       PORT                  STATUS
<id>           github-slideshow-backend    0.0.0.0:5000->5000    Up
<id>           github-slideshow-frontend   0.0.0.0:3000->80      Up
```

### Method 2: Manual Verification (Without Docker)

#### Backend Verification

1. Install dependencies and start backend:
```bash
cd backend
npm install
npm start
```

Expected output:
```
Server is running on port 5000
```

2. Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"ok","message":"Backend API is running"}
```

#### Frontend Verification

1. In a new terminal, install dependencies and start frontend:
```bash
cd frontend
npm install
npm start
```

Expected output:
```
Compiled successfully!
You can now view task-manager-frontend in the browser.
  Local:            http://localhost:3000
```

## Functional Testing

### 1. API Endpoint Testing

Test all CRUD operations:

#### Get All Tasks (should return 2 sample tasks)
```bash
curl http://localhost:5000/api/tasks
```

Expected response:
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

#### Create a New Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing the API"}'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "Test Task",
    "description": "Testing the API",
    "completed": false
  }
}
```

#### Update a Task
```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Task 1",
    "description": "This is a sample task",
    "completed": true
  }
}
```

#### Delete a Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

Expected response:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### 2. Frontend UI Testing

1. Open your browser and navigate to: http://localhost:3000

2. Verify the following UI elements are present:
   - Page header with "📝 Task Manager"
   - "Add New Task" form with:
     - Title input field
     - Description textarea
     - "Add Task" button
   - Tasks list showing existing tasks

3. Test CRUD operations through the UI:

   **Create:**
   - Fill in task title and description
   - Click "Add Task"
   - Verify new task appears in the list

   **Read:**
   - Verify all tasks are displayed
   - Check that task details (title, description, status) are visible

   **Update:**
   - Click the edit button (✎) on a task
   - Modify the title or description
   - Click outside or "Done Editing"
   - Verify changes are saved

   **Mark Complete/Incomplete:**
   - Click the checkbox button (○ or ✓) on a task
   - Verify task status changes
   - Check that completed tasks have visual differentiation

   **Delete:**
   - Click the delete button (✕) on a task
   - Confirm the deletion in the popup
   - Verify task is removed from the list

### 3. Integration Testing

1. **Backend-Frontend Communication:**
   - Perform any action in the UI (create/update/delete)
   - Open browser developer tools (F12)
   - Go to Network tab
   - Verify API calls are being made to http://localhost:5000/api/tasks
   - Check that responses are successful (status 200/201)

2. **Error Handling:**
   - Stop the backend server
   - Try to perform an action in the UI
   - Verify error message appears: "Failed to fetch tasks..."

3. **State Persistence:**
   - Create several tasks
   - Refresh the page
   - Verify tasks are still visible (until backend restarts)

## Unit Testing Verification

### Backend Tests

```bash
cd backend
npm test
```

Expected output:
```
PASS  tests/api.test.js
  Task Manager API Tests
    GET /api/health
      ✓ should return health status
    GET /api/tasks
      ✓ should return all tasks
    POST /api/tasks
      ✓ should create a new task
      ✓ should fail without title

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

### Frontend Tests

```bash
cd frontend
npm test -- --watchAll=false
```

Expected output:
```
PASS  src/App.test.js
  ✓ renders Task Manager heading
  ✓ renders add task form

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```

## Performance Verification

1. **Response Time:**
   - API responses should be under 100ms
   - UI should be responsive with no noticeable lag

2. **Resource Usage:**
   ```bash
   docker stats
   ```
   - Backend container should use minimal CPU and memory
   - Frontend container (nginx) should be lightweight

## Common Issues and Solutions

### Issue 1: Ports Already in Use

**Symptom:** Error "port is already allocated" when running docker compose up

**Solution:**
- Check what's using the ports:
  ```bash
  lsof -i :3000
  lsof -i :5000
  ```
- Stop those processes or change ports in docker-compose.yml

### Issue 2: Frontend Cannot Connect to Backend

**Symptom:** Frontend shows error: "Failed to fetch tasks"

**Verification:**
1. Check backend is running: `curl http://localhost:5000/api/health`
2. Check browser console for CORS errors
3. Verify network configuration in docker-compose.yml

**Solution:**
- Ensure both services are running
- Verify CORS is enabled in backend
- Check environment variables are set correctly

### Issue 3: Docker Build Fails

**Symptom:** Build errors during `docker compose build`

**Verification:**
1. Check Docker is running: `docker info`
2. Verify sufficient disk space
3. Check internet connectivity for npm install

**Solution:**
```bash
docker compose down -v
docker system prune -a
docker compose build --no-cache
```

## Success Criteria Checklist

- [ ] All files are present and properly structured
- [ ] Docker Compose builds without errors
- [ ] Both containers start and run successfully
- [ ] Backend health check returns 200 OK
- [ ] Frontend loads in browser at http://localhost:3000
- [ ] Can create new tasks through UI
- [ ] Can view all tasks
- [ ] Can update existing tasks
- [ ] Can mark tasks as complete/incomplete
- [ ] Can delete tasks
- [ ] API endpoints respond correctly to curl commands
- [ ] Backend unit tests pass
- [ ] Frontend unit tests pass
- [ ] Error handling works correctly
- [ ] Application can be stopped and restarted successfully

## Documentation Verification

Verify that documentation is complete and accurate:

- [ ] README.md has setup instructions
- [ ] README.md has running instructions
- [ ] API.md documents all endpoints
- [ ] All code has appropriate structure
- [ ] Docker configuration is documented

## Notes

- The application uses in-memory storage, so data is lost on restart
- This is a development/demonstration setup, not production-ready
- For production, add:
  - Database for persistent storage
  - Environment variable management
  - Security measures (authentication, HTTPS, etc.)
  - Proper error logging and monitoring
  - CI/CD pipeline
