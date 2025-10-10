# Quick Setup Guide

This is a quick reference guide for setting up and running the GitHub Slideshow application.

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

## Quick Start with Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd github-slideshow

# Start all services
docker compose up --build

# Access the application
# Backend API: http://localhost:3000
# Frontend: http://localhost:8080
```

## Manual Setup (Development)

### Backend

```bash
cd backend
npm install
npm start
# Runs on http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:8080
```

## Testing the Application

### Test Backend API

```bash
# Health check
curl http://localhost:3000/api/health

# Get all slides
curl http://localhost:3000/api/slides

# Create a new slide
curl -X POST http://localhost:3000/api/slides \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Slide","content":"Test content","order":3}'
```

### Test Frontend

Open http://localhost:8080 in your browser and:
1. Click "Refresh Slides" to load existing slides
2. Click "Add New Slide" to create a new slide
3. Click on any slide card to view it in the viewer
4. Use arrow keys or navigation buttons to move between slides

## Stopping the Application

### Docker
```bash
docker compose down
```

### Manual
Press `Ctrl+C` in each terminal window

## Troubleshooting

### Port Already in Use

If you get a port conflict error:

```bash
# For backend (port 3000)
lsof -i :3000
kill -9 <PID>

# For frontend (port 8080)
lsof -i :8080
kill -9 <PID>
```

### Docker Issues

```bash
# Remove all containers and volumes
docker compose down -v

# Rebuild from scratch
docker compose build --no-cache
docker compose up
```

### Backend Not Responding

1. Check if backend is running: `curl http://localhost:3000/api/health`
2. Check backend logs: `docker compose logs backend`
3. Verify dependencies are installed: `cd backend && npm install`

### Frontend Cannot Connect to Backend

1. Ensure backend is running on port 3000
2. Check CORS configuration in `backend/server.js`
3. Update API_URL in `frontend/app.js` if needed

## Environment Variables

### Backend (.env)

```env
PORT=3000
NODE_ENV=development
```

## API Endpoints Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/slides | Get all slides |
| GET | /api/slides/:id | Get single slide |
| POST | /api/slides | Create new slide |
| PUT | /api/slides/:id | Update slide |
| DELETE | /api/slides/:id | Delete slide |

## File Structure

```
github-slideshow/
├── backend/          # Backend API
├── frontend/         # Frontend App
├── docker-compose.yml
└── README.md
```

For complete documentation, see [README.md](README.md).
