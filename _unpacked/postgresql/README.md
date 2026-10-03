# PostgreSQL

Production-ready PostgreSQL 18 relational database with persistent storage, packaged as a single Dockerfile so it can be deployed to any container platform with one click.

## What's inside

- `postgres:18-alpine` — small image, fast cold starts
- `init/` — any `.sql`, `.sql.gz`, or `.sh` file placed here runs once, on first boot, against a fresh database
- A container healthcheck (`pg_isready`) so your platform knows when the database is actually ready for connections, not just "container running"

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `POSTGRES_USER` | yes | — | Superuser username created on first boot |
| `POSTGRES_PASSWORD` | yes | — | Superuser password |
| `POSTGRES_DB` | yes | — | Database created on first boot |
| `PGDATA` | no | `/var/lib/postgresql/data/pgdata` | Where data files live inside the container |

## Persistent storage

Mount a volume at:

```
/var/lib/postgresql/data
```

Without this, all data is lost when the container restarts or redeploys. This is the one setting that matters most for a database template — make sure your platform's deploy config actually attaches a volume here before calling this "production-ready."

## Connecting

```
postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<host>:5432/<POSTGRES_DB>
```

Internally, other services on the same private network can usually reach this by service name instead of a public host — check how your platform exposes internal DNS for sibling services.

## Local development

```bash
cp .env.example .env
docker build -t postgresql-template .
docker run --env-file .env -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgresql-template
```

## Deploying

1. Push this repo to GitHub.
2. Point your platform's "Deploy from repo" at it — it will detect the `Dockerfile` and build directly.
3. Set the environment variables above.
4. Attach a persistent volume at `/var/lib/postgresql/data`.

`railway.json` is included for compatibility with Railway's config-as-code format. If your own platform reads a different schema, treat it as a reference and adjust the field names to match.
