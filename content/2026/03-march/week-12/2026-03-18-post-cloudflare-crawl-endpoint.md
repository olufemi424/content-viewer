---
title: Cloudflare’s new /crawl endpoint: practical checklist before you plug it into RAG
status: draft
stage: idea
platform: facebook
content_type: talking_head
pillar: growth
goal: engagement
publish_date: 2026-03-18
cta_keyword: CRAWLCHECK
created: 2026-03-18
modified: 2026-03-18
tags:
  - facebook
  - talking-head
  - week-12
  - cloudflare
  - browser-rendering
  - rag
---

## Hook
If your retrieval quality is dropping because docs go stale, Cloudflare’s new `/crawl` endpoint is a fast way to turn “manual scraping scripts” into a repeatable ingestion job.

## 3 Key Points
1. **What is confirmed:** Cloudflare announced Browser Rendering `/crawl` in open beta (Mar 10, 2026), where you submit one starting URL and get crawl results back as HTML, Markdown, or structured JSON.
2. **Why it matters for dev teams:** The flow is asynchronous (POST to start, GET with job ID to retrieve status/results), which fits scheduled content refresh pipelines better than synchronous scraping calls.
3. **Implementation details you should not miss:** Cloudflare documents controls for depth/page limits/include-exclude paths plus incremental crawling options (`modifiedSince`, `maxAge`) to reduce repeated work and ingestion cost.

## Full Script (60-90 seconds)
Quick dev workflow update if you run RAG or internal knowledge ingestion.

Cloudflare’s Browser Rendering product now includes a `/crawl` endpoint in open beta. Officially, the model is simple: you send one starting URL, Cloudflare discovers pages, and you can retrieve output in HTML, Markdown, or structured JSON.

The useful part is not just crawling—it’s the job model. You initiate the crawl and get a job ID immediately, then poll for status and fetch results when complete. That makes this much easier to plug into nightly or hourly refresh workflows.

In the docs, they also expose practical controls: scope by depth and page limits, include or exclude URL patterns, and use incremental options like `modifiedSince` and `maxAge` so you avoid reprocessing unchanged pages.

Another key operational detail from Cloudflare: the crawler is described as a signed agent and they state it respects `robots.txt` and AI Crawl Control by default. So for teams with compliance requirements, this is not a minor footnote.

Simple rollout play: start with one docs section, ingest Markdown into your existing chunking + embeddings flow, track freshness and retrieval quality for one week, then expand scope only after you validate cost and relevance gains.

## CTA
Comment **CRAWLCHECK** and I’ll share a lightweight weekly crawl-to-RAG validation checklist.

## Sources
- https://developers.cloudflare.com
- https://developers.cloudflare.com/changelog/post/2026-03-10-br-crawl-endpoint/
- https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/
