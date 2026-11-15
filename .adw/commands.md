# Deterministic command inventory — content-viewer

All quality commands run with cwd = `./` unless noted.

**Node:** CI and the ADW runner expect **Node 22** (minimum 20). The runner prefers `~/.nvm/versions/node/v22.*` automatically. Override with `ADW_NODE=/path/to/node`.

Prefer `rtk <cmd>` when RTK is installed (smaller agent context).

## Local quality gates

Gate order is defined in `.adw/config.sh` (`ADW_STEPS`). Run them from `./`.

## Orchestrated gate (ADW code node)

```text
ci-local:  ../.adw/runners/run-build-validate.sh
# or from repo root:
#          .adw/runners/run-build-validate.sh
```

## Git / PR (from repo root)

```text
status:   rtk git status
diff:     rtk git diff
branch:   git switch -c adw/<short-name>
pr:       gh pr create
```

## Install (when node_modules missing)

```text
cd . && npm ci
```
