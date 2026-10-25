FROM alpine:3.20

LABEL org.opencontainers.image.title="PocketBase Template" \
      org.opencontainers.image.description="Ultra-lightweight embedded SQLite database & realtime backend" \
      template.category="embedded-db"

RUN apk add --no-cache ca-certificates curl unzip jq

WORKDIR /pb

# Pin to a specific release (e.g. "v0.39.10") for reproducible builds.
# Left as "latest" this always resolves and downloads the newest tag at build time.
ARG PB_VERSION=latest

RUN set -eux; \
    if [ "$PB_VERSION" = "latest" ]; then \
      TAG=$(curl -sf https://api.github.com/repos/pocketbase/pocketbase/releases/latest | jq -r .tag_name); \
    else \
      TAG="$PB_VERSION"; \
    fi; \
    VERSION="${TAG#v}"; \
    curl -Lf "https://github.com/pocketbase/pocketbase/releases/download/${TAG}/pocketbase_${VERSION}_linux_amd64.zip" -o pb.zip; \
    unzip pb.zip; \
    rm pb.zip; \
    chmod +x pocketbase; \
    echo "Built PocketBase ${TAG}"

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

VOLUME /pb/pb_data
EXPOSE 8090

HEALTHCHECK --interval=10s --timeout=3s --retries=5 \
  CMD wget -qO- "http://127.0.0.1:${PORT:-8090}/api/health" || exit 1

ENTRYPOINT ["/entrypoint.sh"]
