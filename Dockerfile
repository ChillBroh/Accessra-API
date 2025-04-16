# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code and env files
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start:prod"] 