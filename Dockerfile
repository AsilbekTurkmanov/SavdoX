# Stage 1: Build Vite frontend and dependencies
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for Vite build)
RUN npm ci

# Copy source code
COPY . .

# Build Vite frontend static bundle
RUN npm run build

# Stage 2: Production environment
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy server entry file
COPY server.js ./

# Copy built frontend assets from builder stage
COPY --from=builder /app/dist ./dist

# Expose server port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
