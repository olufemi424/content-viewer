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

```
content/
  2026/
    01-january/
    02-february/
    03-march/
      week-10/
        2026-03-02-post-9to5-content-system.md
        ...
      week-12/
      week-13/
    04-april/
      week-14/
      week-15/
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
- Stores pages as Markdown files on disk inside a `data/` directory
- Has a **ZIP-based bulk importer** (Admin UI → Import) that accepts a zip of markdown files
- Supports Obsidian-style `[[wiki links]]` rewriting on import
- Tree navigation follows folder structure
- Auth can be fully disabled for local use with `--disable-auth`

---

## Step-by-Step Implementation

### Step 1 — Run LeafWiki via Docker

```bash
docker run -d \
  --name leafwiki \
  -p 8080:8080 \
  -v ~/leafwiki-data:/app/data \
  ghcr.io/perber/leafwiki:latest \
  --jwt-secret=localdev \
  --admin-password=admin123 \
  --allow-insecure=true \
  --disable-auth
```

**What each flag does:**

| Flag | Purpose |
|---|---|
| `-v ~/leafwiki-data:/app/data` | Persists all wiki data to `~/leafwiki-data` on your machine |
| `--jwt-secret=localdev` | Required — any string works for local use |
| `--admin-password=admin123` | Sets the initial admin password |
| `--allow-insecure=true` | Required for plain HTTP (no SSL) |
| `--disable-auth` | Skips login entirely — anyone on localhost can read/edit |

Verify it's running:

```bash
curl -s http://localhost:8080 | head -5
# Should return HTML
```

Open `http://localhost:8080` in your browser. You should see the LeafWiki UI.

---

### Step 2 — Prepare the Content ZIP

LeafWiki's importer accepts a `.zip` of markdown files. The folder structure inside
the zip becomes the page tree.

From the repo root, run:

```bash
cd /path/to/content-viewer

zip -r /tmp/content-import.zip content/ \
  --exclude "content/.DS_Store" \
  --exclude "content/*/.DS_Store" \
  --exclude "content/**/.DS_Store"
```

**Verify the zip looks right:**

```bash
unzip -l /tmp/content-import.zip | head -30
```

You should see paths like:
```
content/2026/03-march/week-12/2026-03-23-post-cloudflare-crawl-endpoint-api.md
content/show/episode-001.md
...
```

---

### Step 3 — Import Content into LeafWiki

1. Open `http://localhost:8080`
2. Click the **Admin** icon (gear/settings) in the sidebar
3. Navigate to **Import**
4. Upload `/tmp/content-import.zip`
5. Select **"Rewrite Obsidian-style wiki links"** if prompted (safe to enable even if files don't use them)
6. Click **Import**

LeafWiki will walk the zip's folder tree, create a page hierarchy matching the
folder structure, and populate each page with the file's markdown content
(frontmatter is preserved as-is in the page body).

---

### Step 4 — Verify the Import

After import, confirm:

- [ ] Tree nav on the left shows `2026 → 03-march → week-12 → ...`
- [ ] Clicking a page renders the markdown correctly
- [ ] Frontmatter is visible at the top of the page (LeafWiki does not parse YAML frontmatter — it renders it as a code block, which is acceptable for browsing)
- [ ] Tags from the `show/` and `meta/` folders appear as separate tree nodes

---

### Step 5 — Ongoing Use (Point at any folder)

To use LeafWiki with a **different content folder** in the future, just:

1. Zip the new folder
2. Repeat Step 3

Or, for a fully fresh instance pointed at new content:

```bash
# Stop existing instance
docker stop leafwiki && docker rm leafwiki

# Wipe data (optional — skip to keep history)
rm -rf ~/leafwiki-data

# Restart with same command from Step 1
docker run -d ...
```

---

### Step 6 (Optional) — Docker Compose for Repeatability

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
      - LEAFWIKI_ADMIN_PASSWORD=admin123
      - LEAFWIKI_ALLOW_INSECURE=true
      - LEAFWIKI_DISABLE_AUTH=true
    volumes:
      - ${HOME}/leafwiki-data:/app/data
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
| LeafWiki assigns its own internal page ordering | Re-order pages manually in the UI after import if sequence matters |
| Re-importing does not update existing pages — it creates duplicates | Stop container, wipe `~/leafwiki-data`, restart, re-import |
| `README.md` files in folders become pages named "README" | Rename them to `index.md` before zipping if you want cleaner names |

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
