# Strapi Headless CMS

Self-hosted headless CMS with an admin panel, auto-generated REST and GraphQL(-able) APIs from your content types, role-based permissions, and media management.

This is a real project generated with Strapi's own `create-strapi` CLI (v5.51.2, JavaScript variant) — not a hand-rolled approximation — so `config/*.js` matches what Strapi itself ships, and it stays a normal Strapi project you can extend with the CLI (`npx strapi generate`) exactly as documented.

Strapi doesn't publish an official Docker image, so the `Dockerfile` here is a standard community-pattern multi-stage build: install + build the admin panel in one stage, copy only what's needed to run into a lean `node:22-slim` runtime stage.

## What's inside

- Strapi 5.51.2, JavaScript, SQLite by default
- `config/` — server, database, admin, middleware, plugin config, all reading from environment variables
- `src/index.js` — the register/bootstrap hooks, empty and ready for your logic
- Multi-stage Dockerfile using `node:22-slim` (Debian, not Alpine) — Strapi's own docs recommend this so `sharp` (used for image processing) gets prebuilt binaries instead of compiling `libvips` from source
- Healthcheck against Strapi's built-in `/_health` endpoint

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `HOST` | no (defaults `0.0.0.0`) | Bind address |
| `PORT` | no (defaults `1337`) | Usually injected by the platform |
| `APP_KEYS` | **yes** | Comma-separated list of random strings, used to sign session cookies |
| `API_TOKEN_SALT` | **yes** | Salt for generated API tokens |
| `ADMIN_JWT_SECRET` | **yes** | Signs admin panel auth JWTs |
| `TRANSFER_TOKEN_SALT` | **yes** | Salt for data transfer tokens |
| `JWT_SECRET` | **yes** | Signs end-user (Users & Permissions plugin) auth JWTs |
| `ENCRYPTION_KEY` | **yes** | Encrypts sensitive config values at rest |
| `DATABASE_CLIENT` | no (defaults `sqlite`) | `sqlite`, `postgres`, or `mysql` |
| `DATABASE_HOST` / `DATABASE_PORT` / `DATABASE_NAME` / `DATABASE_USERNAME` / `DATABASE_PASSWORD` / `DATABASE_SSL` | if not sqlite | Connection details — point at the `postgresql` template in this same set |

Generate the five secrets with something like:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run it five times for `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, and twice more (comma-joined) for `APP_KEYS`.

## Persistent storage

If you stick with the default SQLite database, mount a volume at:

```
/app/.tmp
```

Either way, mount a volume at:

```
/app/public/uploads
```

for locally-stored media uploads — or better, configure Strapi's [upload provider plugin](https://docs.strapi.io/cms/plugins/providers) to use S3-compatible object storage instead, which is what Strapi recommends once you're running more than one instance or care about upload durability.

For real workloads, switch to Postgres via the `DATABASE_*` variables above rather than relying on SQLite + a volume.

## Local development

```bash
cp .env.example .env
# fill in the secrets above
npm install
npm run develop
```

Visit `http://localhost:1337/admin` to create your first admin account.

## An important production detail

Strapi's Content-Type Builder (the UI for adding/editing content models) is **disabled when `NODE_ENV=production`**, which this Dockerfile sets. Design your content types locally with `npm run develop`, commit the generated schema files under `src/api/`, then deploy — don't expect to model content directly against a production deploy.

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Set the six required secrets above at minimum.
4. Attach a volume (see **Persistent storage**) or switch to Postgres + S3-compatible storage.

## Notes

`railway.json` is included for compatibility with Railway's config-as-code format — treat it as a reference if your own platform reads a different schema.
