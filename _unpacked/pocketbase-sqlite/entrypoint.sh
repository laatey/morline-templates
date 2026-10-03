#!/bin/sh
set -e

# If admin credentials are provided, upsert the superuser before serving.
# Safe to run on every boot: upsert creates it once, then just keeps the
# password in sync with these env vars on subsequent restarts.
if [ -n "$PB_ADMIN_EMAIL" ] && [ -n "$PB_ADMIN_PASSWORD" ]; then
  /pb/pocketbase superuser upsert "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD" --dir=/pb/pb_data
fi

exec /pb/pocketbase serve --http="0.0.0.0:${PORT:-8090}" --dir=/pb/pb_data
