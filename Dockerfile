FROM alpine:latest

# Install utility packages
RUN apk add --no-cache unzip ca-certificates

# Download and install the latest PocketBase for Linux AMD64
ADD https://github.com/pocketbase/pocketbase/releases/download/v0.39.3/pocketbase_0.39.3_linux_amd64.zip /tmp/pocketbase.zip
RUN unzip /tmp/pocketbase.zip -d /pb/ && rm /tmp/pocketbase.zip

# Copy migrations only (data persists via volume)
COPY ./pb_migrations /pb/pb_migrations

# Expose port (Render overrides this with dynamic port)
EXPOSE 8090

# Start PocketBase server bound to $PORT with persistent data directory
CMD ["sh", "-c", "/pb/pocketbase serve --http=0.0.0.0:${PORT:-8090} --dir=/pb/pb_data"]

