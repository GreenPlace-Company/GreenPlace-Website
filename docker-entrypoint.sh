#!/bin/sh
# Next.js standalone binds to $HOSTNAME. Docker and Cloud Run set that to the
# instance name, which is not a reachable address. Always listen on every
# interface, on the port Cloud Run injects (default 8080).
set -eu
cd /app
export HOSTNAME=0.0.0.0
export PORT="${PORT:-8080}"
if [ "$#" -gt 0 ]; then
  exec "$@"
fi
exec node server.js
