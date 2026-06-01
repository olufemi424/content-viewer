---
title: "Cloudflare Browser Run /crawl: One Endpoint for Multi-Page Web Data"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-tooling
goal: teach
publish_date: 2026-06-01
cta_keyword: browser-run
created: 2026-06-01
modified: 2026-06-01
tags:
  - cloudflare
  - browser-run
  - web-scraping
  - rag
  - solo-builders
---

## Hook
You can now crawl an entire site for your AI workflow without running your own browser farm.

## Why this matters
If you are a solo builder shipping RAG, monitoring, or research tools, collection is usually the brittle part: headless infra, retries, and changing page structures. Cloudflare's Browser Run /crawl gives you a managed path to crawl and extract content across linked pages, so you can spend time on product logic instead of scraper plumbing.

## Mechanism
/crawl starts from one URL, follows internal links with configurable depth/page limits, and returns results in HTML, Markdown, or JSON.
Flow is two-step:
1. POST to start crawl job and get job id.
2. GET with job id to poll status/results.
Operational constraints to mention on camera:
- Crawl jobs can run up to 7 days.
- Results are retained for 14 days.
- Free plan has stricter crawl limits.
- Browser Run changelog (2026-05-28) adds quickAction() in Workers, reducing token/external-request overhead for adjacent quick actions.

## Proof/use case
Practical creator/operator use case: nightly docs ingestion.
Point /crawl at your docs root, output Markdown, then feed changed pages into your vector index. This reduces stale-docs incidents and cuts maintenance compared with custom Puppeteer fleets. The official docs explicitly position /crawl for knowledge-base and RAG-style pipelines, which aligns with this workflow.

## CTA
CTA type: Build-in-public challenge
Exact line: "If you’re building with RAG this week, replace one manual scraper with /crawl and tell me how much ops time you saved."

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Intermediate

## Why now (1 sentence)
Cloudflare's recent Browser Run updates and the current push toward agentic data pipelines make managed crawl infrastructure newly practical for one-person teams.

## 3 hook options (<12 words each)
- Stop maintaining scrapers: use this crawl endpoint instead.
- Your RAG pipeline is failing at ingestion.
- One API call starts your whole site crawl.

## Final record-ready script
"Most AI builders are over-engineering ingestion.
Here’s the shortcut: Cloudflare Browser Run has a /crawl endpoint that starts from one URL, follows links, and gives you output as Markdown, JSON, or HTML.

Why this matters: if you’re a solo builder, scraper maintenance is where projects quietly die. Selectors break, retries explode, and now your AI product is a browser-ops project.

Mechanically, it’s simple: send a POST to start the crawl job, get an id, then poll with GET for status and results. Cloudflare documents hard limits too: jobs can run up to seven days and results are kept for fourteen.

Real use case: nightly docs ingestion for your RAG app. Crawl your docs root, diff pages, and re-index only what changed. Less infra, less drift, fewer stale answers.

If you’re building with RAG this week, replace one manual scraper with /crawl and tell me how much ops time you saved."

## Shot list by timestamp (A-roll/B-roll)
- 0:00-0:07 A-roll: direct to camera, problem statement on ingestion pain.
- 0:07-0:20 B-roll: Cloudflare Browser Run docs homepage and /crawl docs section.
- 0:20-0:38 A-roll: explain 2-step POST/GET job flow.
- 0:38-0:55 B-roll: terminal curl examples + simple job-id polling graphic.
- 0:55-1:10 A-roll: nightly docs ingestion use case and ops-time framing.
- 1:10-1:18 A-roll: CTA delivery.

## On-screen text cues
- Stop babysitting scrapers
- /crawl -> job id -> poll results
- HTML | Markdown | JSON
- 7-day job max, 14-day retention
- Use case: nightly docs -> RAG re-index

## Caption options: short + long
Short: "Cloudflare /crawl might replace your custom scraper stack."
Long: "If your RAG app keeps breaking at ingestion, check Cloudflare Browser Run /crawl: start from one URL, follow links, return Markdown/JSON/HTML, then re-index only changed docs. Lower ops drag for solo builders."

## CTA type + exact line
Type: Build-in-public challenge
Line: "Replace one manual scraper with /crawl this week and report your time savings."

## Thumbnail text options (3)
- Kill Your Scraper Stack
- RAG Ingestion, Simplified
- One Endpoint, Full Crawl

## Risk check (claims needing cautious phrasing)
- Avoid saying newly launched /crawl unless date-verified for that exact feature; safer phrasing: available in Browser Run docs.
- Do not claim cost reductions as guaranteed; phrase as can reduce maintenance overhead.
- Keep agentic pipeline as trend framing, not hard quantitative claim.

## Sources
- https://developers.cloudflare.com/browser-run/
- https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/
- https://developers.cloudflare.com/browser-run/changelog/
