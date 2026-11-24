# Content automation (reference)

Status: **publishing to social platforms is no longer part of this repo.** This
doc preserves how the pipeline worked so it can be rebuilt. The full original
code (write routes, Sheets ingestion, LeafWiki import) is in git tag
`archive/automation-v1`.

## What is still active
1. **Agents publish content as PRs.** One PR per post, squash-merged to `main`.
   - Branches: `content/*`, `workflow/*`, `show-and-tell/*`, `chore/content-*`
     (older: `reviewer/YYYY-MM-DD-*`).
   - Path: `content/2026/<MM-month>/week-NN/<YYYY-MM-DD>-<type>-<slug>.md`
     (types: `post`, `workflow`, `show-and-tell`).
2. **Gate.** `.github/workflows/validate-content-schema.yml` runs
   `npm run test:content-schema` and
   `npm run validate:content-schema -- --changed origin/<base>`.
   Locally: `node scripts/content-pr-gate.mjs create|edit [gh args]` validates
   then runs `gh pr create|edit`.
3. **Publish site.** `.github/workflows/deploy.yml` builds the static site and
   deploys to Cloudflare Pages on every merge to `main`. See `docs/hosting.md`.

## Content contract (enforced by the validator)
Frontmatter: `title`, `status`, `stage` (idea, drafted, recorded, posted,
analyzed), `platform` (pipe-separated), `content_type`, `pillar`, `goal`,
`publish_date`, `cta_keyword`, `audience`, `difficulty`, `created`, `modified`,
`tags[]`.

Required headings: Audience + difficulty; Why now (1 sentence); 3 hook options
(<12 words each); Final record-ready script (one short spoken beat per physical line:
max 25 words / 160 chars / <=2 sentences per line; blank lines separate beats;
>=50 words total, >=250 chars, no placeholders, no sub-headings/"Hook:" labels/A-roll
cues/bracketed directions); Shot list by timestamp (A-roll/B-roll); On-screen text
cues; Caption options; CTA type + exact line; Thumbnail text options (3); Risk check;
Sources; QA Scorecard. Generator instructions: preserve wording; only insert line
breaks to make each physical line a readable spoken beat.

## Retired parts (knowledge only)
- **External scheduler / n8n (`automate-n8n`)**: generated the scripts and
  images, opened PRs, and posted to platforms. Lived outside this repo; no
  config was ever committed. Rebuild from the contract above.
- **Topic ingestion** (`POST /api/ingest-topics`): reviewer-gated, append-only
  write of topics to Google Sheets with idempotency keys. Env:
  `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SHEETS_SHEET_NAME`,
  `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`.
- **In-app stage editing** (`/api/files/update-stage`): rewrote `stage` in
  frontmatter on disk. Now stage changes go through a PR like any other edit.
- **LeafWiki** (`ghcr.io/perber/leafwiki`, Docker, `content/` mounted at
  `/app/data`): evaluated and replaced by the static site. Import script
  zipped the `.md` files and POSTed to `/api/import/plan` + `/execute`.
