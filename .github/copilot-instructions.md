# Content Viewer - Copilot Instructions

## Build & Development Commands

```bash
# Development server (runs on port 3001)
npm run dev

# Production build
npm build

# Start production server
npm start
```

**Note**: The `content/` directory is expected at the project root. The app auto-discovers markdown files in this directory every 2 seconds.

## Architecture

### Core Concept
A minimal two-panel markdown viewer with **client-side file tree navigation** and **server-side file operations**. The file tree is fetched once on mount and refreshed every 2 seconds using `chokidar` on the backend to detect changes.

### Data Flow
1. **Client** (`app/page.tsx`): React component manages UI state (selected file, sidebar state)
2. **API Layer** (`app/api/files/`): Route handlers for listing, reading, and updating markdown metadata
   - `GET /api/files/list` - Returns full file tree + folder list from `content/` dir
   - `GET /api/files/read` - Reads markdown file content (query: `path`)
   - `PATCH /api/files/update-stage` - Updates a markdown file's `stage` in frontmatter
3. **Backend**: Uses Node.js `fs` to scan `content/` directory recursively

### Key Components
- **FolderTree.tsx** - Renders collapsible folder structure; clicking files fetches content
- **ContentViewer.tsx** - Displays markdown using `react-markdown`; includes navigation and stage update controls
- **FontSwitcher.tsx** - Client-side font toggle (stored in localStorage)

### Type System
All types in `types/index.ts`:
- `FileNode` - Tree structure (name, path, type, children)
- `FileContent` - File data (path, content, name)

## Key Conventions

### File Paths
- All paths are **relative to the `content/` directory** (no leading `/`)
- Path format: `folder/subfolder/filename.md` (forward slashes)
- Root files have empty `relativePath`

### API Routes
- Use standard HTTP methods (GET for reads, PATCH for metadata updates)
- Query parameters for GET requests: `?path=folder/file.md`
- Body for stage updates: `{ path: string, stage: "idea" | "drafted" | "recorded" | "posted" | "analyzed" }`

### Styling
- **No colors** (black text, white background, gray accents) - maintained in `globals.css`
- **No animations** - design principle for minimal UI
- Responsive layout: sidebar collapses on mobile via `isSidebarOpen` state

### Environment Setup
- Optional `CONTENT_PATH` env var (not currently used in routes, but documented in `.env.example`)
- Default content directory is hardcoded as `./content` relative to project root in `app/api/files/list/route.ts`

### Client State Management
- Single-page with local React state (no external state library)
- Auto-refresh of file tree: `setInterval(loadFileTree, 2000)` in `useEffect`

### File System Operations
- Skips hidden files (names starting with `.`)
- Uses Node.js `fs.readdirSync` for scanning, `fs.readFileSync` for reading

## Testing & Linting
No linting, testing, or build tools currently configured. Focus on TypeScript type checking via `tsc`.

## Important File Locations
- **Main page**: `app/page.tsx`
- **API routes**: `app/api/files/` (subdirectories: list, read, update-stage)
- **Components**: `components/` (Tree, Viewer, FontSwitcher, filters/panels)
- **Content directory**: `../content/` (external to project, must exist)
- **Types**: `types/index.ts`
- **Styles**: `app/globals.css`
