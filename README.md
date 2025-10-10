# GitHub Slideshow Application

A full-stack web application for managing and viewing presentation slides with a RESTful API backend and interactive frontend interface.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Docker Deployment](#docker-deployment)
- [Development](#development)

## 🎯 Project Overview

This project consists of:
- **Backend API**: RESTful API built with Node.js and Express for managing slides
- **Frontend Application**: Interactive web interface for viewing and managing slides
- **Docker Configuration**: Complete Docker Compose setup for containerized deployment

## 🛠 Technology Stack

### Backend
- Node.js (v18+)
- Express.js
- CORS middleware
- Body-parser

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- HTTP-server for serving static files

### DevOps
- Docker & Docker Compose
- Git version control

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v8.x or higher) - Comes with Node.js
- **Docker** (v20.x or higher) - [Download](https://www.docker.com/get-started)
- **Docker Compose** (v2.x or higher) - Usually comes with Docker Desktop
- **Git** - [Download](https://git-scm.com/downloads)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd github-slideshow
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env

# Return to root directory
cd ..
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Return to root directory
cd ..
```

## 🏃 Running the Application

### Option 1: Using Docker Compose (Recommended)

This is the easiest way to run both backend and frontend together:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Once running:
- Backend API: http://localhost:3000
- Frontend: http://localhost:8080

### Option 2: Running Manually (Development)

#### Start Backend Server

```bash
# Terminal 1: Start backend
cd backend
npm start

# Or use nodemon for auto-reload during development
npm run dev
```

The backend will run on http://localhost:3000

#### Start Frontend Server

```bash
# Terminal 2: Start frontend
cd frontend
npm start
```

The frontend will run on http://localhost:8080

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Get All Slides
```http
GET /api/slides
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Welcome to GitHub",
      "content": "Introduction to GitHub and version control",
      "order": 1
    }
  ]
}
```

#### 2. Get Single Slide
```http
GET /api/slides/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Welcome to GitHub",
    "content": "Introduction to GitHub and version control",
    "order": 1
  }
}
```

#### 3. Create New Slide
```http
POST /api/slides
Content-Type: application/json

{
  "title": "New Slide Title",
  "content": "Slide content here",
  "order": 3
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "New Slide Title",
    "content": "Slide content here",
    "order": 3
  }
}
```

#### 4. Update Slide
```http
PUT /api/slides/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "order": 1
}
```

#### 5. Delete Slide
```http
DELETE /api/slides/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Slide deleted successfully"
}
```

#### 6. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-10T12:37:13.003Z"
}
```

## 📁 Project Structure

```
github-slideshow/
├── backend/                 # Backend API
│   ├── server.js           # Main Express server
│   ├── package.json        # Backend dependencies
│   ├── Dockerfile          # Backend Docker configuration
│   └── .env.example        # Environment variables template
├── frontend/               # Frontend application
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling
│   ├── app.js              # JavaScript application logic
│   ├── package.json        # Frontend dependencies
│   └── Dockerfile          # Frontend Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore          # Docker ignore file
├── README.md              # This file
└── LICENSE                # Project license
```

## 🐳 Docker Deployment

### Building Images

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Managing Containers

```bash
# Start services
docker-compose up

# Stop services
docker-compose stop

# Restart services
docker-compose restart

# Remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v
```

### Viewing Logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs
docker-compose logs -f
```

## 💻 Development

### Backend Development

The backend uses an in-memory data store. For production, you should integrate a proper database (e.g., MongoDB, PostgreSQL).

```bash
cd backend
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development

The frontend is a static web application. To modify:

1. Edit HTML/CSS/JS files in the `frontend/` directory
2. Refresh browser to see changes
3. The API URL can be configured in `frontend/app.js`

### Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Code Quality

Follow these best practices:
- Use ESLint for JavaScript linting
- Follow REST API conventions
- Write descriptive commit messages
- Test all endpoints before committing

## 🔒 Repository Requirements

✅ **This repository meets the following requirements:**

1. **Private GitHub Repository**: Ensure this repository is set to private
2. **Complete Backend Code**: Node.js/Express API with full CRUD operations
3. **Frontend Application**: Interactive web interface for managing slides
4. **Docker Compose Configuration**: Complete containerization setup
5. **Comprehensive README**: This document with setup and running instructions
6. **Additional Documentation**: API documentation and project structure

### Sharing Access

To share access with the evaluation team:
1. Go to repository Settings → Collaborators
2. Add team members with appropriate permissions
3. Share the repository URL

## 📝 Additional Notes

- The application uses CORS to allow cross-origin requests
- Backend runs on port 3000 by default
- Frontend runs on port 8080 by default
- Data is stored in-memory and will reset when the backend restarts
- For production use, implement proper database integration and authentication

## 🤝 Contributing

This is a private repository. For any changes:
1. Create a feature branch
2. Make your changes
3. Submit a pull request for review

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This project also includes the original reveal.js slideshow functionality. See the `_posts/` directory for existing slide content.
