# Use the official Node.js image as the base image
FROM node:18

# Install git and curl
RUN apt-get update && apt-get install -y git curl

# Set the working directory in the container
WORKDIR /workspace

# Copy the entire project to the container
COPY . .

# Install dependencies from the root folder
RUN npm install

# Install server dependencies
WORKDIR /workspace/server
RUN npm install

# Install client dependencies
WORKDIR /workspace/client
RUN npm install

# Set up environment variables for the client and server
ENV DB_HOST=localhost
ENV DB_USER=serviceaccount
ENV DB_PASSWORD=ServicePassword10
ENV DB_NAME=testdb
ENV REACT_APP_API_URL=http://localhost:5000

# Expose the ports for the server and client
EXPOSE 3000 5000
