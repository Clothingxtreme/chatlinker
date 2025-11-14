# ---------- Build stage ----------
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# 1) Install deps (dev + prod) once
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 2) Build TS -> JS
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

# 3) Remove dev deps so the final image is lean
RUN npm prune --omit=dev

# ---------- Runtime stage ----------
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

# Copy pruned production deps and compiled code
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/main.js"]
