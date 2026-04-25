---
title: cloudflare browser run crawl endpoint enables async site crawling for ai workflows
status: draft
stage: idea
platform: facebook
content_type: talking_head
pillar: growth
goal: engagement
publish_date: 2026-04-22
cta_keyword: CRAWLAPI
created: 2026-04-22
modified: 2026-04-22
tags:
  - facebook
  - talking-head
  - week-17
  - cloudflare
  - browser-run
  - web-scraping
  - ai-workflows
---

## Hook
If your AI workflow still depends on fragile DIY scrapers, Cloudflare’s `/crawl` endpoint is a cleaner way to crawl sites asynchronously.

## 3 Key Points
1. **What happened:** Cloudflare documents a Browser Run `/crawl` endpoint that starts crawl jobs from a URL, follows links by depth/page limits, and returns HTML, Markdown, or JSON.
2. **Why it matters now:** The job model is async by default, with explicit statuses, 7-day max runtime, and 14-day result retention, which is better for large indexing or RAG ingestion pipelines.
3. **What to do next:** Pilot one docs site crawl this week, store Markdown output, and compare reliability versus your current scraper plus retry scripts.

## Full Script (60–90 second talking-head)
Quick one for anyone building RAG pipelines or internal knowledge bots.

Cloudflare now exposes a `/crawl` endpoint in Browser Run that lets you start a crawl from one URL, follow links across the site, and get content back in HTML, Markdown, or JSON.

What I like here is the operational model. It is asynchronous, so you start a job, get a job ID, then poll status instead of keeping one long fragile request alive. Cloudflare also documents terminal states like completed, timed out, limit-cancelled, and errored, which makes monitoring cleaner.

There are practical limits too. Crawl jobs can run for up to seven days, and results are retained for fourteen days, so this is built for real ingestion workflows, not just demos.

If you are still gluing together custom Puppeteer scripts for multi-page ingestion, test this against one target site and measure reliability, retries, and total maintenance time.

## CTA
Comment **CRAWLAPI** and I’ll share a simple crawl-to-RAG checklist.

## Sources
- https://x.com/CloudflareDev
- https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/
- https://developers.cloudflare.com/api/resources/browser_rendering/subresources/crawl/methods/create/
- https://blog.cloudflare.com/agents-week-in-review/