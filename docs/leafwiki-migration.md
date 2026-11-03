# LeafWiki Migration — Agent Handoff

## Goal

Migrate the `content/` folder from this Next.js markdown viewer into a self-hosted
**LeafWiki** instance so that:

- Every markdown file is browsable via tree navigation in the browser
- The folder hierarchy (`2026/03-march/week-12/file.md`) is preserved as pages
- LeafWiki runs locally via Docker, pointed at a data directory

No code changes are needed to the existing Next.js app. This is a parallel setup.

---

## What You Are Working With

### Content Structure

The tree below is illustrative — new months and weeks are added continuously.
LeafWiki will always reflect whatever is currently on disk.

```
content/
  <year>/
    <month>/
      <week>/
        <date>-<slug>.md
        ...
  meta/
  show/
  templates/
```

Files use YAML frontmatter:

```yaml
---
title: Claude Opus 4.6 is now in Copilot across major IDEs
status: draft
stage: idea
platform: facebook
content_type: talking_head
tags:
  - week-12
  - claude
---
```

### LeafWiki Key Facts

- Single Go binary or Docker image
- Stores pages as Markdown files on disk inside a `data/` directory — mounting `content/` directly keeps it always in sync
- Has a ZIP-based bulk importer (Admin UI → Import) as an alternative to direct mounting
- Supports Obsidian-style `[[wiki links]]` rewriting on import
- Tree navigation follows folder structure
- Auth can be fully disabled for local use with `--disable-auth`

---

## Step-by-Step Implementation

### Step 1 — Run LeafWiki via Docker

Mount `content/` directly as LeafWiki's data directory. This means LeafWiki
always reads whatever is on disk — no zip, no re-import needed when new files
are added.

```bash
docker run -d \
  --name leafwiki \
  -p 8080:8080 \
  -v "$(pwd)/content:/app/data" \
  ghcr.io/perber/leafwiki:latest \
  --jwt-secret=localdev \
  --allow-insecure=true \
  --disable-auth
```

Run from the repo root so `$(pwd)/content` resolves correctly.

**What each flag does:**

| Flag | Purpose |
|---|---|
| `-v "$(pwd)/content:/app/data"` | Mounts `content/` directly — new files appear automatically |
| `--jwt-secret=localdev` | Required — any string works for local use |
| `--allow-insecure=true` | Required for plain HTTP (no SSL) |
| `--disable-auth` | Skips login entirely — anyone on localhost can read/edit |

> **Note:** LeafWiki may write metadata or config files back into the mounted
> directory. Add any such files to `.gitignore` if they appear in `content/`.

Verify it's running:

```bash
curl -s http://localhost:8080 | head -5
# Should return HTML
```

Open `http://localhost:8080` in your browser. You should see the LeafWiki UI.

---

### Step 2 — Verify

After the container starts, confirm everything is working:

- [ ] Tree nav on the left shows your folder hierarchy
- [ ] Clicking a file renders its markdown content
- [ ] Frontmatter appears at the top of each page (LeafWiki renders it as a
  code block — acceptable for browsing)
- [ ] Folders like `show/` and `meta/` appear as tree nodes

---

### Step 3 — Ongoing Use

Because `content/` is mounted directly, **new files are available immediately**
without any action. Just add files and reload the browser.

To point LeafWiki at a **different folder**, stop and restart with a new volume path:

```bash
docker stop leafwiki && docker rm leafwiki
# Then re-run Step 1 with the new path
```

---

### Step 4 (Optional) — Docker Compose for Repeatability

Create `docker-compose.yml` in the project root (do not commit — add to `.gitignore`):

```yaml
services:
  leafwiki:
    image: ghcr.io/perber/leafwiki:latest
    container_name: leafwiki
    ports:
      - "8080:8080"
    environment:
      - LEAFWIKI_JWT_SECRET=localdev
      - LEAFWIKI_ALLOW_INSECURE=true
      - LEAFWIKI_DISABLE_AUTH=true
    volumes:
      - ./content:/app/data
    restart: unless-stopped
```

Start with:

```bash
docker compose up -d
```

---

## Known Limitations & Workarounds

| Issue | Workaround |
|---|---|
| YAML frontmatter renders as a raw code block | Acceptable for preview use; no action needed |
| LeafWiki assigns its own internal page ordering | Re-order pages manually in the UI if sequence matters |
| LeafWiki may write config/metadata files into `content/` | Check `content/` after first run and add any new files to `.gitignore` |
| `README.md` files in folders become pages named "README" | Rename them to `index.md` if you want cleaner page names |

---

## Success Criteria

- [ ] `docker run` starts LeafWiki with no errors
- [ ] `http://localhost:8080` loads the UI
- [ ] All markdown files from `content/` appear in the left-side tree
- [ ] Clicking any file renders its content
- [ ] No manual file editing was required

---

## Reference

- LeafWiki repo: https://github.com/perber/leafwiki
- Live demo: https://demo.leafwiki.com (resets hourly, `Ctrl+E` to edit)
- Docker image: `ghcr.io/perber/leafwiki:latest`
