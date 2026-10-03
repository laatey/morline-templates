# Deploy template repos — setup guide

14 standalone service templates, one per zip, each a complete, independent project — a `Dockerfile`, a `railway.json` (config-as-code reference, adjust the schema to match your own platform), a `README.md` with the environment variables and volume paths that actually matter, and `.env.example`.

| # | Template | Folder | Category |
|---|---|---|---|
| 1 | PostgreSQL | `postgresql` | Database |
| 2 | Redis Cache | `redis-cache` | Cache & Queue |
| 3 | MySQL | `mysql` | Database |
| 4 | MongoDB | `mongodb` | Document Store |
| 5 | PocketBase / SQLite | `pocketbase-sqlite` | Embedded DB |
| 6 | Next.js 14 App Router | `nextjs-app-router` | Web Framework |
| 7 | Vite + React SPA | `vite-react-spa` | Frontend |
| 8 | Python FastAPI | `python-fastapi` | Backend API |
| 9 | Go Fiber Service | `go-fiber` | Microservice |
| 10 | Rust Axum API | `rust-axum` | Microservice |
| 11 | Node.js Express | `nodejs-express` | Backend API |
| 12 | n8n Workflow Automation | `n8n-automation` | Automation |
| 13 | Metabase BI Analytics | `metabase-analytics` | Analytics |
| 14 | Strapi Headless CMS | `strapi-cms` | CMS |

## Pushing each one to its own GitHub repo

For every template, unzip it, then from inside that folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:<your-org>/<repo-name>.git
git push -u origin main
```

To do this for all 14 without repeating the GitHub UI 14 times, create the repos in one shot with the [GitHub CLI](https://cli.github.com/) instead:

```bash
gh repo create <your-org>/<repo-name> --public --source=. --remote=origin --push
```

Run that from inside each unzipped folder and it creates the repo and pushes in one step.

## What's deliberately consistent across all 14

- **`PORT` handling.** Every web-facing service (frameworks, PocketBase, n8n, Metabase, Strapi) reads its listen port from `$PORT` with a sensible local-dev fallback, since most platforms — including the one you're building — assign a port at deploy time rather than letting the service hardcode one. Databases (Postgres, MySQL, MongoDB, Redis) use their fixed standard ports instead, since those are reached over a private network rather than the public web.
- **Healthchecks.** Every Dockerfile has a `HEALTHCHECK` instruction, so "the container is running" and "the service is actually ready for traffic" aren't conflated — matters most for databases and JVM-based services like Metabase, which take real time to become ready after the process starts.
- **`.env.example`.** Copy it to `.env` and fill in real values for local development; it also doubles as the list of variables to configure in your platform's UI.
- **`railway.json`.** Included in every template for compatibility with Railway's own config-as-code format (`builder`, `dockerfilePath`, `healthcheckPath`, `restartPolicy`, etc.). Since you're building your own platform, treat these as a reference for the fields that matter (build source, healthcheck path, restart behavior) rather than a schema to match exactly — swap in whatever your own deploy config format looks like.
- **Volumes are documented, not assumed.** Every database and stateful service's README states the exact path to mount a persistent volume at. None of this is wired into `railway.json` because volume provisioning is normally a platform-level concern (handled via dashboard/API/CLI), not something baked into the app's own config file — yours will have its own mechanism for this.

## Version pins

Versions were checked against current releases at the time this was generated (not memorized/potentially stale defaults) — Postgres 18, MySQL 8.4 LTS, MongoDB 8, Redis 8 (AGPLv3 licensed as of the 8.0 release — see the `redis-cache` README for the Valkey alternative if that matters for a commercial platform), Next.js 14.2.35 (pinned to major 14 per your original spec, not bumped to 15/16), Fiber v3.4.0, Strapi 5.51.2. Bump any of these yourself as needed — nothing here is pinned in a way that's hard to change.
