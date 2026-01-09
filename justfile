[private]
just:
    just -l

set dotenv-load     := true
set dotenv-required := false

# TMUX_SESSION_NAME := env("TMUX_SESSION_NAME")

alias i := install-deps
[group('deployment')]
install-deps:
  npm install

alias ri := reinstall
[group('deployment')]
reinstall:
  rm -r node_modules
  just i

alias b := build
[group('build')]
build:
  npm run build

[group('run')]
run:
    npm run dev

[group('run')]
r0:
    npm run dev

[group('run')]
r:
    sh ./scripts/run_in_tmux.sh "explorer_front" "just r0"

[group('run')]
rd:
    sh ./scripts/run_in_tmux.sh "explorer_front" "just r0" --detached

[group('docker')]
docker-deploy:
  cd docker && sh ./deploy.sh

[group('docker')]
docker-start:
  cd docker && sh ./start.sh

[group('docker')]
docker-stop:
  cd docker && sh ./stop.sh
