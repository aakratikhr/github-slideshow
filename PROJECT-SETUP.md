# Project Setup Guide

This repository now contains both a React + TypeScript frontend and a Spring Boot backend.

## 🎨 Frontend

**Location**: `/frontend`

### Technologies
- **React 19** with **TypeScript**
- **Vite** as the build tool
- **Material UI (MUI)** for UI components
- **Emotion** for CSS-in-JS styling

### Quick Start
```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

📖 See [frontend/README-SETUP.md](frontend/README-SETUP.md) for detailed documentation.

---

## ⚙️ Backend

**Location**: `/backend`

### Technologies
- **Spring Boot 3.4.1**
- **Java 17**
- **Maven** as the build tool
- **H2 Database** (in-memory)
- **Spring Data JPA** for database operations

### Quick Start
```bash
cd backend
mvn spring-boot:run
```

Visit: `http://localhost:8080`

### H2 Database Console
When the backend is running, access the H2 console at:
- **URL**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (leave empty)

### Available Maven Commands
- `mvn spring-boot:run` - Run the application
- `mvn clean package` - Build the application
- `mvn test` - Run tests

📖 See [backend/README.md](backend/README.md) for detailed documentation.

---

## 📁 Project Structure

```
github-slideshow/
├── frontend/              # React + TypeScript + Vite application
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
└── [existing files]       # Original Jekyll slideshow files
```

---

## 🚀 Development Workflow

### Frontend Development
1. Navigate to `frontend/` directory
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Edit files in `src/`
5. Changes will hot-reload automatically

### Backend Development
1. Navigate to `backend/` directory
2. Start the server: `mvn spring-boot:run`
3. Edit files in `src/main/java/`
4. Restart server to see changes (or use Spring DevTools for hot reload)

### Full Stack Development
Run both servers simultaneously:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:8080`

---

## ✅ Verification

Both projects have been verified and are working correctly:
- ✅ Frontend builds and runs successfully
- ✅ Backend builds and runs successfully
- ✅ H2 database is configured and accessible
- ✅ Material UI is installed and ready to use
- ✅ All tests pass

---

## 📝 Next Steps

### Frontend
- Create React components using Material UI
- Set up routing with React Router (if needed)
- Connect to backend API endpoints
- Add state management (Redux, Zustand, etc.) if needed

### Backend
- Create REST API endpoints
- Define JPA entities for your data models
- Create repositories for database operations
- Add business logic in service layer
- Configure CORS for frontend communication

### Integration
- Configure backend CORS to allow frontend origin
- Create API client in frontend
- Set up environment variables for API URLs
- Consider adding authentication/authorization

---

## 🔧 Additional Configuration

### CORS Configuration (Backend)
To allow frontend to communicate with backend, add CORS configuration:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

### Environment Variables (Frontend)
Create `.env` file in frontend directory:
```
VITE_API_URL=http://localhost:8080
```

Access in code:
```typescript
const API_URL = import.meta.env.VITE_API_URL;
```
