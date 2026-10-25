FROM n8nio/n8n:latest

LABEL org.opencontainers.image.title="n8n Workflow Automation Template" \
      org.opencontainers.image.description="Self-hosted node-based workflow automation engine" \
      template.category="automation"

ENV N8N_PROTOCOL=https \
    GENERIC_TIMEZONE=UTC \
    N8N_RUNNERS_ENABLED=true

EXPOSE 5678

# n8n reads N8N_PORT for the port it binds to; map the platform's PORT onto it at boot
CMD ["sh", "-c", "export N8N_PORT=${PORT:-5678}; exec n8n start"]
