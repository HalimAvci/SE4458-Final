# React app image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Serve the built app using serve
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build"]
