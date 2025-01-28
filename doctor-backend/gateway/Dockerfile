# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files to the working directory
COPY package*.json ./

# Install only production dependencies for a lighter image
RUN npm install --production

# Copy the remaining source code into the container
COPY . .

# Expose the gateway port (default: 8080)
EXPOSE 8080

# Create a non-root user for security
RUN useradd --user-group --create-home --shell /bin/false appuser

# Change ownership of the working directory to the non-root user
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Add a healthcheck to monitor gateway health
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost:8080/health || exit 1

# Start the gateway
CMD ["node", "index.js"]
