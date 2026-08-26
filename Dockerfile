# syntax=docker/dockerfile:1
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies first for better layer caching.
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy application source.
COPY . .

# Runtime data is written here by the app.
RUN mkdir -p /app/data && chown -R node:node /app
USER node

EXPOSE 3000

CMD ["node", "server.js"]
