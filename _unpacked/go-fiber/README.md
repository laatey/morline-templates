# Go Fiber Service

Express-inspired, high-throughput Go web framework, built on `fasthttp`.

## What's inside

- Fiber **v3** (the current major — v2's `*fiber.Ctx` pointer-based handlers were replaced with a `fiber.Ctx` interface; check the [migration guide](https://docs.gofiber.io/next/whats_new/) if you're porting v2 code)
- `/health` endpoint for platform healthchecks
- Multi-stage Dockerfile producing a static binary in a bare `alpine` runtime image (single-digit MB final image)

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | no | `8080` | Usually injected by the platform |

## Local development

```bash
go mod tidy   # generates go.sum on first run
go run main.go
```

## Deploying

1. Run `go mod tidy` locally once so `go.sum` is committed (the Dockerfile's `COPY go.sum*` handles its absence gracefully, but committing it makes builds reproducible).
2. Push this repo to GitHub.
3. Point your platform at it — it builds from the `Dockerfile` directly.
4. No volume needed — this is a stateless API. Point it at one of the database templates for persistence.

## Notes

Requires Go 1.25+ (Fiber v3's stated minimum). `railway.json` is included for compatibility with Railway's config-as-code format — treat it as a reference if your own platform reads a different schema.
