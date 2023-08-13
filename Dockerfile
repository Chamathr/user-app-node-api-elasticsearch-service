# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install OpenSSL
# RUN apk add --update openssl
RUN apk add --update --no-cache openssl1.1-compat

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Set an environment variable for the RabbitMQ server host and mysql server host
ENV RABBITMQ_HOST=host.docker.internal
ENV ELASTICSEARCH_HOST=host.docker.internal


# Expose port 7000
EXPOSE 7000

# Start the application
CMD ["npm", "run", "start"]
