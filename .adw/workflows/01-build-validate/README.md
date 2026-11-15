# Workflow 01 — agent-owned build → validate

**Version:** `build-validate@0.2.0`
**Driver:** agent ([`AGENT_WORKFLOW.md`](../../AGENT_WORKFLOW.md))
**Human:** goal + review only

## Props in

| Input | Who |
|-------|-----|
| Goal (+ optional constraints) | Human (chat is enough) |
| TASK.md under `context/<RUN_ID>/` | **Agent creates & maintains** |

## Pipeline

```text
[Human] goal
  → [Agent] INIT TASK.md + branch
  → [Agent] plan + build
  → [Code]  run-build-validate.sh
  → [Agent] fix from FEEDBACK (loop, max 3)
  → [Human] review / ship
```

## Props out

| Output | Path |
|--------|------|
| Live task state | `.adw/context/<RUN_ID>/TASK.md` |
| Gate logs | `.adw/context/<RUN_ID>/steps/` |
| Agent fix input | `.adw/context/<RUN_ID>/FEEDBACK.md` |
| Machine status | `.adw/context/<RUN_ID>/status.json` |
| Code | branch (and PR if requested) |
