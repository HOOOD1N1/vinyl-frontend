# Stage 1: Build the React application
FROM node:latest AS build

# Set the working directory
WORKDIR /VINYL-FRONTEND

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code into the image
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

COPY ngnix.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the build stage
COPY --from=build /VINYL-FRONTEND/dist /usr/share/nginx/html

# Expose the port Nginx is listening on
EXPOSE 8080

# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]