# ADW home — content-viewer (agent-owned)

AI Developer Workflow for **content-viewer**.

**Design goal:** cut human bottlenecks. The **agent** owns the task, plan, implementation, and validation loop. You give a **goal** and later **review**.

## How you use it (human)

1. Tell any coding agent what you want (plain language is enough).
2. Agent must load **[`AGENT_WORKFLOW.md`](AGENT_WORKFLOW.md)** (also pointed from root [`AGENTS.md`](../AGENTS.md)).
3. When it says ready for review: check the branch / diff (and PR if you asked for one).
4. Ship or send feedback — do **not** run the toolchain for the agent.

You should almost never need to fill templates or paste lint output.

## How the agent uses it

```text
Human goal
  → agent creates RUN_ID + TASK.md
  → branch + implement
  → run-build-validate.sh (code gates)
  → on fail: FEEDBACK.md → fix → re-run (max 3)
  → handoff for human review
```

Full procedure: **[AGENT_WORKFLOW.md](AGENT_WORKFLOW.md)**.

## Harness

| Role | Tool |
|------|------|
| Agents | Grok, Codex, or any agent that reads `AGENTS.md` |
| Gates | `.adw/runners/run-build-validate.sh` (Node 22 via nvm) |
| Cheap CLI noise | `rtk` when available |

## Layout

```text
.adw/
  AGENT_WORKFLOW.md       # ← agents: start here
  README.md               # this file (human + overview)
  config.sh               # project-specific gate config
  commands.md
  templates/task.md       # agent-maintained task state
  templates/intake.md     # optional human detail (not required)
  agents/build.md         # short role card
  runners/run-build-validate.sh
  context/<RUN_ID>/       # TASK.md, FEEDBACK.md, logs (gitignored)
  workflows/01-build-validate/
```

## Operating principles

1. **Agent builds; code validates** — runner is truth, not chat claims.
2. **Human at the ends** — goal in, review out; not mid-loop operator.
3. **One thin workflow** — this path only until it is boring.
4. **Fail closed** — red gates after budget → blocked handoff with artifacts.

## Smoke check (agent or human)

```bash
.adw/runners/run-build-validate.sh --run-id adw-smoke
```
