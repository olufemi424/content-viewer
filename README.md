# Content Viewer App

A minimal markdown viewer with folder-based navigation. No colors, no animations—just text.

## Features

- **Two-panel layout**: Folder tree on left, content on right
- **Auto-discovery**: Automatically detects new markdown files added to `content/` directory
- **Simple navigation**: Click files to view, folders to expand/collapse
- **Stage filters**: Filter sidebar content by execution stage (idea → analyzed)
- **Today Focus panel**: Quick view of what to draft, record, and post next
- **Week Dashboard**: Stage breakdown + quick week/root navigation for the selected week folder
- **Quick stage updates**: Move a post through idea → drafted → recorded → posted → analyzed from the viewer
- **Minimal design**: Black text on white background with gray accents

## Getting Started

1. Make sure the `content/` directory exists at `../content/` (one level up from this project)
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Viewing Files
- Click on any file in the left sidebar to view its content
- Current file is highlighted in gray
- File path shown in footer

### Auto-Discovery
The app automatically refreshes the file tree every 2 seconds. Just add a markdown file to any folder in `content/` and it will appear automatically.

## Suggested Content Folder Convention

Use this structure inside `content/` to organize by year, month, and week:

```txt
content/
  2026/
    03-march/
      week-10/
        2026-03-02-my-topic.md
```

This makes weekly planning and monthly review easy in the sidebar tree.

## Project Structure

```
content-viewer/
├── app/
│   ├── api/files/          # API routes for file operations
│   │   ├── list/           # List all files and folders
│   │   ├── read/           # Read file content
│   ├── page.tsx            # Main app page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Minimal global styles
├── components/
│   ├── FolderTree.tsx      # Left sidebar file tree
│   └── ContentViewer.tsx   # Right panel markdown viewer
└── types/
    └── index.ts            # TypeScript type definitions
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **react-markdown** - Markdown rendering
- **Node.js fs** - File system operations

## Topic Ingestion API (Reviewer-Gated MVP)

`POST /api/ingest-topics`

- Only topics in `reviewer_approved` state with `reviewerGate.decision=approved` are eligible for writes.
- Row writes are append-only to Google Sheets.
- Idempotency is enforced with `idempotencyKey` (payload-level and existing-sheet checks).
- Ingestion does **not** publish content. `automate-n8n` stays responsible for generation/image/publish.

### Required env vars

```bash
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SHEETS_SHEET_NAME=topics
GOOGLE_SERVICE_ACCOUNT_EMAIL=svc-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Verify script

With app running locally:

```bash
npm run verify:ingest-topics
```

The script runs a dry-run payload and checks approved/duplicate/unapproved behavior.

## Design Principles

- No colors (except gray for accents)
- No animations or transitions
- No visual clutter
- Auto-discovery of content changes
- Folder structure matches disk structure
