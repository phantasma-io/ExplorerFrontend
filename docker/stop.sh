# Keep project name consistent with start.sh.
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
export COMPOSE_PROJECT_NAME="explorer-frontend-${DEPLOY_ENV:-production}"

docker compose stop
