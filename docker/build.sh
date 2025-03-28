#!/usr/bin/env bash

# Export env vars
export $(grep -v '^#' .env | xargs)

echo "Building image and use branch github branch '${BUILD_BRANCH}'..."

docker build ./build -t explorer-frontend-production --build-arg BUILD_BRANCH=$BUILD_BRANCH --no-cache