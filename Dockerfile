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

# Copy available lock file (prioritize yarn.lock)
COPY package-lock.json* pnpm-lock.yaml* ./

# Install dependencies according to yarn.lock (if present)
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
COPY --chown=node:node . .

# exposing the port
EXPOSE 3000

# **********
# prod stage
# **********
FROM inter AS prod

RUN yarn build

CMD ["npm", "start"]

# **********
# dev stage
# **********
FROM inter AS dev

CMD ["npm", "run", "dev"]