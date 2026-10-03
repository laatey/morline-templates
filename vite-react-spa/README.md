# Vite + React SPA

A React single-page app built with Vite and served in production by nginx — not `vite preview`, which isn't meant for production traffic.

## What's inside

- React 19 + Vite 8 + TypeScript
- Multi-stage Dockerfile: Node builds the static bundle, then a lean `nginx:alpine` serves it
- `nginx/default.conf.template` — uses nginx's built-in `envsubst` templating so the listen port comes from `$PORT` at container start (works with platforms that assign a random port)
- Client-side routing fallback (`try_files ... /index.html`) so React Router / TanStack Router deep links don't 404 on refresh
- `/health` endpoint for platform healthchecks

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | no | `4173` | Injected by the platform; nginx binds to it |
| `VITE_APP_NAME` | no | — | Example client variable — anything prefixed `VITE_` is inlined into the build at build time |

Note: Vite env vars are baked in at **build time**, not read at runtime like a Node server would. If you need runtime configuration (e.g. an API URL that changes per environment without rebuilding), fetch a `/config.json` at app startup instead of relying on `VITE_*` vars.

## Local development

```bash
npm install
npm run dev
```

## Production build (what the Dockerfile runs)

```bash
npm run build   # outputs to dist/
```

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Set any `VITE_*` build-time variables you need.
4. No volume needed — this is a stateless static site.

## Notes

`railway.json` is included for compatibility with Railway's config-as-code format. If your own platform reads a different schema, treat it as a reference.
