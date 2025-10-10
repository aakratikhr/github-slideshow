# Frontend - React + TypeScript + Vite + Material UI

This is a React application built with TypeScript using Vite as the build tool and Material UI for components.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Material UI (MUI)
- **Styling**: Emotion (CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)

### Installation

```bash
cd frontend
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

### Build

Build the project for production:

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── App.css          # App styles
│   ├── index.css        # Global styles
│   └── assets/          # Static assets
├── public/              # Public assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Material UI Usage

Material UI is already installed. To use it in your components:

```tsx
import { Button, Container, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

function MyComponent() {
  return (
    <Container>
      <Typography variant="h1">Hello World</Typography>
      <Button variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </Container>
  );
}
```
