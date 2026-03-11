#!/bin/bash
npm install
npm audit fix --omit=dev 2>/dev/null || true
VITE_API_URL=https://imposter.scaliny.com npm run build
cp -r dist/* /out
