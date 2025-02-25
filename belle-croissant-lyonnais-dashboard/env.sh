#!/bin/sh

# Replace environment variables in the built JavaScript files
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|http://localhost:3000|${VITE_API_URL}|g" {} +