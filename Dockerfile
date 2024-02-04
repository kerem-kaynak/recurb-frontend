# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY package-lock.json .

# Install dependencies using npm
RUN npm install

# Copy the client application code into the container
COPY . .

# Build the React Vite project
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Define the command to run your application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
