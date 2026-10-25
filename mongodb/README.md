# MongoDB

Document-oriented NoSQL database for flexible, JSON-style schemas.

## What's inside

- `mongo:8` official image
- `init/` — any `.js` or `.sh` file placed here runs once, on first boot, against `MONGO_INITDB_DATABASE`
- Healthcheck via `mongosh`'s `ping` admin command

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `MONGO_INITDB_ROOT_USERNAME` | yes | — | Root admin username |
| `MONGO_INITDB_ROOT_PASSWORD` | yes | — | Root admin password |
| `MONGO_INITDB_DATABASE` | no | — | Database created and seeded on first boot |

## Persistent storage

Mount a volume at:

```
/data/db
```

## Connecting

```
mongodb://<MONGO_INITDB_ROOT_USERNAME>:<MONGO_INITDB_ROOT_PASSWORD>@<host>:27017/<database>?authSource=admin
```

Note the `authSource=admin` — required because the user lives in the `admin` database, not the target one.

## Local development

```bash
cp .env.example .env
docker build -t mongodb-template .
docker run --env-file .env -p 27017:27017 -v mongodata:/data/db mongodb-template
```

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Set the environment variables above.
4. Attach a persistent volume at `/data/db`.
