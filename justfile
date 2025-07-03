[private]
just:
    just -l

set dotenv-load
TMUX_SESSION_NAME := env("TMUX_SESSION_NAME")

[group('deployment')]
install-deps:
    npm install

[group('build')]
b:
    yarn next build

[group('run')]
r0:
    yarn next

[group('run')]
r:
    sh ./scripts/run_in_tmux.sh