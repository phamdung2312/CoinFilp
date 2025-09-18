# Simple Dockerfile for Next.js app (no Prisma, no Sonar)
FROM node:18-slim AS builder
WORKDIR /app
COPY . .
RUN npm install --force && npm run build

FROM node:18-slim
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000
CMD ["npm", "start"]