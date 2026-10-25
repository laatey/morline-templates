# morline-templates

Ready-to-deploy service templates used by [Morline](https://morline.space) — one folder per template, each a self-contained project with a `Dockerfile`, environment variable reference, and healthcheck.

## Templates

| # | Folder | Category | Description |
|---|--------|----------|-------------|
| 1 | [`postgresql`](./postgresql) | Database | PostgreSQL 17 with persistent volume |
| 2 | [`mysql`](./mysql) | Database | MySQL 8.4 LTS with persistent volume |
| 3 | [`mongodb`](./mongodb) | Document Store | MongoDB 8 with persistent volume |
| 4 | [`redis-cache`](./redis-cache) | Cache | Redis 8 (see README for Valkey note) |
| 5 | [`pocketbase-sqlite`](./pocketbase-sqlite) | Embedded DB | PocketBase with SQLite persistence |
| 6 | [`nodejs-express`](./nodejs-express) | Backend API | Node.js + Express REST API |
| 7 | [`nextjs-app-router`](./nextjs-app-router) | Web Framework | Next.js 14 App Router |
| 8 | [`vite-react-spa`](./vite-react-spa) | Frontend | Vite + React SPA served via Nginx |
| 9 | [`python-fastapi`](./python-fastapi) | Backend API | Python FastAPI with Uvicorn |
| 10 | [`go-fiber`](./go-fiber) | Microservice | Go Fiber v3 |
| 11 | [`rust-axum`](./rust-axum) | Microservice | Rust Axum |
| 12 | [`n8n-automation`](./n8n-automation) | Automation | n8n workflow automation |
| 13 | [`metabase-analytics`](./metabase-analytics) | Analytics | Metabase BI |
| 14 | [`strapi-cms`](./strapi-cms) | CMS | Strapi 5 headless CMS |

## What's consistent across every template

- **`PORT` env var** — every web-facing service reads its listen port from `$PORT` with a local-dev fallback. Databases use their standard fixed ports (reached over private networking, not the public web).
- **`HEALTHCHECK`** — every Dockerfile declares a healthcheck so the platform knows when the service is genuinely ready, not just running.
- **`.env.example`** — copy to `.env` for local dev; use it as the reference list of variables to configure in the Morline dashboard.
- **Volume paths documented** — every stateful service's README states the exact container path to mount a persistent volume at.

## Using with Morline

1. Connect your GitHub account in **Settings → Integrations**
2. Fork or push a template folder to your own repo
3. Create a new service in Morline and connect the repo
4. Set the required env vars from `.env.example` in the service **Settings → Variables**
5. Deploy

## Version pins

Postgres 17 · MySQL 8.4 LTS · MongoDB 8 · Redis 8 · Next.js 14 · Fiber v3 · Strapi 5 · Metabase latest. Bump any version in the `Dockerfile` as needed — nothing is pinned in a way that's hard to change.
