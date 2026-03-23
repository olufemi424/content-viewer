---
title: Cloudflare’s /crawl endpoint is in open beta — and it gives dev teams a cleaner way to crawl whole sites
status: draft
stage: idea
platform: facebook
content_type: talking_head
pillar: growth
goal: engagement
publish_date: 2026-03-23
cta_keyword: CRAWLCHECKLIST
created: 2026-03-23
modified: 2026-03-23
tags:
  - facebook
  - talking-head
  - week-13
  - cloudflare
  - browser-rendering
  - web-scraping
  - developer-productivity
---

## Hook
If your crawler stack keeps breaking every time a site layout changes, Cloudflare’s new `/crawl` API flow is a practical reset: submit one start URL, get a job ID, and pull results asynchronously.

## 3 Key Points
1. **What changed:** Cloudflare announced a new Browser Rendering `/crawl` endpoint in open beta that can discover and crawl pages from a starting URL.
2. **What is verified in docs:** Cloudflare’s REST docs confirm a two-step async flow (POST to start, GET by job ID), configurable crawl depth/page limits, and multiple outputs (HTML, Markdown, JSON).
3. **Operational detail teams should note:** The docs also state crawl jobs can run up to seven days, results are retained for 14 days after completion, and free plans have additional crawl-specific limits.

## Full Script (60–90 second talking-head)
Quick update for teams running scraping or RAG ingestion workflows.

Cloudflare’s Browser Rendering product now has a `/crawl` endpoint in open beta. Instead of managing page-by-page scripts, you submit one starting URL, receive a job ID, and poll for results as pages are discovered.

The practical upside is cleaner operations: one async job lifecycle instead of dozens of brittle fetch chains.

Cloudflare’s docs show you can control crawl scope with depth and page limits, and choose output formats like HTML, Markdown, or JSON depending on your downstream pipeline.

Important detail: this is not “fire and forget forever.” The documentation says crawl jobs have a maximum run time of seven days, and results are kept for 14 days after completion. So teams should design storage and retries intentionally, not assume permanent result retention.

Best rollout move: pilot this on one noisy workflow — docs indexing, competitor-monitoring, or content refresh. Compare failure rate, maintenance effort, and output quality against your current crawler before expanding.

That gives you an engineering decision backed by data, not API hype.

## CTA
Comment **CRAWLCHECKLIST** and I’ll share a one-sprint checklist to compare crawler reliability, data quality, and maintenance cost.

## Sources
- https://developers.cloudflare.com
- https://developers.cloudflare.com/changelog/post/2026-03-10-br-crawl-endpoint/
- https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/
- https://developers.cloudflare.com/browser-rendering/rest-api/
- https://developers.cloudflare.com/ai-crawl-control/
