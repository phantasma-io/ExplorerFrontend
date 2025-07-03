[private]
just:
    just -l

set dotenv-load     := true
set dotenv-required := false

# TMUX_SESSION_NAME := env("TMUX_SESSION_NAME")

alias inst := install-deps
[group('deployment')]
install-deps:
  yarn install


alias b := build
[group('build')]
build:
  yarn build

[group('run')]
run:
    yarn dev

[group('run')]
r0:
    yarn next

[group('run')]
r:
    sh ./scripts/run_in_tmux.sh
