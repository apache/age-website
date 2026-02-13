#!/usr/bin/env bash
# Targets macOS and Linux. Run with: ./docker.sh or bash docker.sh

set -euo pipefail
if [ -z "${BASH_VERSINFO+x}" ]; then
  echo "This script requires bash. Run with: bash $0" >&2
  exit 1
fi
trap 'echo "Error: $0 failed at line $LINENO. Command: $BASH_COMMAND" >&2; exit 1' ERR

IMAGE=age-doc
HASH_FILE=".docker.buildhash"

if command -v sha256sum >/dev/null 2>&1; then
  HASH_CMD="sha256sum"
else
  HASH_CMD="shasum -a 256"
fi

NEW_HASH=$(
  $HASH_CMD docker/Dockerfile requirements.txt | $HASH_CMD | awk '{print $1}'
)

if [ ! -f "$HASH_FILE" ] || [ "$NEW_HASH" != "$(cat "$HASH_FILE")" ]; then
  docker build -f docker/Dockerfile -t "$IMAGE" .
  echo "$NEW_HASH" > "$HASH_FILE"
fi

docker run --rm -v "$PWD":/app -w /app "$IMAGE" sphinx-multiversion docs build/html
