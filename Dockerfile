# Use specific version of node for predictability
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
# users: --production if for prod, but stick to ci/install for general usage initially
RUN npm install

# Copy application source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Use array syntax for CMD to handle signals correctly
CMD ["npm", "start"]
