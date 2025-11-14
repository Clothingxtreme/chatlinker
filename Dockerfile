# ---------- Build stage ----------
FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY tsconfig*.json ./
COPY src ./src
RUN npm run build    # runs: tsc -p tsconfig.build.json

RUN npm prune --omit=dev

# ---------- Runtime stage ----------
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/main.js"]
