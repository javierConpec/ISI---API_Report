# 1. Imagen base para build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos todas las dependencias incluyendo devDependencies
RUN npm ci

# Copiamos el código
COPY . .

# Instalamos TypeScript globalmente y compilamos
RUN npm install -g typescript
RUN tsc

# 2. Imagen final para producción
FROM node:20-alpine

WORKDIR /app

# Copiamos solo los archivos compilados y package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalamos solo producción
RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/server.js"]
