FROM mongo:8

LABEL org.opencontainers.image.title="MongoDB Template" \
      org.opencontainers.image.description="Document-oriented NoSQL database for JSON-style schemas" \
      template.category="database"

# Drop .js or .sh files here to seed the database on first boot
COPY init/ /docker-entrypoint-initdb.d/

EXPOSE 27017

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=5 \
  CMD mongosh --quiet --eval "db.adminCommand('ping')" || exit 1

CMD ["mongod", "--bind_ip_all"]
