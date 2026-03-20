---
title: Cloudflare’s new /crawl endpoint can replace your custom site-crawling glue code
status: draft
stage: idea
platform: facebook
content_type: talking_head
pillar: growth
goal: engagement
publish_date: 2026-03-20
cta_keyword: CRAWLCHECK
created: 2026-03-20
modified: 2026-03-20
tags:
  - facebook
  - talking-head
  - week-12
  - cloudflare
  - browser-rendering
  - developer-tools
---

## Hook
If you’re still stitching together Puppeteer + queues + parsers just to crawl sites, Cloudflare just shipped a much simpler path.

## 3 Key Points
1. **What changed:** Cloudflare announced a new **`/crawl` endpoint** in Browser Rendering (open beta) that can crawl an entire site from one API call and return content as HTML, Markdown, or structured JSON.
2. **Why it matters:** This removes a lot of homegrown crawler plumbing (URL discovery, rendering, pagination loops, result formatting), especially for RAG pipelines and content monitoring workflows.
3. **Practical move today:** Run a small bake-off this week: compare your current crawler vs. Cloudflare `/crawl` on the same domain, then measure setup time, crawl coverage, and retry/error handling complexity.

## Full Script (60-90 seconds)
Quick one for developers building RAG, internal search, or site monitoring pipelines.

Cloudflare added a new `/crawl` endpoint in Browser Rendering that lets you kick off a full-site crawl with a single API request. It runs asynchronously, gives you a job ID, and returns results in formats like HTML, Markdown, and structured JSON.

Why this is high-signal: most teams don’t struggle with the idea of crawling — they struggle with the glue code around crawling. URL discovery, JavaScript rendering, queue orchestration, retries, normalization, output formatting… it adds up fast.

The practical win here is reducing that operational overhead. Cloudflare also states the crawler identifies as a bot and respects robots.txt and AI Crawl Control by default, which matters if you care about compliant collection behavior.

If you already have a crawler, don’t rewrite everything blindly. Do a controlled comparison on one target site this week: same crawl scope, same output requirements, then compare implementation time and reliability.

If the managed endpoint gives you acceptable coverage with less maintenance burden, that’s an easy engineering trade.

## CTA
Comment **CRAWLCHECK** and I’ll share a quick evaluation checklist to compare managed crawl APIs vs in-house crawler stacks.

## Sources
- https://developers.cloudflare.com
- https://developers.cloudflare.com/changelog/post/2026-03-10-br-crawl-endpoint/
- https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/
