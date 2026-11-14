# Agent workflow — content-viewer ADW

**Audience:** coding agents (Grok, Codex, Claude, Cursor, …)
**Owner of the loop:** **you (the agent)**
**Human role:** give a goal (and constraints if any) → later **review / ship**

You maintain the task. You run quality gates. You fix until green or fail closed.
Do **not** wait for the human to run lint or paste errors back.

---

## When this applies

Any request that changes the repo: bug, chore, feature, UI, refactor (in scope), test fix, docs tied to code.

Skip only pure Q&A with no file changes.

---

## Human input (minimal)

Accept whatever they give. Minimum is a **goal** in natural language.

Optional extras (use if present; do not demand a filled form):

- Constraints / out of scope
- Target files
- "Open a PR" / "don't commit" / branch name

You turn that into a structured **task** (below). You do **not** block on them filling `.adw/templates/intake.md`.

---

## Mandatory loop

```text
1. INIT     create run + TASK.md from the human message
2. BRANCH   work on a dedicated branch (unless told not to)
3. PLAN     short plan in TASK.md (bullets), then implement
4. BUILD    smallest change that meets the goal
5. VALIDATE .adw/runners/run-build-validate.sh --run-id <id>
6. FIX      if red: read FEEDBACK.md → fix → re-VALIDATE (max 3 gate cycles)
7. HANDOFF  summarize for human review; stop unless they asked to PR/merge
```

### Attempt budget

| Gate cycle (validate → fix) | Max **3** after first failure (4 validate runs total) |
| Fail closed                 | Stop, leave TASK.md + FEEDBACK, tell human clearly    |
| Scope expansion             | Only if required; note it in TASK.md; prefer ask if product-ambiguous |

---

## Step details

### 1. INIT — create and maintain the task

From **repo root** (`content-viewer`):

```bash
RUN_ID="adw-$(date +%Y%m%d)-$(echo '<short-slug>' | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-' | cut -c1-40)"
mkdir -p ".adw/context/${RUN_ID}"
# Write TASK.md (use template structure below)
```

**`TASK.md` path:** `.adw/context/<RUN_ID>/TASK.md`
This is the live source of truth for the run. **Update it** as you go (status, decisions, files touched).

Copy structure from `.adw/templates/task.md`, fill from the human message, set `status: in_progress`.

Also note `RUN_ID` for the validate runner.

### 2. BRANCH

```bash
git switch main 2>/dev/null || git checkout main
git pull --rebase origin main 2>/dev/null || true
git switch -c "adw/<short-slug>" 2>/dev/null || git checkout -b "adw/<short-slug>"
```

If already on a suitable task branch, keep it and record the name in TASK.md.

### 3–4. PLAN + BUILD

- Prefer existing patterns and conventions in `./`.
- No drive-by refactors. No secrets.
- Prefer `rtk` for git/npm noise when available.

### 5. VALIDATE (code owns the truth)

From **repo root**:

```bash
.adw/runners/run-build-validate.sh --run-id "$RUN_ID" --max-attempts 1
```

Gates (in order from `.adw/config.sh`).

- **Pass** → update TASK.md `status: ready_for_review`, go to HANDOFF.
- **Fail** → open `.adw/context/<RUN_ID>/FEEDBACK.md`, fix, re-run validate. Do **not** ask the human to run gates or paste logs.

Node: runner selects Node 22 via nvm; do not rely on older system Node.

### 6. FIX loop

On each failure:

1. Read `FEEDBACK.md` + failed step log under `steps/`
2. Fix only what unblocks the gate (and real bugs you introduced)
3. Re-run the runner with the **same** `--run-id`
4. Append a short note to TASK.md under "Attempts"

After max gate cycles still red → `status: blocked`, HANDOFF with failure summary.

### 7. HANDOFF (human gate)

Default: **do not merge**. Report:

```markdown
## ADW handoff
- RUN_ID: ...
- Branch: ...
- Goal: ...
- Status: ready_for_review | blocked
- Files changed: ...
- Gates: pass | fail (link FEEDBACK if fail)
- How to review: ...
- Residual risk: ...
```

Only open a PR / commit if the human asked (or standing instruction says so).

---

## Repo facts (quick)

| Item | Location |
|------|----------|
| App | `./` |
| Commands | `.adw/commands.md` |
| Runner | `.adw/runners/run-build-validate.sh` |
| Config | `.adw/config.sh` |
| This workflow | `.adw/AGENT_WORKFLOW.md` |

---

## Anti-patterns (do not do)

- Implementing without creating `TASK.md` / `RUN_ID`
- Claiming "tests pass" without running the runner
- Asking the human to copy-paste lint/test output
- Skipping gates "because the change is small"
- Mega-refactors outside the stated goal
- Silent merge to `main` without review request

---

## Success

Human said a goal → you delivered a branch + green gates (or a clear block) + TASK.md history — **without** them operating the toolchain.
