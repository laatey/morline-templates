# Rust Axum API

Ergonomic, modular Rust web framework built on Tokio and Tower — for when you want Go/Node-level ergonomics with Rust's performance and safety guarantees.

## What's inside

- Axum 0.8 + Tokio (full features) + Serde for JSON
- `/health` endpoint for platform healthchecks
- Multi-stage Dockerfile that caches dependency compilation separately from your source code, so `cargo build` doesn't re-download and recompile every crate on every source change

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | no | `8080` | Usually injected by the platform |

## Local development

```bash
cargo run
```

First build will take a while — Rust compiles from source. Subsequent builds are fast thanks to incremental compilation.

## Deploying

1. Run `cargo build --release` locally once so `Cargo.lock` is committed (the Dockerfile's `COPY Cargo.lock*` handles its absence gracefully, but committing it makes builds reproducible).
2. Push this repo to GitHub.
3. Point your platform at it — it builds from the `Dockerfile` directly.
4. No volume needed — this is a stateless API. Point it at one of the database templates for persistence.

## Notes

`railway.json` is included for compatibility with Railway's config-as-code format — treat it as a reference if your own platform reads a different schema.
