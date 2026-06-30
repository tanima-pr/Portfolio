#!/bin/bash
# Double-click this file to run your portfolio locally.
cd "$(dirname "$0")" || exit 1

echo "============================================"
echo "  Starting Tanima's portfolio (local dev)"
echo "============================================"

if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js / npm is not installed."
  echo "Install it from https://nodejs.org (LTS), then double-click this file again."
  read -r -p "Press Return to close..."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies (first run only, ~1-2 min)..."
  npm install
fi

echo "Opening http://localhost:3000 in your browser shortly..."
( sleep 5 && open http://localhost:3000 ) &

echo "Starting the dev server. Leave this window open."
echo "When you're done, press Control + C here to stop it."
npm run dev
