FROM alpine:latest

# Install utility packages
RUN apk add --no-cache unzip ca-certificates

# Download and install the latest PocketBase for Linux AMD64
ADD https://github.com/pocketbase/pocketbase/releases/download/v0.22.15/pocketbase_0.22.15_linux_amd64.zip /tmp/pocketbase.zip
RUN unzip /tmp/pocketbase.zip -d /pb/ && rm /tmp/pocketbase.zip

# Copy migrations and initial data to seed the server
COPY ./pb_migrations /pb/pb_migrations
COPY ./pb_data /pb/pb_data

# Expose port (Render overrides this with dynamic port)
EXPOSE 8090

# Start PocketBase server bound to $PORT with persistent data directory
CMD ["sh", "-c", "/pb/pocketbase serve --http=0.0.0.0:${PORT:-8090} --dir=/pb/pb_data"]
