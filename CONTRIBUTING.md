# Contributing to GitHub Slideshow

Thank you for your interest in contributing to the GitHub Slideshow project! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. **Fork the repository** (if you're an external contributor)
2. **Clone your fork locally**
   ```bash
   git clone <your-fork-url>
   cd github-slideshow
   ```
3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style

- **JavaScript**: Follow ES6+ standards
- **Indentation**: Use 2 spaces for indentation
- **Naming**: Use camelCase for variables and functions
- **Comments**: Write clear, concise comments for complex logic

### Backend Development

- Keep API endpoints RESTful
- Validate all input data
- Handle errors gracefully
- Use appropriate HTTP status codes
- Document new endpoints in README.md

### Frontend Development

- Write semantic HTML
- Use CSS classes for styling (avoid inline styles)
- Ensure responsive design
- Test across different browsers
- Keep JavaScript modular and maintainable

### Docker

- Test Docker builds locally before committing
- Keep Dockerfile efficient (minimize layers)
- Update docker-compose.yml if adding new services

## 🧪 Testing

Before submitting a pull request:

1. **Test Backend**
   ```bash
   cd backend
   npm test
   ```

2. **Test Frontend**
   ```bash
   cd frontend
   npm test
   ```

3. **Test Docker Setup**
   ```bash
   docker-compose up --build
   # Verify all services start correctly
   docker-compose down
   ```

4. **Manual Testing**
   - Test all API endpoints
   - Test frontend UI interactions
   - Test integration between frontend and backend

## 📋 Pull Request Process

1. **Update documentation** if you've made changes to:
   - API endpoints
   - Configuration
   - Installation process
   - Usage instructions

2. **Write a clear PR description**
   - What changes were made
   - Why the changes were necessary
   - How to test the changes

3. **Ensure all checks pass**
   - Code builds successfully
   - Tests pass
   - No linting errors

4. **Wait for review**
   - Address any feedback
   - Make requested changes
   - Keep commits focused and atomic

## 🐛 Reporting Bugs

If you find a bug, please create an issue with:

- **Clear title**: Brief description of the issue
- **Description**: Detailed explanation
- **Steps to reproduce**: How to trigger the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, Node version, Docker version, etc.
- **Screenshots**: If applicable

## 💡 Suggesting Features

For feature requests, please create an issue with:

- **Clear title**: Feature name
- **Use case**: Why this feature is needed
- **Proposed solution**: How it should work
- **Alternatives**: Other solutions considered

## 📁 Project Structure

```
github-slideshow/
├── backend/              # Backend API code
│   ├── server.js        # Main server file
│   ├── package.json     # Dependencies
│   └── Dockerfile       # Backend container config
├── frontend/            # Frontend application
│   ├── index.html      # Main HTML
│   ├── app.js          # Application logic
│   ├── style.css       # Styles
│   └── Dockerfile      # Frontend container config
├── docker-compose.yml  # Docker orchestration
├── README.md           # Main documentation
└── CONTRIBUTING.md     # This file
```

## 🔐 Security

If you discover a security vulnerability:

1. **DO NOT** create a public issue
2. Email the maintainers directly
3. Provide detailed information about the vulnerability
4. Wait for confirmation before disclosing publicly

## 📜 Code of Conduct

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards other contributors

## ❓ Questions?

If you have questions:

1. Check the README.md first
2. Search existing issues
3. Create a new issue with the "question" label

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to GitHub Slideshow! 🎉
