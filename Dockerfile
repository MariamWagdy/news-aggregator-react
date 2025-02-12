# Use the same Node.js version as your local machine
FROM node:16.20.2-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Run a "touch" command to force Docker to detect package.json changes
RUN touch package.json

# Ensure npm matches the exact local version (8.19.4)
RUN npm install -g npm@8.19.4

# Clear npm cache before installing dependencies
RUN npm cache clean --force

# Install dependencies using legacy peer deps
RUN npm install --legacy-peer-deps

# Copy the full project
COPY . .

# Expose port 3000 for React
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
