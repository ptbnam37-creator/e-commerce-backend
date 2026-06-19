FROM alpine:latest

# Install utility packages
RUN apk add --no-cache unzip ca-certificates

# Download and install PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v0.39.3/pocketbase_0.39.3_linux_amd64.zip /tmp/pocketbase.zip
RUN unzip /tmp/pocketbase.zip -d /pb/ && rm /tmp/pocketbase.zip

# Create data directory and copy migrations
RUN mkdir -p /pb/pb_data
COPY ./pb_migrations /pb/pb_migrations

# Expose port
EXPOSE 8090

# Start PocketBase - wipe data.db to force fresh start, then run
CMD ["/bin/sh", "-c", "rm -f /pb/pb_data/data.db && /pb/pocketbase serve --http=0.0.0.0:${PORT:-8090} --dir=/pb/pb_data"]
