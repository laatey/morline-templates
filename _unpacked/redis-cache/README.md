# Redis Cache

High-performance in-memory key-value store for caching, session storage, rate limiting, pub/sub, and job queues (e.g. BullMQ, Sidekiq).

## What's inside

- `redis:8-alpine` with append-only persistence (`appendonly yes`) so data survives restarts
- Password auth required by default — the container refuses to start meaningfully without `REDIS_PASSWORD`
- Configurable `maxmemory` and eviction policy via environment variables

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `REDIS_PASSWORD` | yes | — | Auth password, passed as `requirepass` |
| `REDIS_MAXMEMORY` | no | `256mb` | Memory cap before eviction kicks in |
| `REDIS_MAXMEMORY_POLICY` | no | `allkeys-lru` | Eviction policy once `maxmemory` is hit (`allkeys-lru`, `volatile-lru`, `noeviction`, etc.) |

## Licensing note

Redis 8 is licensed under AGPLv3 (Redis returned to open source with the 8.0 release, after the 2024 source-available detour). If AGPL's copyleft terms are a concern for a commercially distributed template, [Valkey](https://valkey.io) is a BSD-3-licensed, drop-in-compatible fork maintained by the Linux Foundation — swapping the base image is a one-line change in the Dockerfile.

## Persistent storage

Mount a volume at:

```
/data
```

This holds the AOF (append-only file) log used for persistence.

## Connecting

```
redis://:<REDIS_PASSWORD>@<host>:6379
```

## Local development

```bash
cp .env.example .env
docker build -t redis-cache-template .
docker run --env-file .env -p 6379:6379 -v redisdata:/data redis-cache-template
```

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Set `REDIS_PASSWORD` at minimum.
4. Attach a persistent volume at `/data` if you need the cache to survive restarts (skip this if you're using Redis purely as an ephemeral cache).
