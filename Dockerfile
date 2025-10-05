FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# ====================================
# Etapa de producción
# ====================================
FROM node:22-alpine AS production

WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copiar dependencias desde builder
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

# Crear directorio para avatars
RUN mkdir -p /app/public/avatars && \
    chown -R nestjs:nodejs /app/public

# Cambiar a usuario no-root
USER nestjs

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/main.js"]