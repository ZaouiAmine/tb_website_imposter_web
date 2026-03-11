#!/bin/bash
set -e
npm install
VITE_API_URL=https://hf1af5qa0.cloud.scaliny.com ./node_modules/.bin/vite build
test -d dist || { echo "Build failed: no dist/"; exit 1; }
cp -r dist/* /out/
