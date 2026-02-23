# Architecture Overview

## System Diagram

```
Browser (React SPA)
│
├── app/page.tsx                  ← Single page, all state lives here
│   ├── components/FolderTree     ← Sidebar file tree + search/filter
│   │   └── FileTreeNode          ← Single row with status/priority badges
│   ├── components/FilterPanel    ← Status / priority / tag chip filters
│   ├── components/ContentViewer  ← Markdown renderer + breadcrumbs + TOC + prev/next
│   │   ├── Breadcrumbs           ← Clickable path segments
│   │   └── TableOfContents       ← Sticky right panel, auto-parsed from headings
│   ├── components/FolderIndex    ← Auto-generated index when a folder is selected
│   └── components/NewFileForm    ← Modal for creating files with metadata
│
└── Next.js API Routes (Node.js, server-side)
    ├── GET  /api/files/list      ← Scans content/ dir, parses frontmatter, returns tree + allTags
    ├── GET  /api/files/read      ← Reads one file, returns parsed metadata + body
    ├── POST /api/files/create    ← Creates file with auto-generated frontmatter
    └── PUT  /api/files/save      ← Overwrites file, updates modified date
```

## Data Flow

### Loading the tree
1. `page.tsx` calls `GET /api/files/list` on mount and every 2 seconds
2. Server scans `content/` recursively with `fs.readdirSync`
3. Each `.md` file is read and its frontmatter parsed (title, status, priority, tags, dates)
4. Server returns `{ tree: FileNode[], allTags: string[] }`
5. `page.tsx` derives flat ordered list (`lib/fileList.ts`) for prev/next lookup

### Opening a file
1. User clicks a file → `handleFileSelect(path)` → `GET /api/files/read?path=...`
2. Server reads file, splits frontmatter from body via `lib/frontmatter.ts`
3. Returns `{ content: string, metadata: Metadata, name, path }`
4. `ContentViewer` renders body via `react-markdown`, metadata bar, TOC, breadcrumbs, prev/next

### Opening a folder
1. User double-clicks a folder in the tree (or clicks a breadcrumb segment)
2. `handleNavigate(folderPath)` sets `selectedFolder` state
3. `getFolderChildren(tree, path)` extracts direct children from the in-memory tree
4. `FolderIndex` renders a grid/list of those children — no extra API call

### Creating a file
1. `NewFileForm` collects: filename, title, status, priority, tags, folder
2. `POST /api/files/create` → server generates YAML frontmatter + body, writes to disk
3. Auto-refresh picks up the new file within 2 seconds

### Metadata storage
All metadata is stored as YAML frontmatter inside each `.md` file:
```yaml
---
title: My Topic
status: draft
priority: high
tags:
  - youtube
  - react
created: 2026-02-20
modified: 2026-02-23
---
```
No database is used. The file system is the source of truth.

## Key Libraries

| Library | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework, API routes, file serving |
| react-markdown | Renders markdown body to HTML |
| Node.js `fs` | All file system operations (server-side only) |
| Custom `lib/frontmatter.ts` | YAML frontmatter parser/serializer (no external dep) |
| Custom `lib/fileList.ts` | Tree flattening, prev/next, folder children helpers |

---

# Limitations

## Performance

- **Full tree scan on every request** — `GET /api/files/list` reads and parses frontmatter from every `.md` file on each poll (every 2 seconds). With hundreds of files this becomes noticeably slow.
- **No caching** — there is no in-memory cache or incremental update. Every poll re-reads all files from disk.
- **Auto-refresh interval is fixed** — the 2-second `setInterval` runs even when the tab is hidden or no changes have occurred.

## Search

- **No full-text search** — search only matches against filenames, frontmatter title, and tags. The body content of files is not indexed or searched.
- **Client-side only** — filtering happens in-browser after the full tree is loaded. Very large trees will slow down the filter loop.

## File Operations

- **No delete** — there is no UI or API endpoint to delete files.
- **No rename / move** — files cannot be renamed or moved between folders through the UI.
- **No conflict resolution** — if two browser sessions create files with the same name simultaneously, one write will overwrite the other silently.
- **No undo** — saving a file (`PUT /api/files/save`) overwrites immediately with no backup or history.

## Metadata

- **Frontmatter is not validated on read** — malformed YAML is silently ignored; the file appears with no metadata.
- **`modified` date is only updated via the save API** — editing the file directly on disk does not update the `modified` field.
- **No schema enforcement** — nothing prevents a file from having arbitrary or misspelled frontmatter keys.

## Navigation

- **TOC uses client-side anchor links** — headings need to be rendered with matching `id` attributes for TOC links to scroll correctly. `react-markdown` does not add `id`s to headings by default, so TOC links currently scroll to the top of the page instead of the heading.
- **Folder index has no pagination** — all children are listed at once regardless of count.
- **Prev/Next order is depth-first alphabetical** — the order matches the sidebar tree but cannot be customized.

## Infrastructure

- **Single-user, local only** — no authentication, no multi-user support. All file operations run with the permissions of the Node.js process.
- **No persistence of UI state** — search query, active filters, and selected file are reset on page reload (not persisted to `localStorage` or URL).
- **No deployment story** — the app reads/writes from `content/` relative to the server's working directory. Deploying to a cloud host (Vercel, etc.) would break file writes since the filesystem is ephemeral.
