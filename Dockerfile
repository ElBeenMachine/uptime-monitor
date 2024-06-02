FROM node:18-alpine AS base

WORKDIR /app

# **********
# deps stage
# **********
FROM base AS deps

# Update NPM
RUN npm install -g npm@latest

# Copy package.json to /app
COPY package.json ./

# Copy available lock file
COPY package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN npm ci

# Create volume and set permissions
RUN mkdir -p /data/db
VOLUME /data/db

# Disable the telementary
ENV NEXT_TELEMETRY_DISABLED 1

# ***********
# inter stage
# **********
FROM deps AS inter

# Copy all other files excluding the ones in .dockerignore
COPY . .

# exposing the port
EXPOSE 3000

# **********
# prod stage
# **********
FROM inter AS prod

# Healthcheck
HEALTHCHECK CMD curl --silent http://localhost:3000

RUN npm run build

# Remove the empty database file
RUN rm -rf /data/db/*

CMD ["npm", "start"]