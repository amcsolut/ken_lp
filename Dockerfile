# Use Node.js LTS version
FROM node:18-alpine

# Install wget for health check (antes de mudar para usuário não-root)
RUN apk add --no-cache wget

# Set working directory
WORKDIR /app

# Copy package.json first
COPY package.json ./

# Install dependencies (will generate package-lock.json if not present)
RUN npm install --omit=dev --ignore-scripts && \
    npm cache clean --force && \
    rm -rf /tmp/*

# Copy application files
COPY . .

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port (será sobrescrito pela variável PORT do Easypanel)
# O Easypanel mapeia a porta externa para a porta interna via variável PORT
EXPOSE 80

# Set environment to production
ENV NODE_ENV=production

# Health check usando endpoint /health
# Usa wget para verificar se o servidor está respondendo
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider --timeout=5 http://localhost:80/health || exit 1

# Start the application
CMD ["node", "server.js"]

