# ── Build stage ──────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps first (cached layer)
COPY package*.json ./
RUN npm ci --no-audit

# Build-time env vars (Vite bakes these into the bundle)
ARG VITE_FB_ACCESS_TOKEN
ENV VITE_FB_ACCESS_TOKEN=$VITE_FB_ACCESS_TOKEN

COPY . .
RUN npm run build

# ── Serve stage ───────────────────────────────────────────────
FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8086
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:8086/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
