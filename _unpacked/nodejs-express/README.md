# Node.js Express

Fast, unopinionated, minimalist web framework — the default choice for a Node API when you don't need anything more opinionated.

## What's inside

- Express **5** (the current major — routing internals changed from `path-to-regexp` v6, so wildcard patterns like `app.get('/files/*')` now need `app.get('/files/*splat')`; simple routes are unaffected)
- CORS pre-wired and configurable via env
- `/health` endpoint for platform healthchecks

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | no | `3000` | Usually injected by the platform |
| `CORS_ORIGINS` | no | `*` | Comma-separated list of allowed origins |

## Local development

```bash
npm install
npm run dev
```

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Set any environment variables your app needs.
4. No volume needed — this is a stateless API. Point it at one of the database templates for persistence.

## Notes

`railway.json` is included for compatibility with Railway's config-as-code format — treat it as a reference if your own platform reads a different schema.
