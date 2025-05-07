FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Start the app
CMD [ "node", "server.js" ]
