#!/usr/bin/env bash
# Imports all markdown files from content/ into a running LeafWiki instance.
# Usage: ./scripts/import-to-leafwiki.sh [LEAFWIKI_URL]
# Default URL: http://localhost:8080

set -euo pipefail

LEAFWIKI_URL="${1:-http://localhost:8080}"
CONTENT_DIR="$(cd "$(dirname "$0")/.." && pwd)/content"
ZIP_FILE="/tmp/leafwiki-content-import.zip"

echo "📦 Content dir: $CONTENT_DIR"
echo "🌐 LeafWiki URL: $LEAFWIKI_URL"

# Check content dir exists
if [ ! -d "$CONTENT_DIR" ]; then
  echo "❌ content/ directory not found at $CONTENT_DIR"
  exit 1
fi

# Check LeafWiki is reachable
if ! curl -sf "$LEAFWIKI_URL/api/config" > /dev/null; then
  echo "❌ LeafWiki is not reachable at $LEAFWIKI_URL — is 'make view' running?"
  exit 1
fi

# Get CSRF token
CSRF=$(curl -si "$LEAFWIKI_URL/api/config" | grep -o 'leafwiki_csrf=[^;]*' | cut -d= -f2)
if [ -z "$CSRF" ]; then
  echo "❌ Could not get CSRF token from LeafWiki"
  exit 1
fi
echo "🔑 CSRF token acquired"

# Build zip from markdown files only (skip hidden files and LeafWiki's own DB files)
rm -f "$ZIP_FILE"
cd "$CONTENT_DIR/.."
zip -r "$ZIP_FILE" content/ \
  --include "content/*.md" \
  --include "content/**/*.md" \
  -x "*/.*" > /dev/null

FILE_COUNT=$(unzip -l "$ZIP_FILE" | grep "\.md$" | wc -l | tr -d ' ')
echo "📄 Zipped $FILE_COUNT markdown files"

# Submit import plan
echo "📋 Planning import..."
PLAN=$(curl -sf -X POST "$LEAFWIKI_URL/api/import/plan" \
  -H "X-CSRF-Token: $CSRF" \
  -b "leafwiki_csrf=$CSRF" \
  -F "file=@$ZIP_FILE")

IMPORT_ID=$(echo "$PLAN" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
ITEM_COUNT=$(echo "$PLAN" | grep -o '"items":\[' | wc -l)

if [ -z "$IMPORT_ID" ]; then
  echo "❌ Import plan failed:"
  echo "$PLAN"
  exit 1
fi
echo "✅ Import plan created (id: $IMPORT_ID)"

# Execute import
echo "🚀 Executing import..."
RESULT=$(curl -sf -X POST "$LEAFWIKI_URL/api/import/execute" \
  -H "X-CSRF-Token: $CSRF" \
  -b "leafwiki_csrf=$CSRF" \
  -H "Content-Type: application/json" \
  -d "{\"id\":\"$IMPORT_ID\"}")

echo "✅ Import complete!"
echo "$RESULT" | grep -o '"execution_status":"[^"]*"' || true
echo ""
echo "🌐 Open $LEAFWIKI_URL to browse your content"

rm -f "$ZIP_FILE"
