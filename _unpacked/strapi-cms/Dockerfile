# syntax=docker/dockerfile:1

FROM node:22-slim AS builder

# python3/make/g++ for native modules (better-sqlite3); git for some
# package postinstall steps. node:*-slim (Debian) is used deliberately —
# Strapi's own docs recommend it over -alpine so Sharp can use prebuilt
# binaries instead of compiling libvips from source.
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build

FROM node:22-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/jsconfig.json ./jsconfig.json
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/config ./config
COPY --from=builder /app/database ./database
COPY --from=builder /app/favicon.png ./favicon.png

EXPOSE 1337

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=5 \
  CMD node -e "require('http').get('http://127.0.0.1:' + (process.env.PORT || 1337) + '/_health', r => process.exit(r.statusCode === 204 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["npm", "run", "start"]
