# ---------- Build stage ----------
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Install ALL deps (dev + prod) for building
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Build
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

# ---------- Runtime stage ----------
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only prod deps
COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

# Bring compiled code
COPY --from=builder /app/dist ./dist

# App port
ENV PORT=5000
EXPOSE 5000

CMD ["node", "dist/main.js"]
