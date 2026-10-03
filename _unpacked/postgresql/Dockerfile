FROM postgres:18-alpine

LABEL org.opencontainers.image.title="PostgreSQL Template" \
      org.opencontainers.image.description="Production-ready PostgreSQL with persistent storage" \
      template.category="database"

# Drop .sql / .sql.gz / .sh files here to seed the database on first boot
COPY init/ /docker-entrypoint-initdb.d/

EXPOSE 5432

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=5 \
  CMD pg_isready -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-postgres}" || exit 1

CMD ["postgres"]
