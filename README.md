# Task Manager Application

A full-stack Task Manager application built with Node.js, Express, React, and Docker. This application allows users to create, read, update, and delete tasks with a modern and responsive user interface.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Create Tasks**: Add new tasks with title and description
- **View Tasks**: See all tasks in a clean, organized interface
- **Update Tasks**: Edit task details and mark tasks as complete/incomplete
- **Delete Tasks**: Remove tasks you no longer need
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **RESTful API**: Well-structured backend API
- **Docker Support**: Easy deployment with Docker Compose

## 🛠 Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing middleware

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server for frontend

### Testing (Optional)
- **Jest** - Testing framework for backend
- **React Testing Library** - Testing utilities for frontend

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 1.29 or higher, v2 recommended)

To check if you have Docker installed:
```bash
docker --version
docker compose version
```

If you don't have Docker installed, visit [Docker Installation Guide](https://docs.docker.com/get-docker/).

## 🚀 Quick Start

The easiest way to run the entire application is using Docker Compose:

```bash
# Clone the repository (if not already cloned)
git clone <repository-url>
cd github-slideshow

# Start the application
docker compose up --build
```

That's it! The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

To stop the application:
```bash
docker compose down
```

## 📖 Setup and Installation

### Method 1: Using Docker Compose (Recommended)

This is the simplest method and recommended for most users.

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-slideshow
   ```

2. **Build and start the services**
   ```bash
   docker compose up --build
   ```

   The `--build` flag ensures Docker builds the images. On subsequent runs, you can omit it:
   ```bash
   docker compose up
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

### Method 2: Manual Setup (Development)

If you want to run the application without Docker for development:

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```

   The backend will run on http://localhost:5000

#### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend development server**
   ```bash
   npm start
   ```

   The frontend will run on http://localhost:3000 and automatically open in your browser.

## 🎮 Running the Application

### Using Docker Compose

```bash
# Start in foreground (see logs)
docker compose up

# Start in background (detached mode)
docker compose up -d

# View logs
docker compose logs -f

# Stop the application
docker compose down

# Rebuild and start (after code changes)
docker compose up --build
```

### Without Docker

You need to run both backend and frontend in separate terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

## 📚 API Documentation

The backend provides a RESTful API with the following endpoints:

### Health Check
```
GET /api/health
```
Returns the health status of the API.

**Response:**
```json
{
  "status": "ok",
  "message": "Backend API is running"
}
```

### Get All Tasks
```
GET /api/tasks
```
Returns all tasks.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Sample Task",
      "description": "Task description",
      "completed": false
    }
  ]
}
```

### Get Single Task
```
GET /api/tasks/:id
```
Returns a specific task by ID.

### Create Task
```
POST /api/tasks
```
Creates a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "New Task",
    "description": "Task description",
    "completed": false
  }
}
```

### Update Task
```
PUT /api/tasks/:id
```
Updates an existing task.

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "completed": true
}
```

### Delete Task
```
DELETE /api/tasks/:id
```
Deletes a task.

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## 🧪 Testing

Unit tests are included for both backend and frontend (optional but recommended).

### Backend Tests

```bash
cd backend
npm install  # if not already installed
npm test
```

### Frontend Tests

```bash
cd frontend
npm install  # if not already installed
npm test
```

### Running Tests in Docker

You can also run tests inside Docker containers:

```bash
# Backend tests
docker-compose run backend npm test

# Frontend tests
docker-compose run frontend npm test
```

## 📁 Project Structure

```
github-slideshow/
├── backend/                  # Backend application
│   ├── src/
│   │   └── server.js        # Express server and API routes
│   ├── tests/
│   │   └── api.test.js      # Backend tests (optional)
│   ├── Dockerfile           # Backend Docker configuration
│   ├── package.json         # Backend dependencies
│   └── jest.config.js       # Jest configuration for testing
├── frontend/                 # Frontend application
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Styling
│   │   ├── App.test.js      # Frontend tests (optional)
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   ├── Dockerfile           # Frontend Docker configuration
│   ├── nginx.conf           # Nginx configuration
│   └── package.json         # Frontend dependencies
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # This file
```

## 🔧 Troubleshooting

### Port Already in Use

If you get an error that port 3000 or 5000 is already in use:

**Solution 1:** Stop the application using those ports.

**Solution 2:** Change the ports in `docker-compose.yml`:
```yaml
ports:
  - "8080:80"    # Change 3000 to 8080 for frontend
  - "5001:5000"  # Change 5000 to 5001 for backend
```

### Cannot Connect to Backend

If the frontend cannot connect to the backend:

1. Make sure both services are running
2. Check that the backend is accessible at http://localhost:5000/api/health
3. Verify CORS is enabled in the backend
4. Check browser console for error messages

### Docker Build Issues

If Docker build fails:

```bash
# Clean up Docker resources
docker compose down -v
docker system prune -a

# Rebuild from scratch
docker compose up --build
```

### Frontend Not Loading

If the frontend doesn't load:

1. Check if the container is running: `docker ps`
2. View logs: `docker compose logs frontend`
3. Try accessing http://localhost:3000 directly in your browser
4. Clear browser cache and try again

### Node Modules Issues

If you encounter node modules errors:

```bash
# For backend
cd backend
rm -rf node_modules package-lock.json
npm install

# For frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📝 Notes

- The application uses in-memory storage, so data will be lost when the backend restarts
- For production use, consider adding a database (PostgreSQL, MongoDB, etc.)
- The application is configured for development; add security measures for production
- CORS is enabled for all origins in development; restrict this in production

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository.
