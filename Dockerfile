# ---------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Install build deps first
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY tsconfig*.json ./
COPY src ./src
COPY .env.example ./.env.example
RUN npm run build

# ---------- Runtime stage ----------
FROM node:20-alpine AS runner
WORKDIR /app

# Only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built dist and any runtime assets
COPY --from=builder /app/dist ./dist

# Expose Nest port
ENV PORT=5000
EXPOSE 5000

# Health path for Northflank
ENV HEALTHCHECK_PATH=/api/health

# Start the server
CMD ["node", "dist/main.js"]
