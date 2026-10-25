# PocketBase / SQLite

Single-binary backend: embedded SQLite database, realtime subscriptions, file storage, auth, and an admin UI — no separate database service to run alongside it.

## What's inside

- Downloads the latest PocketBase release from GitHub at build time (pin `PB_VERSION` as a build arg for reproducible builds, e.g. `v0.39.10`)
- `entrypoint.sh` optionally upserts a superuser account from env vars on every boot, then starts the server
- Healthcheck against PocketBase's built-in `/api/health` endpoint

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | no | `8090` | Usually injected by the platform |
| `PB_ADMIN_EMAIL` | no | — | If set with `PB_ADMIN_PASSWORD`, creates/updates the superuser account on boot |
| `PB_ADMIN_PASSWORD` | no | — | Min. 10 characters (PocketBase's own requirement) |

Without `PB_ADMIN_EMAIL`/`PB_ADMIN_PASSWORD`, PocketBase prints a one-time setup link to the container logs on first boot instead — check your platform's log viewer for it.

## Persistent storage

Mount a volume at:

```
/pb/pb_data
```

This holds the SQLite database file, uploaded files, and logs. Without it, everything resets on redeploy.

## Admin UI

Once deployed: `https://<your-domain>/_/`

## Local development

```bash
cp .env.example .env
docker build -t pocketbase-template .
docker run --env-file .env -p 8090:8090 -v pbdata:/pb/pb_data pocketbase-template
```

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Optionally set `PB_ADMIN_EMAIL` / `PB_ADMIN_PASSWORD`.
4. Attach a persistent volume at `/pb/pb_data`.
5. To extend PocketBase (custom API routes, hooks), add a `pb_hooks/` directory to this repo and `COPY` it into the image next to `pb_data`.
