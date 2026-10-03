FROM redis:8-alpine

LABEL org.opencontainers.image.title="Redis Cache Template" \
      org.opencontainers.image.description="High-performance in-memory cache, store, and message broker" \
      template.category="cache"

COPY redis.conf /usr/local/etc/redis/redis.conf

EXPOSE 6379

HEALTHCHECK --interval=10s --timeout=3s --retries=5 \
  CMD redis-cli -a "$REDIS_PASSWORD" --no-auth-warning ping | grep -q PONG || exit 1

# REDIS_PASSWORD is required. maxmemory / eviction policy are configurable
# via env with sane production defaults.
CMD ["sh", "-c", "redis-server /usr/local/etc/redis/redis.conf \
  --requirepass \"$REDIS_PASSWORD\" \
  --maxmemory \"${REDIS_MAXMEMORY:-256mb}\" \
  --maxmemory-policy \"${REDIS_MAXMEMORY_POLICY:-allkeys-lru}\""]
