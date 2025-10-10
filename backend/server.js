const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for slides (in production, use a database)
let slides = [
  {
    id: 1,
    title: "Welcome to GitHub",
    content: "Introduction to GitHub and version control",
    order: 1
  },
  {
    id: 2,
    title: "Getting Started",
    content: "Learn the basics of Git and GitHub",
    order: 2
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'GitHub Slideshow API',
    version: '1.0.0',
    endpoints: {
      slides: '/api/slides',
      health: '/api/health'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all slides
app.get('/api/slides', (req, res) => {
  res.json({ 
    success: true, 
    count: slides.length,
    data: slides.sort((a, b) => a.order - b.order)
  });
});

// Get single slide
app.get('/api/slides/:id', (req, res) => {
  const slide = slides.find(s => s.id === parseInt(req.params.id));
  if (!slide) {
    return res.status(404).json({ 
      success: false, 
      error: 'Slide not found' 
    });
  }
  res.json({ success: true, data: slide });
});

// Create new slide
app.post('/api/slides', (req, res) => {
  const { title, content, order } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ 
      success: false, 
      error: 'Title and content are required' 
    });
  }

  const newSlide = {
    id: slides.length > 0 ? Math.max(...slides.map(s => s.id)) + 1 : 1,
    title,
    content,
    order: order || slides.length + 1
  };

  slides.push(newSlide);
  res.status(201).json({ 
    success: true, 
    data: newSlide 
  });
});

// Update slide
app.put('/api/slides/:id', (req, res) => {
  const slideIndex = slides.findIndex(s => s.id === parseInt(req.params.id));
  
  if (slideIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      error: 'Slide not found' 
    });
  }

  const { title, content, order } = req.body;
  const updatedSlide = {
    ...slides[slideIndex],
    title: title || slides[slideIndex].title,
    content: content || slides[slideIndex].content,
    order: order !== undefined ? order : slides[slideIndex].order
  };

  slides[slideIndex] = updatedSlide;
  res.json({ success: true, data: updatedSlide });
});

// Delete slide
app.delete('/api/slides/:id', (req, res) => {
  const slideIndex = slides.findIndex(s => s.id === parseInt(req.params.id));
  
  if (slideIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      error: 'Slide not found' 
    });
  }

  slides.splice(slideIndex, 1);
  res.json({ 
    success: true, 
    message: 'Slide deleted successfully' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/slides`);
});

module.exports = app;
