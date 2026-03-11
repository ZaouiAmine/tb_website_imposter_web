#!/bin/bash
set -e
npm install
npm audit fix --omit=dev 2>/dev/null || true
VITE_API_URL=https://hf1af5qa0.cloud.scaliny.com npm run build
test -d dist || { echo "Build failed: no dist/"; exit 1; }
cp -r dist/* /out/
