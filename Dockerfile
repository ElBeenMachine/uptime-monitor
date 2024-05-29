# Build stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
COPY . .
RUN npm ci
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./

# Create volume and set permissions
RUN mkdir -p /data/db && chown -R node:node /data/db
VOLUME /data/db

# Set the user
USER node

EXPOSE 3000

CMD ["npm", "start"]