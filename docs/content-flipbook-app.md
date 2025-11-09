# Content Viewer App

A minimal markdown viewer with folder-based navigation. No colors, no animations—just text.

---

## Core Concept

Simple two-panel layout: folder tree on the left, content on the right. Add markdown files to folders and they automatically appear in the tree.

```
┌──────────────────────┬────────────────────────────────────────┐
│ content/             │  # Digital Products Guide              │
│                      │                                        │
│ ▼ idea-docs/         │  ## Key Points                         │
│   • digital-prod...  │  - Getting Started: Begin by...        │
│   • iam.md           │  - Building the Branded Page: Focus... │
│                      │  - Monetization Basics: Sell digital...│
│ ▼ gpt-evolution/     │                                        │
│   • gpt-evolution.md │  ## Steps to Get Started               │
│   • gpt-technical.md │  To launch your branded page and...    │
│   • gpt-components...│                                        │
│   • gpt-ascii-arc... │                                        │
│                      │                                        │
└──────────────────────┴────────────────────────────────────────┘
  Left: Folder Tree         Right: Content Display
```

---

## Key Features

### 1. Folder Tree Navigation

Left sidebar shows directory structure. Click any file to view its content.

```
┌────────────────────┐
│ content/           │
│                    │
│ ▶ idea-docs/       │  ← Click to expand/collapse
│                    │
│ ▼ gpt-evolution/   │  ← Expanded folder
│   • gpt-evolut...  │  ← Click to view file
│   • gpt-techni...  │
│   • gpt-compon...  │
│   • gpt-ascii-...  │
│                    │
│ • iam.md           │  ← Root-level file
│                    │
└────────────────────┘
```

**Behavior:**
- Folders collapsible/expandable
- Click file → displays content on right
- Current file highlighted in gray
- No icons except folder arrows (▶/▼)

---

### 2. Auto-Discovery

App watches the `content/` directory. When you add a new markdown file, it automatically appears in the tree.

```
Before:                       After adding file:
┌──────────────┐             ┌──────────────┐
│ content/     │             │ content/     │
│              │             │              │
│ ▼ ideas/     │   Add →     │ ▼ ideas/     │
│   • file1.md │   new       │   • file1.md │
│              │   file      │   • file2.md │ ← New!
│              │             │              │
└──────────────┘             └──────────────┘

Action: Save "file2.md" in ideas/ folder
Result: File appears in tree immediately
```

**How it works:**
- File system watcher monitors `content/` directory
- Detects new `.md` files
- Rebuilds tree structure
- No manual refresh needed

---

### 3. Plain Text Display

Content area renders markdown as simple formatted text. White background, black text, gray for secondary elements.

```
┌───────────────────────────────────────┐
│                                       │
│  # Main Heading                       │
│                                       │
│  Regular paragraph text goes here.    │
│  Just plain black text on white.      │
│                                       │
│  ## Subheading                        │
│                                       │
│  - Bullet point one                   │
│  - Bullet point two                   │
│                                       │
│  ```                                  │
│  Code block in gray                   │
│  ```                                  │
│                                       │
└───────────────────────────────────────┘
```

**Styling:**
- Headings: Bold, larger text
- Body: Regular text
- Links: Underlined
- Code blocks: Light gray background
- No colors, no animations

---

### 4. Add New File

Simple form to create a new markdown file in any folder.

```
┌────────────────────────────────┐
│  New File                      │
├────────────────────────────────┤
│                                │
│  Filename:                     │
│  [my-new-idea.md         ]     │
│                                │
│  Folder:                       │
│  [ idea-docs/            ▼]    │
│                                │
│  [Cancel]  [Create]            │
│                                │
└────────────────────────────────┘
```

**Process:**
1. Click "New" button (top of sidebar)
2. Enter filename
3. Select folder from dropdown
4. Click Create
5. File appears in tree immediately
6. Opens in content viewer

---

## Layout Details

### Full Interface

```
┌────────────────────────────────────────────────────────────┐
│  Content Viewer                                            │
├───────────────┬────────────────────────────────────────────┤
│               │                                            │
│  [+ New]      │  Digital Products Guide                    │
│               │  ────────────────────────────────────      │
│ content/      │                                            │
│               │  Key Points                                │
│ ▶ idea-docs/  │  • Getting Started: Begin by selecting...  │
│               │  • Building the Branded Page: Focus on...  │
│ ▼ gpt-evolu...│                                            │
│   • gpt-evo...│  Steps to Get Started                      │
│   • gpt-tec...│  To launch your branded page and course... │
│   • gpt-com...│                                            │
│               │                                            │
│ • iam.md      │                                            │
│               │                                            │
│               │                                            │
│               │                                            │
│               │                                            │
├───────────────┴────────────────────────────────────────────┤
│  idea-docs/digital-products.md                             │
└────────────────────────────────────────────────────────────┘
    Sidebar: 250px                Content: Remaining width
    Footer shows current file path
```

**Dimensions:**
- Sidebar: Fixed 250px width
- Content: Fills remaining space
- Resizable divider between panels
- Footer: 30px height for file path

---

## User Flow

```
Start App
    │
    ▼
Scan content/
directory
    │
    ▼
Build folder tree
    │
    ▼
Display tree in
left sidebar
    │
    ├──→ Click file ──→ Display content
    │                   on right panel
    │                        │
    │                        ▼
    │                   Read content
    │                        │
    │                        └──→ Click another file
    │
    ├──→ Click [+ New] ──→ Open form
    │                          │
    │                          ▼
    │                     Enter filename
    │                     & select folder
    │                          │
    │                          ▼
    │                     Click [Create]
    │                          │
    │                          ▼
    │                     Write file to disk
    │                          │
    │                          ▼
    │                     Auto-detected
    │                          │
    │                          └──→ Appears in tree
    │
    └──→ Add file manually ──→ Auto-detected
        (via editor/finder)         │
                                    └──→ Appears in tree
```

---

## Architecture

```
┌────────────────────────────────────────┐
│          Browser UI                    │
│                                        │
│  ┌──────────────┐  ┌────────────────┐ │
│  │ Folder Tree  │  │    Content     │ │
│  │  Component   │  │   Component    │ │
│  └──────────────┘  └────────────────┘ │
│                                        │
└───────────────┬────────────────────────┘
                │
┌───────────────┴────────────────────────┐
│         Next.js API Routes             │
│                                        │
│  /api/files/list      → Get tree       │
│  /api/files/read      → Get content    │
│  /api/files/create    → New file       │
│                                        │
└───────────────┬────────────────────────┘
                │
┌───────────────┴────────────────────────┐
│       File System (Node.js)            │
│                                        │
│  • fs.readdir() - List files/folders  │
│  • fs.readFile() - Read markdown       │
│  • fs.writeFile() - Create new file    │
│  • chokidar - Watch for changes        │
│                                        │
└───────────────┬────────────────────────┘
                │
┌───────────────┴────────────────────────┐
│          content/ Directory            │
│                                        │
│  idea-docs/                            │
│  gpt-evolution/                        │
│  ...                                   │
│                                        │
└────────────────────────────────────────┘
```

---

## Tech Stack

```
Frontend
├─ Next.js (React framework)
├─ TypeScript
├─ react-markdown (render .md files)
└─ CSS (no Tailwind, just plain styles)

Backend
├─ Next.js API routes
├─ Node.js fs module
└─ chokidar (file watcher)

Data Flow
└─ File system as single source of truth
```

---

## File Structure

```
content-viewer/
├── src/
│   ├── app/
│   │   ├── page.tsx                 (Main app)
│   │   ├── layout.tsx               (Shell)
│   │   └── globals.css              (Minimal styles)
│   │
│   ├── components/
│   │   ├── FolderTree.tsx           (Left sidebar)
│   │   ├── ContentViewer.tsx        (Right panel)
│   │   └── NewFileForm.tsx          (Modal form)
│   │
│   └── app/api/
│       ├── files/
│       │   ├── list/route.ts        (GET folder tree)
│       │   ├── read/route.ts        (GET file content)
│       │   └── create/route.ts      (POST new file)
│       └── watch/route.ts           (WebSocket for changes)
│
├── content/                         (Your markdown files)
│   ├── idea-docs/
│   ├── gpt-evolution/
│   └── ...
│
├── package.json
└── tsconfig.json
```

---

## Key Interactions

### Viewing a File

```
User Action                API Call              File System
───────────                ────────              ───────────
Click "file.md"
in tree          ──→  GET /api/files/read  ──→  fs.readFile(
                      ?path=idea-docs/           "content/idea-docs/
                            file.md               file.md")
                                            ──→  Return content
                 ◄──  Response with
                      markdown text

Display content
in right panel
```

### Creating a File

```
User Action                API Call              File System
───────────                ────────              ───────────
Fill form:
- name: "test.md"
- folder: "ideas/"

Click [Create]   ──→  POST /api/files/create ──→ fs.writeFile(
                      body: {                     "content/ideas/
                        path: "ideas/",           test.md",
                        name: "test.md"           "# Test\n\n")
                      }
                                               ──→ Write to disk
                 ◄──  Success response

Chokidar detects
new file         ──→  Emit update event

Frontend receives
update           ──→  Refresh folder tree

New file appears
in tree
```

---

## Keyboard Shortcuts (Optional)

```
Key              Action
─────────────    ──────────────────────
Cmd/Ctrl + N     New file
Cmd/Ctrl + K     Focus search (if added later)
↑ / ↓            Navigate file list
Enter            Open selected file
```

Minimal set—only if useful. Otherwise, just mouse clicks.

---

## Design Principles

### 1. No Visual Clutter
```
❌ Bad: Colors, gradients, shadows
✓  Good: Black text, white background, gray accents
```

### 2. No Animations
```
❌ Bad: Fade-ins, slide transitions, loading spinners
✓  Good: Instant updates, no motion
```

### 3. Auto-Everything
```
❌ Bad: Manual refresh button
✓  Good: Auto-detects file changes
```

### 4. Folder-First Navigation
```
❌ Bad: Flat list, search-first, tags
✓  Good: Tree structure matches disk structure
```

---

## What This App Does

✓ Displays markdown files from `content/` directory
✓ Shows folder structure in left sidebar
✓ Renders selected file in right panel
✓ Auto-detects new files added to folders
✓ Provides simple form to create new files
✓ No styling beyond basic formatting
✓ No animations or transitions

---

## What This App Doesn't Do

✗ Search functionality
✗ Tags or categories
✗ Favorites or bookmarks
✗ Export features
✗ Themes or color schemes
✗ Mobile-specific views
✗ Collaborative editing
✗ Version history

Keep it simple. Add features only if absolutely needed.

---

## Example: Adding Content to the App

### Scenario: You write a new idea

```
Step 1: Create the file
────────────────────────
Open your editor (VSCode, vim, etc.)
Create: content/ideas/saas-product.md
Write content, save file

Step 2: App auto-detects
─────────────────────────
content-viewer/ watches content/ directory
Detects new file via chokidar
Rebuilds folder tree

Step 3: File appears in tree
──────────────────────────────
┌────────────────┐
│ content/       │
│                │
│ ▼ ideas/       │
│   • idea1.md   │
│   • saas-pr... │ ← New file appears
│                │
└────────────────┘

Step 4: Click to view
──────────────────────
Click "saas-pr..."
Content displays on right panel
```

**Total steps for you:** Create file, save. That's it.
**App handles:** Detection, display, navigation.

---

## Summary

This is a **dead-simple markdown file viewer**:

1. **Left panel:** Folder tree (matches `content/` directory structure)
2. **Right panel:** Markdown content (plain text, no styling)
3. **Auto-discovery:** Add `.md` files to folders → they appear automatically
4. **New file form:** Optional UI to create files without leaving app

**Visual style:**
- White background
- Black text
- Gray for secondary elements (file paths, code blocks)
- No colors, no animations, no effects

**Goal:**
Simple way to navigate and view your markdown content that mirrors your actual folder structure. Add files anywhere in `content/` and they show up instantly.

```
          Add file to folder
                 │
                 ▼
       ┌─────────────────┐
       │  Auto-detected  │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Appears in tree │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │  Click to view  │
       └─────────────────┘
```

---

**Next Step:** Build this minimal app with the tech stack outlined above.
