# AGENTS.md — content-viewer

This repository uses the **ADW (Agent Developer Workflow)**.

**Agents: read `.adw/AGENT_WORKFLOW.md` before making any changes.**

That file defines how to:
- Create a task run (`RUN_ID` + `TASK.md`)
- Work on a branch
- Validate with `.adw/runners/run-build-validate.sh`
- Hand off to the human for review

Do not skip the workflow for "small" changes.

---

## Guardrails: do not break the hosted site

This repo is a **static export** (`output: "export"`) deployed to Cloudflare Pages
behind Cloudflare Access. Every merge to `main` rebuilds and redeploys it
(`.github/workflows/deploy.yml`). Read `docs/hosting.md` and
`docs/automation/README.md` first.

### Content PRs (the common case)
- Add or edit only files under `content/2026/<MM-month>/week-NN/`, named
  `<YYYY-MM-DD>-<type>-<slug>.md`. Do not touch anything else in the same PR.
- Frontmatter: use simple `key: value`, `[a, b]` arrays or `- item` lists only.
  No multi-line values (`>`/`|`), no nested objects, no `---` inside values.
  The build parser (`scripts/build-static-data.mjs`) is deliberately minimal.
- Follow the schema in `docs/automation/README.md`. Run
  `node scripts/content-pr-gate.mjs create|edit` (or at least
  `npm run validate:content-schema -- --changed origin/main`) before opening
  the PR.
- No dot-folders or dot-files (they are skipped), no images or other assets
  (only `.md` is published), no duplicate filenames in one folder.
- Branch names: `content/*`, `workflow/*`, `show-and-tell/*`.

### Code PRs: never do these
- Add `app/api/**`, route handlers, middleware, server actions, or anything
  that reads `fs` at request time. It breaks the static export.
- Remove or change `output: "export"`, `trailingSlash`, or `images.unoptimized`
  in `next.config.ts`.
- Remove the `prebuild`/`predev` scripts or `scripts/build-static-data.mjs`.
  Without them the site deploys but is empty.
- Re-add write paths (stage editing, ingestion). Stage changes are PRs.
- Re-add `pnpm-lock.yaml` (npm is the package manager) or change Node 22.
- Edit `.github/workflows/`, `wrangler.toml`, the Pages project name, or
  Access/DNS settings. These are owner-only (see `.github/CODEOWNERS`).
- Commit secrets, tokens, or `.env` files.

### Required before every PR
```bash
npm ci
npm run test:content-schema
npm run build
npm run verify:static   # fails if the export or /data files are missing
```
The `Build check` workflow runs the last three on every PR, and the deploy
workflow runs them again on `main`. If the deploy fails, the previous version
stays live; fix forward, do not bypass checks.

### If something looks off
Stop and report in the PR description. Do not "fix" hosting, Access, or
secrets from a PR.
