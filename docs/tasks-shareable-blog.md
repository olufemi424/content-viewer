# Shareable Blog/Journal Platform - Task Tracker

> Transform content-viewer into a shareable, URL-driven blog/journal platform

---

## Phase 1: URL-Based Document Routing ✅
**Goal:** URLs reflect current document for bookmarking and sharing

- [x] 1.1 Create `app/[...slug]/page.tsx` dynamic route
- [x] 1.2 Create `lib/content.ts` for unified content utilities
- [x] 1.3 Update sidebar to use Next.js `Link` components
- [x] 1.4 Create home page with document listing
- [x] 1.5 Handle 404 for missing documents

---

## Phase 2: Frontmatter Support ✅
**Goal:** Extract metadata from markdown files

- [x] 2.1 Install `gray-matter` package
- [x] 2.2 Create `lib/frontmatter.ts` parser
- [x] 2.3 Update types to include `Post` with frontmatter
- [x] 2.4 Display title/date in content viewer
- [x] 2.5 Add reading time calculation

---

## Phase 3: Blog Enhancements
**Goal:** Polish for public consumption

- [ ] 3.1 Add draft mode support (hide `draft: true` posts)
- [ ] 3.2 Add SEO meta tags (title, description)
- [ ] 3.3 Create RSS feed at `/feed.xml`

---

## Phase 4: Deploy
**Goal:** Make it live

- [ ] 4.1 Configure for Vercel deployment
- [ ] 4.2 Set up ISR (Incremental Static Regeneration)
- [ ] 4.3 Deploy to Vercel

---

## Decisions Made

| Question | Decision |
|----------|----------|
| Home page | Shows grouped list of all documents |
| URL style | Mirrors folder structure (`/topics/ai/gpt-evolution`) |
| Hosting | Vercel with ISR |

---

## Progress Log

### 2025-12-27
- Created task document
- ✅ Completed Phase 1: URL-based routing
  - Created `lib/content.ts` with slug-to-path utilities
  - Created `app/[...slug]/page.tsx` dynamic route
  - Created `FolderTreeWithLinks` component with Next.js Links
  - Created home page with grouped document listing
  - Added 404 page
- ✅ Completed Phase 2: Frontmatter support
  - Installed `gray-matter`
  - Created `lib/frontmatter.ts` parser
  - Added reading time calculation
  - Display title, date, reading time in content header
