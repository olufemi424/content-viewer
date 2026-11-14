#!/usr/bin/env bash
# ADW code node: runs quality gates defined in .adw/config.sh
# Artifacts land in .adw/context/<run-id>/. Optional agent re-entry between attempts.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
CONTEXT_ROOT="$ROOT/.adw/context"
CONFIG="$ROOT/.adw/config.sh"

# Load project config
if [[ ! -f "$CONFIG" ]]; then
  echo "error: .adw/config.sh not found at $CONFIG" >&2
  exit 1
fi
# shellcheck source=../config.sh
source "$CONFIG"

APP="$ROOT/${ADW_APP_DIR:-.}"
PROJECT_NAME="${ADW_PROJECT_NAME:-$(basename "$ROOT")}"
STEPS=("${ADW_STEPS[@]}")

RUN_ID=""
MAX_ATTEMPTS=1
AGENT_CMD="${ADW_AGENT_CMD:-}"
SKIP_INSTALL=0

# Prefer CI-compatible Node (>=20). Override with ADW_NODE=/path/to/node
prefer_node() {
  local candidate major
  if [[ -n "${ADW_NODE:-}" && -x "${ADW_NODE}" ]]; then
    echo "${ADW_NODE}"
    return 0
  fi
  local nvm_root="${NVM_DIR:-$HOME/.nvm}/versions/node"
  if [[ -d "$nvm_root" ]]; then
    for candidate in \
      "$nvm_root"/v22.*/bin/node \
      "$nvm_root"/v24.*/bin/node \
      "$nvm_root"/v20.*/bin/node
    do
      if [[ -x "$candidate" ]]; then
        echo "$candidate"
        return 0
      fi
    done
  fi
  if command -v node >/dev/null 2>&1; then
    candidate="$(command -v node)"
    major="$( "$candidate" -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0 )"
    if [[ "$major" -ge 20 ]]; then
      echo "$candidate"
      return 0
    fi
  fi
  echo "error: need Node >= 20 (CI uses 22). Install via nvm or set ADW_NODE." >&2
  echo "  current PATH node: $(command -v node 2>/dev/null || echo none) ($(node -v 2>/dev/null || echo n/a))" >&2
  return 1
}

NODE_BIN="$(prefer_node)"
export PATH="$(dirname "$NODE_BIN"):$PATH"

usage() {
  cat <<'EOF'
Usage: run-build-validate.sh [options]

  --run-id ID          Run id (default: adw-YYYYMMDD-HHMMSS)
  --max-attempts N     Validation attempts (default: 1). >1 only useful with --agent-cmd
  --agent-cmd CMD      Shell command to run after a failed attempt (before retry)
  --skip-install       Do not run npm ci when node_modules is missing
  -h, --help           Show help

Environment:
  ADW_AGENT_CMD        Default for --agent-cmd
  ADW_NODE             Path to node binary (overrides nvm detection)
  ADW_USE_RTK=1        Prefix npm with rtk when rtk is on PATH (default: auto if rtk exists)

Examples:
  .adw/runners/run-build-validate.sh
  .adw/runners/run-build-validate.sh --run-id adw-my-task --max-attempts 1
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --run-id)
      RUN_ID="${2:?}"
      shift 2
      ;;
    --max-attempts)
      MAX_ATTEMPTS="${2:?}"
      shift 2
      ;;
    --agent-cmd)
      AGENT_CMD="${2:?}"
      shift 2
      ;;
    --skip-install)
      SKIP_INSTALL=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ -z "$RUN_ID" ]]; then
  RUN_ID="adw-$(date +%Y%m%d-%H%M%S)"
fi

if ! [[ "$MAX_ATTEMPTS" =~ ^[1-9][0-9]*$ ]]; then
  echo "error: --max-attempts must be a positive integer" >&2
  exit 2
fi

if [[ ! -d "$APP" ]]; then
  echo "error: app dir not found at $APP (ADW_APP_DIR=${ADW_APP_DIR:-<unset>})" >&2
  exit 1
fi

if [[ ! -f "$APP/package.json" ]]; then
  echo "error: package.json missing under $APP" >&2
  exit 1
fi

RUN_DIR="$CONTEXT_ROOT/$RUN_ID"
STEPS_DIR="$RUN_DIR/steps"
mkdir -p "$STEPS_DIR"

USE_RTK=0
if [[ "${ADW_USE_RTK:-}" == "1" ]] || { [[ -z "${ADW_USE_RTK:-}" ]] && command -v rtk >/dev/null 2>&1; }; then
  USE_RTK=1
fi

run_npm() {
  local script="$1"
  if [[ "$USE_RTK" -eq 1 ]]; then
    rtk npm run "$script"
  else
    npm run "$script"
  fi
}

ensure_deps() {
  if [[ "$SKIP_INSTALL" -eq 1 ]]; then
    return 0
  fi
  if [[ ! -d "$APP/node_modules" ]]; then
    echo "==> node_modules missing; running npm ci"
    (
      cd "$APP"
      if [[ "$USE_RTK" -eq 1 ]]; then
        rtk npm ci
      else
        npm ci
      fi
    )
  fi
}

write_status() {
  local status="$1"
  local attempt="$2"
  local failed_step="${3:-}"
  local finished_at
  finished_at="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  cat >"$RUN_DIR/status.json" <<EOF
{
  "workflow": "01-build-validate",
  "version": "build-validate@0.1.0",
  "run_id": $(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$RUN_ID"),
  "status": "$status",
  "attempt": $attempt,
  "max_attempts": $MAX_ATTEMPTS,
  "failed_step": $(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$failed_step"),
  "project": $(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$PROJECT_NAME"),
  "app_dir": $(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$APP"),
  "steps": $(python3 -c 'import json,sys; print(json.dumps(sys.argv[1:]))' "${STEPS[@]}"),
  "finished_at": "$finished_at",
  "run_dir": $(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$RUN_DIR")
}
EOF
}

write_feedback() {
  local attempt="$1"
  local failed_step="$2"
  local log_file="$3"
  cat >"$RUN_DIR/FEEDBACK.md" <<EOF
# ADW validation feedback

| Field | Value |
|-------|--------|
| Run id | \`$RUN_ID\` |
| Attempt | $attempt / $MAX_ATTEMPTS |
| Failed step | \`$failed_step\` |
| Log | \`steps/$(basename "$log_file")\` |

## Instructions for build agent

1. Read the intake for this task (engineer-provided).
2. Fix **only** what is required to pass \`$failed_step\` and the remaining gates.
3. Stay in scope. No drive-by refactors.
4. After fixes, engineer will re-run: \`.adw/runners/run-build-validate.sh --run-id $RUN_ID\`

## Failed command output

\`\`\`text
$(cat "$log_file")
\`\`\`
EOF
}

run_gates_once() {
  local attempt="$1"
  local step log rc

  for step in "${STEPS[@]}"; do
    log="$STEPS_DIR/attempt-${attempt}-$(echo "$step" | tr ':/' '--').log"
    echo "==> [attempt $attempt/$MAX_ATTEMPTS] $step"
    set +e
    (
      cd "$APP"
      run_npm "$step"
    ) >"$log" 2>&1
    rc=$?
    set -e
    if [[ $rc -ne 0 ]]; then
      echo "xx failed: $step (exit $rc) — see $log"
      write_feedback "$attempt" "$step" "$log"
      write_status "failed" "$attempt" "$step"
      return "$rc"
    fi
    echo "ok $step"
  done

  write_status "passed" "$attempt" ""
  cat >"$RUN_DIR/FEEDBACK.md" <<EOF
# ADW validation feedback

All gates passed on attempt $attempt / $MAX_ATTEMPTS for run \`$RUN_ID\`.

Next: **engineer review** (PR diff, DoD, scope). Do not treat green gates as automatic ship.
EOF
  return 0
}

echo "ADW run_id=$RUN_ID"
echo "project=$PROJECT_NAME"
echo "app=$APP"
echo "steps=${STEPS[*]}"
echo "context=$RUN_DIR"
echo "max_attempts=$MAX_ATTEMPTS"
echo "use_rtk=$USE_RTK"
echo "node=$NODE_BIN ($("$NODE_BIN" -v))"

ensure_deps

attempt=1
while [[ "$attempt" -le "$MAX_ATTEMPTS" ]]; do
  if run_gates_once "$attempt"; then
    echo ""
    echo "PASS: all gates green for $RUN_ID"
    echo "status: $RUN_DIR/status.json"
    exit 0
  fi

  if [[ "$attempt" -ge "$MAX_ATTEMPTS" ]]; then
    break
  fi

  if [[ -z "$AGENT_CMD" ]]; then
    echo ""
    echo "FAIL: gates red. No --agent-cmd set; not auto-retrying."
    echo "Feed $RUN_DIR/FEEDBACK.md to the build agent, then re-run with --run-id $RUN_ID"
    exit 1
  fi

  echo "==> invoking agent between attempts: $AGENT_CMD"
  expanded_cmd="${AGENT_CMD//RUN_ID/$RUN_ID}"
  set +e
  bash -lc "$expanded_cmd"
  agent_rc=$?
  set -e
  if [[ $agent_rc -ne 0 ]]; then
    echo "xx agent command exited $agent_rc — continuing to next validation attempt anyway"
  fi

  attempt=$((attempt + 1))
done

echo ""
echo "FAIL CLOSED: exhausted $MAX_ATTEMPTS attempt(s) for $RUN_ID"
echo "artifacts: $RUN_DIR"
exit 1
