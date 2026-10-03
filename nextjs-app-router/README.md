# Next.js 14 App Router

Full-stack React framework with the App Router, server-side rendering, and API routes — built with Next.js's `output: "standalone"` mode so the production image only ships the files it actually needs to run.

## What's inside

- Next.js **14.2.35** on React 18, TypeScript, App Router (`app/`)
- `app/api/health/route.ts` — a health endpoint your platform can poll
- Multi-stage Dockerfile: install → build → minimal standalone runtime image
- A starting page styled to a dark, minimal aesthetic — replace freely

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | no | `3000` | Usually injected by the platform |
| `NEXT_PUBLIC_APP_NAME` | no | — | Example client-exposed variable (anything prefixed `NEXT_PUBLIC_` is bundled into the browser build) |

Add your own server-only variables (database URLs, API keys) without the `NEXT_PUBLIC_` prefix — those stay server-side.

## Local development

```bash
npm install
npm run dev
```

## Production build (what the Dockerfile runs)

```bash
npm run build
PORT=3000 node .next/standalone/server.js
```

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Set any environment variables your app needs.
4. No volume needed — this is a stateless web service. Point it at one of the database templates for persistence.

## Notes

- Pinned to Next.js 14 (not 15/16) since that's what this template targets. Bump the version in `package.json` yourself if you want to track newer releases — App Router usage is stable across versions, but check the [upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading) for breaking changes first.
- `railway.json` is included for compatibility with Railway's config-as-code format. If your own platform reads a different schema, treat it as a reference.
