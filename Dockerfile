FROM node:18-alpine AS base

WORKDIR /app

# **********
# deps stage
# **********
FROM base AS deps

# Copy package.json to /app
COPY package.json ./

# Copy available lock file (prioritize yarn.lock)
COPY yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies according to yarn.lock (if present)
RUN yarn install --frozen

# Create volume and set permissions
RUN mkdir -p /data/db && chown -R node:node /data/db
VOLUME /data/db

# Set the user
USER node

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

RUN yarn build

CMD ["yarn", "start"]

# **********
# dev stage
# **********
FROM inter AS dev

CMD ["yarn", "run", "dev"]