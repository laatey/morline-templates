FROM mysql:8.4

LABEL org.opencontainers.image.title="MySQL Template" \
      org.opencontainers.image.description="Open-source relational database for web applications" \
      template.category="database"

# Drop .sql, .sql.gz, or .sh files here to seed the database on first boot
COPY init/ /docker-entrypoint-initdb.d/

EXPOSE 3306

HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=5 \
  CMD mysqladmin ping -h 127.0.0.1 -u root -p"${MYSQL_ROOT_PASSWORD}" --silent || exit 1

CMD ["mysqld"]
