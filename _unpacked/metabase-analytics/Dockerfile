FROM metabase/metabase:latest

LABEL org.opencontainers.image.title="Metabase BI Analytics Template" \
      org.opencontainers.image.description="Self-hosted business intelligence & interactive data visualization" \
      template.category="analytics"

ENV MB_JETTY_HOST=0.0.0.0

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=5 \
  CMD wget -qO- "http://127.0.0.1:${MB_JETTY_PORT:-3000}/api/health" || exit 1

# Metabase listens on MB_JETTY_PORT (default 3000); map the platform's PORT onto it at boot
CMD ["sh", "-c", "export MB_JETTY_PORT=${PORT:-3000}; exec /app/run_metabase.sh"]
