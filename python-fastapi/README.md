# Python FastAPI

Modern async Python API framework with automatic OpenAPI docs, request validation via Pydantic, and type hints throughout.

## What's inside

- FastAPI + Uvicorn (with the `standard` extras: uvloop, httptools, websockets)
- CORS middleware pre-wired and configurable via env
- `/health` endpoint for platform healthchecks
- Interactive API docs at `/docs` (Swagger UI) and `/redoc`

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | no | `8000` | Usually injected by the platform |
| `CORS_ORIGINS` | no | `*` | Comma-separated list of allowed origins |

## Local development

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Visit `http://localhost:8000/docs` for the interactive API explorer.

## Deploying

1. Push this repo to GitHub.
2. Point your platform at it — it builds from the `Dockerfile` directly.
3. Set any environment variables your app needs.
4. No volume needed — this is a stateless API. Point it at one of the database templates for persistence.

## Notes

`railway.json` is included for compatibility with Railway's config-as-code format. If your own platform reads a different schema, treat it as a reference.
