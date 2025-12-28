# Content Viewer App

A minimal markdown viewer with folder-based navigation. No colors, no animations—just text.

## Features

- **Two-panel layout**: Folder tree on left, content on right
- **Auto-discovery**: Automatically detects new markdown files added to `content/` directory
- **Simple navigation**: Click files to view, folders to expand/collapse
- **Create files**: Use the "+ New" button to create new markdown files
- **Minimal design**: Black text on white background with gray accents

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. (Optional) Configure a custom content directory:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and set CONTENT_PATH to your desired directory
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Custom Content Directory

By default, the app reads markdown files from the `content/` folder in the project root. You can configure a different directory by setting the `CONTENT_PATH` environment variable:

```bash
# In .env.local or as an environment variable
CONTENT_PATH=/path/to/your/markdown/files
```

**Examples:**
- `CONTENT_PATH=./content` - Relative path (default)
- `CONTENT_PATH=/Users/username/notes` - Absolute path on macOS
- `CONTENT_PATH=/home/user/documents` - Absolute path on Linux
- `CONTENT_PATH=/var/www/content` - Server deployment path

This is useful for:
- **Server deployments**: Link to content stored outside the app
- **Docker**: Mount volumes to any container path
- **Development**: Test with different content directories

## Usage

### Viewing Files
- Click on any file in the left sidebar to view its content
- Current file is highlighted in gray
- File path shown in footer

### Creating New Files
1. Click the "+ New" button in the top right
2. Enter a filename (will auto-add `.md` extension if not provided)
3. Select a folder or leave as root
4. Click "Create"
5. File will appear in the tree and automatically open

### Auto-Discovery
The app automatically refreshes the file tree every 2 seconds. Just add a markdown file to any folder in `content/` and it will appear automatically.

## Project Structure

```
content-viewer/
├── app/
│   ├── api/files/          # API routes for file operations
│   │   ├── list/           # List all files and folders
│   │   ├── read/           # Read file content
│   │   └── create/         # Create new file
│   ├── page.tsx            # Main app page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Minimal global styles
├── components/
│   ├── FolderTree.tsx      # Left sidebar file tree
│   ├── ContentViewer.tsx   # Right panel markdown viewer
│   └── NewFileForm.tsx     # Modal for creating files
└── types/
    └── index.ts            # TypeScript type definitions
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **react-markdown** - Markdown rendering
- **Node.js fs** - File system operations

## Design Principles

- No colors (except gray for accents)
- No animations or transitions
- No visual clutter
- Auto-discovery of content changes
- Folder structure matches disk structure
