# Chatlinker Backend (NestJS + TypeScript)

## Quickstart
```bash
npm i -g @nestjs/cli
npm i
# run postgres + redis (docker examples)
docker run -d --name pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=chatlinker -p 5432:5432 postgres:16
docker run -d --name redis -p 6379:6379 redis:7

cp .env.example .env
npm run start:dev
```
