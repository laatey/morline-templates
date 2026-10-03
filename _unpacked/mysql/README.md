# MySQL Database

Open-source relational database, running the 8.4 LTS release track (Oracle's long-term-support line, supported into the early 2030s — the safer pin for a template versus the shorter-lived 9.x Innovation releases).

## What's inside

- `mysql:8.4` official image
- `init/` — any `.sql`, `.sql.gz`, or `.sh` file placed here runs once, on first boot, against a fresh database
- Healthcheck via `mysqladmin ping`

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `MYSQL_ROOT_PASSWORD` | yes | — | Root superuser password |
| `MYSQL_DATABASE` | yes | — | Database created on first boot |
| `MYSQL_USER` | yes | — | Non-root application user, created with access to `MYSQL_DATABASE` |
| `MYSQL_PASSWORD` | yes | — | Password for `MYSQL_USER` |

## Persistent storage

Mount a volume at:

```
/var/lib/mysql
```

## Connecting

```
mysql://<MYSQL_USER>:<MYSQL_PASSWORD>@<host>:3306/<MYSQL_DATABASE>
```

Use `MYSQL_USER`/`MYSQL_PASSWORD` for application connections rather than root — standard practice, and most ORMs assume it.

## Local development

```bash
cp .env.example .env
docker build -t mysql-template .
docker run --env-file .env -p 3306:3306 -v mysqldata:/var/lib/mysql mysql-template
```

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Set the environment variables above.
4. Attach a persistent volume at `/var/lib/mysql`.
