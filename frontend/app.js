// API Configuration
const API_URL = 'http://localhost:3000/api';

// State
let slides = [];
let currentSlideIndex = 0;

// DOM Elements
const slidesList = document.getElementById('slidesList');
const slideViewer = document.getElementById('slideViewer');
const currentSlide = document.getElementById('currentSlide');
const slideCounter = document.getElementById('slideCounter');
const addSlideModal = document.getElementById('addSlideModal');
const addSlideForm = document.getElementById('addSlideForm');

// Event Listeners
document.getElementById('refreshBtn').addEventListener('click', loadSlides);
document.getElementById('addBtn').addEventListener('click', () => {
    addSlideModal.classList.add('active');
});
document.getElementById('closeViewer').addEventListener('click', closeViewer);
document.getElementById('prevBtn').addEventListener('click', showPreviousSlide);
document.getElementById('nextBtn').addEventListener('click', showNextSlide);

// Modal close
document.querySelector('.close').addEventListener('click', () => {
    addSlideModal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === addSlideModal) {
        addSlideModal.classList.remove('active');
    }
});

// Form submission
addSlideForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('slideTitle').value;
    const content = document.getElementById('slideContent').value;
    const order = document.getElementById('slideOrder').value;

    await addSlide({ title, content, order: order || undefined });
    
    addSlideForm.reset();
    addSlideModal.classList.remove('active');
});

// Functions
async function loadSlides() {
    try {
        slidesList.innerHTML = '<div class="loading">Loading slides...</div>';
        
        const response = await fetch(`${API_URL}/slides`);
        const data = await response.json();
        
        if (data.success) {
            slides = data.data;
            displaySlides();
        } else {
            throw new Error('Failed to load slides');
        }
    } catch (error) {
        console.error('Error loading slides:', error);
        slidesList.innerHTML = `
            <div class="error">
                Failed to load slides. Make sure the backend server is running on ${API_URL}
            </div>
        `;
    }
}

function displaySlides() {
    if (slides.length === 0) {
        slidesList.innerHTML = '<div class="loading">No slides available. Add your first slide!</div>';
        return;
    }

    slidesList.innerHTML = slides.map((slide, index) => `
        <div class="slide-card" onclick="viewSlide(${index})">
            <h3>${escapeHtml(slide.title)}</h3>
            <p>${escapeHtml(slide.content)}</p>
            <div class="slide-card-actions">
                <button class="btn btn-danger" onclick="deleteSlide(event, ${slide.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function viewSlide(index) {
    currentSlideIndex = index;
    updateSlideViewer();
    slideViewer.classList.add('active');
}

function updateSlideViewer() {
    const slide = slides[currentSlideIndex];
    if (slide) {
        currentSlide.innerHTML = `
            <h3>${escapeHtml(slide.title)}</h3>
            <p>${escapeHtml(slide.content)}</p>
        `;
        slideCounter.textContent = `Slide ${currentSlideIndex + 1} of ${slides.length}`;
    }
}

function closeViewer() {
    slideViewer.classList.remove('active');
}

function showPreviousSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlideViewer();
    }
}

function showNextSlide() {
    if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        updateSlideViewer();
    }
}

async function addSlide(slideData) {
    try {
        const response = await fetch(`${API_URL}/slides`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(slideData)
        });

        const data = await response.json();
        
        if (data.success) {
            await loadSlides();
        } else {
            alert('Failed to add slide');
        }
    } catch (error) {
        console.error('Error adding slide:', error);
        alert('Failed to add slide. Make sure the backend server is running.');
    }
}

async function deleteSlide(event, slideId) {
    event.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this slide?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/slides/${slideId}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        
        if (data.success) {
            await loadSlides();
        } else {
            alert('Failed to delete slide');
        }
    } catch (error) {
        console.error('Error deleting slide:', error);
        alert('Failed to delete slide. Make sure the backend server is running.');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (slideViewer.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            showPreviousSlide();
        } else if (e.key === 'ArrowRight') {
            showNextSlide();
        } else if (e.key === 'Escape') {
            closeViewer();
        }
    }
});

// Load slides on page load
loadSlides();
