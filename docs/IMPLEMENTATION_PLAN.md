# Content Viewer Enhancement Plan

## Goal
Transform the markdown viewer into a content management system with search, metadata, status tracking, tagging, and quick capture capabilities.

## Decisions
- **Priority**: `low / medium / high` text labels
- **Tags**: Auto-discovered from all files (no predefined list)
- **Status values**: `draft / in-progress / done`
- **Metadata editing**: Raw markdown (no form rewriting frontmatter)

## Core Challenges
- Files are plain markdown with no built-in metadata
- Need to add frontmatter (YAML) for metadata without breaking existing files
- `/api/files/list` must parse frontmatter for every file to support tree badges and filters
- Full-text search across all files is expensive — search is scoped to frontmatter + filenames; full-text is debounced
- `FolderTree.tsx` accumulates complexity across phases — extract `FileTreeNode.tsx` early
- UI must display and filter by status, priority, tags
- Create flow must support rapid idea capture with metadata

## Implementation Phases

### Phase 1: Metadata Foundation (Core)
**Goal**: Add structured data to markdown files without breaking existing ones

#### 1.1 Frontmatter Parser
- Add YAML frontmatter support to read/parse markdown metadata
- Format: Status, Priority, Tags, Created/Modified dates
- Backwards compatible: plain markdown files work without frontmatter
- Update API: `/api/files/read` returns metadata separately
- Update Components: Display frontmatter in content viewer

**Files to modify:**
- `app/api/files/read/route.ts` - Parse frontmatter from file content
- `components/ContentViewer.tsx` - Display metadata header above content
- `types/index.ts` - Add `Metadata` interface

**Schema (frontmatter YAML):**
```yaml
---
title: My Topic
status: draft | in-progress | done
priority: low | medium | high
tags:
  - tag1
  - tag2
created: 2026-02-20
modified: 2026-02-20
---
```

> Tags use YAML array format (not comma string) for reliable parsing.

#### 1.2 Update `/api/files/list` to Return Metadata
- Parse frontmatter for every file during the tree scan
- Return metadata alongside each `FileNode` so the client has it without separate reads
- Tags from all files are aggregated here for auto-discovery
- This is required by Phase 1.2, Phase 2.1, and Phase 2.2 — implement before those

**Files to modify:**
- `app/api/files/list/route.ts` - Parse frontmatter per file, aggregate tags list
- `types/index.ts` - Add `metadata` field to `FileNode`

#### 1.3 File Tree Display Enhancement
- Extract `FileTreeNode.tsx` from `FolderTree.tsx` to isolate per-node rendering — this prevents `FolderTree.tsx` from growing unmanageably across phases
- Show status badge next to filenames
- Show priority label (`low/med/high`)
- Show modified date in tree view

**Files to modify:**
- `components/FolderTree.tsx` - Extract node rendering into `FileTreeNode.tsx`
- `components/FileTreeNode.tsx` - New component, renders single file/folder row with badges
- `app/globals.css` - Add styles for status badges

### Phase 2: Search & Filter (Usability)
**Goal**: Find content quickly by text, status, tags, priority

#### 2.1 Search Implementation
- Add search input at top of sidebar
- **Scope**: real-time search across filenames + frontmatter fields (title, tags, status, priority)
- **Full-text search**: debounced (300ms), hits file content via `/api/files/search` endpoint — added only if frontmatter search proves insufficient
- Highlight matches in tree view
- Clear search to reset view

**Files to modify:**
- `app/page.tsx` - Add search state and filter logic
- `components/FolderTree.tsx` - Filter/highlight matched files
- `app/globals.css` - Search box styling

#### 2.2 Filter by Status/Tags/Priority
- Add filter buttons/dropdowns below search
- **Tags**: multi-select, auto-populated from aggregated tags returned by `/api/files/list`
- **Status**: checkboxes for `draft`, `in-progress`, `done`
- **Priority**: checkboxes for `low`, `medium`, `high`
- Combine filters with AND logic

**Files to modify:**
- `app/page.tsx` - Add filter state
- `components/FolderTree.tsx` - Apply filters to tree
- Create `components/FilterPanel.tsx` - New component for filters

### Phase 3: Enhanced Create Flow (Convenience)
**Goal**: Capture ideas with metadata in one action

#### 3.1 Enhanced New File Form
- Expand `NewFileForm.tsx` to include:
  - Title field (becomes H1 in file)
  - Status dropdown (`draft`, `in-progress`, `done`) — defaults to `draft`
  - Priority selector (`low`, `medium`, `high`)
  - Tag input (comma-separated, displayed as multi-select from auto-discovered list)
  - Optional initial content
- Generate frontmatter + title automatically
- Auto-set created date

**Files to modify:**
- `components/NewFileForm.tsx` - Extend form fields
- `app/api/files/create/route.ts` - Generate frontmatter on creation

#### 3.2 Quick Capture Shortcut
- Add keyboard shortcut (Ctrl+N or Cmd+N) to open new file form
- Pre-populate with default status (draft)

**Files to modify:**
- `app/page.tsx` - Add keyboard listener

### Phase 4: Polish (Nice-to-haves)
**Goal**: Quality of life improvements

#### 4.1 Inline Markdown Editor
- Allow editing the full file content (including frontmatter) directly in the viewer
- Textarea or simple editor toggled with an "Edit" button
- Save via a PUT/PATCH endpoint that writes the file
- Auto-update `modified` date in frontmatter on save

#### 4.2 Bulk Operations
- Checkbox to select multiple files
- Bulk status change
- Bulk tag assignment
- Bulk delete with confirmation

#### 4.3 Sort Options
- Sort by: name, created date, modified date, priority, status
- Persist sort preference in localStorage

## Database Changes
- No database needed: metadata stored in file frontmatter
- Optional: localStorage for UI state (search, filters, sort)

## Backwards Compatibility
- All changes are non-breaking
- Existing markdown files work without frontmatter
- If file has no metadata, show defaults (status: "untagged", no priority, etc.)

## Migration Path
- Existing files don't require modification
- Users can add metadata incrementally to files
- Batch tool could be created to add frontmatter to existing files (future)

## Success Criteria
1. ✓ Can capture new ideas with metadata in <10 seconds
2. ✓ Can search for topics by text or tag
3. ✓ Can filter by status/priority
4. ✓ Can see at a glance which content is draft/done
5. ✓ No existing files are broken

## Open Questions
- Should deleted files go to trash or delete immediately?
