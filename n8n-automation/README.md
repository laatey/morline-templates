# n8n Workflow Automation

Self-hosted, node-based workflow automation — connect APIs, run scheduled jobs, build webhooks, orchestrate AI agent chains, all through a visual editor.

## What's inside

- Official `n8nio/n8n` image
- Boots with `N8N_PORT` mapped from the platform's injected `PORT`, so it works regardless of which port your platform assigns

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `N8N_BASIC_AUTH_ACTIVE` | recommended | — | Set `true` to password-protect the editor UI |
| `N8N_BASIC_AUTH_USER` / `N8N_BASIC_AUTH_PASSWORD` | if auth active | — | Editor UI credentials |
| `WEBHOOK_URL` | yes, for webhooks | — | Public URL n8n uses when generating webhook links |
| `N8N_ENCRYPTION_KEY` | strongly recommended | random per-boot | Encrypts stored credentials at rest — set this explicitly and keep it stable, or every restart invalidates previously saved credentials |
| `GENERIC_TIMEZONE` | no | `UTC` | Timezone used for scheduled workflows |
| `DB_TYPE`, `DB_POSTGRESDB_*` | no | SQLite | Point at an external Postgres database (e.g. the `postgresql` template in this same set) instead of embedded SQLite — recommended once you're running real workloads |

## Persistent storage

Mount a volume at:

```
/home/node/.n8n
```

This holds the SQLite database (if not using external Postgres), encryption key, and workflow data. Without it, everything resets on redeploy.

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Set `N8N_ENCRYPTION_KEY` and basic auth at minimum.
4. Attach a persistent volume at `/home/node/.n8n`.
5. For anything beyond light personal use, switch the database to Postgres via the `DB_*` variables — SQLite under concurrent workflow executions is the most common n8n self-host bottleneck.

## Notes

`railway.json` is included for compatibility with Railway's config-as-code format — treat it as a reference if your own platform reads a different schema.
