# Metabase BI Analytics

Self-hosted business intelligence tool — connect it to your production database(s) and get dashboards, ad-hoc querying (including a no-SQL question builder for non-technical users), and scheduled reports without writing a reporting layer yourself.

## What's inside

- Official `metabase/metabase` image
- Boots with `MB_JETTY_PORT` mapped from the platform's injected `PORT`
- Healthcheck against Metabase's `/api/health` endpoint (allow ~60s start period — JVM cold start is slow)

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `MB_DB_TYPE` | recommended | `h2` (embedded) | Set to `postgres` or `mysql` for Metabase's own application database |
| `MB_DB_HOST` / `MB_DB_PORT` / `MB_DB_DBNAME` / `MB_DB_USER` / `MB_DB_PASS` | if `MB_DB_TYPE` set | — | Connection details for Metabase's application database (its own metadata — separate from the data sources you'll connect to and query afterward) |

Note: these `MB_DB_*` variables configure where **Metabase stores its own settings, dashboards, and users** — not the databases you'll analyze. You add those separately through the admin UI after first login.

## Persistent storage

If you skip `MB_DB_TYPE` and use the default embedded H2 database, mount a volume at:

```
/metabase-data
```

and add `MB_DB_FILE=/metabase-data/metabase.db` to your environment. For anything beyond a quick evaluation, use external Postgres instead (point it at the `postgresql` template in this same set) — H2 doesn't handle concurrent access well and isn't recommended for production by Metabase itself.

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Set the `MB_DB_*` variables to an external Postgres database.
4. First boot takes a minute or two — Metabase runs schema migrations before it starts serving.

## Notes

`railway.json` is included for compatibility with Railway's config-as-code format — treat it as a reference if your own platform reads a different schema.
