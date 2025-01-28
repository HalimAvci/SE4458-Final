# Use an official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package files to the working directory
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the remaining source code into the container
COPY . .

# Ensure scripts (if any) are executable
RUN chmod +x ./scripts/*.sh || true

# Expose the port the backend runs on
EXPOSE 5001

# Create a non-root user for security purposes
RUN useradd --user-group --create-home --shell /bin/false appuser

# Change ownership of the working directory to the non-root user
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Add a healthcheck to ensure the backend is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 CMD curl -f http://localhost:5001/health || exit 1

# Start the backend server
CMD ["npm", "start"]
