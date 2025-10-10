# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including http-server)
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
