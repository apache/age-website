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
