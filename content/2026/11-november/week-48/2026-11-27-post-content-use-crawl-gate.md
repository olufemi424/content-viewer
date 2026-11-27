---
title: "Make Research Crawls Respect a Site's Content-Use Rules"
status: idea
stage: research-complete
platform: youtube-shorts|tiktok|instagram-reels|linkedin
content_type: show-and-tell-workflow
pillar: ai-workflows
goal: attract-leads
publish_date: 2026-11-27
cta_keyword: CRAWL
audience: small-agency-research-operators
difficulty: intermediate
created: 2026-11-27
modified: 2026-11-27
tags:
  - cloudflare-browser-run
  - web-research
  - content-signals
  - crawl-governance
  - workflow
---

## Audience + difficulty
- **Audience:** small-agency research operators already running repeatable website crawls for monitoring, summaries, or internal knowledge bases.
- **Difficulty:** intermediate; requires a Cloudflare Browser Run account, an API token with Browser Run Edit permission, one approved test domain, and a human reviewer.
- **Input:** one approved target URL, the declared `contentUse` value `reference`, and a one-page crawl limit for the pilot.
- **Output:** a crawl result or an explicit `content_use_disallowed` outcome that a human reviews before any material enters a report or knowledge base.
- **Workflow score:** Trigger 5/5 | Input clarity 5/5 | Mechanism 5/5 | Output clarity 5/5 | Human gate 5/5 | Evidence 5/5 | Reproducibility 5/5 | Audience value 5/5 | 35–45s showability 5/5 = **45/45**.
- **Evidence status:** Sheet claim **verified** against Cloudflare's dated August 31 changelog; allowed values, default behavior, asynchronous job flow, and the `content_use_disallowed` outcome **verified** in current Cloudflare documentation, both accessed 2026-11-27.
- **Reproducibility gate:** use one approved non-sensitive domain, declare `contentUse: reference`, cap the pilot at one page, record the returned job ID, inspect the terminal status and outcome, stop on `content_use_disallowed`, and require a human to approve any retained material.
- **Duplicate gate:** passed on 2026-11-27. No post from the previous 30 days uses a crawler's declared content-use level to stop disallowed research collection. The October 25 Cloudflare post addressed a publisher syncing its own bot preferences into `robots.txt`; this workflow instead governs a research operator's outbound crawl request and review decision.

## Why now (1 sentence)
Cloudflare's August 31 Browser Run update added a `contentUse` parameter that can reject a crawl when a site's declared Content Signals are more restrictive than the operator's intended use.

## 3 hook options (<12 words each)
1. Your research crawler should know when to stop.
2. Stop collecting pages that reject your intended use.
3. Add a content-use gate before your next crawl.

## Final record-ready script
Your research crawler should know when to stop.

Cloudflare Browser Run now accepts a content-use level and checks it against the site's Content Signals.

Start with one approved domain, one page, and set the request to reference.

Save the returned job ID, then inspect the final outcome.

If it says content use disallowed, stop; do not add that page to your report or knowledge base.

A human reviews anything retained.

Already running recurring website research? Comment CRAWL for the pilot checklist.

## Shot list by timestamp (A-roll/B-roll)
- **0:00–0:03 — A-roll:** Hold up a crawler card approaching a clear stop sign.
- **0:03–0:06 — B-roll:** Show Cloudflare's dated changelog headline.
- **0:06–0:09 — B-roll:** Highlight the new `contentUse` parameter.
- **0:09–0:12 — B-roll:** Show a site's `robots.txt` Content Signals line.
- **0:12–0:15 — B-roll:** Select one approved test domain.
- **0:15–0:18 — B-roll:** Set the pilot limit to one page.
- **0:18–0:21 — B-roll:** Add `contentUse: reference` to the request body.
- **0:21–0:24 — B-roll:** Start the crawl and capture its job ID.
- **0:24–0:27 — B-roll:** Poll the job until it reaches a terminal status.
- **0:27–0:30 — B-roll:** Reveal `content_use_disallowed` in the result.
- **0:30–0:33 — B-roll:** Move the blocked page away from the report and knowledge base.
- **0:33–0:36 — A-roll:** Place a human review card over retained material.
- **0:36–0:39 — B-roll:** Show the approved pilot checklist.
- **0:39–0:42 — A-roll/B-roll:** Deliver the gated `CRAWL` CTA.

## On-screen text cues
- `Your crawler needs a stop rule`
- `contentUse: reference`
- `One approved domain • one page`
- `Save the job ID`
- `Inspect the final outcome`
- `content_use_disallowed → STOP`
- `Human reviews retained material`
- `Running recurring research? Comment CRAWL`

## Caption options
1. Declare the intended use, inspect the crawl outcome, and stop before disallowed material enters your research system.
2. A crawler completing technically does not answer whether its intended content use is allowed; make that a visible gate.
3. Pilot on one approved domain, keep the result reviewable, and require a human before retaining content.

## CTA type + exact line
- **Type:** gated comment-keyword CTA; the checklist is for operators already running recurring website research.
- **Exact line:** Already running recurring website research? Comment CRAWL for the pilot checklist.

## Thumbnail text options (3)
1. GIVE YOUR CRAWLER A STOP RULE
2. CHECK BEFORE YOU COLLECT
3. CONTENT USE: DISALLOWED

## Risk check (claims needing cautious phrasing)
- Say Cloudflare Browser Run enforces the Content Signals `use` directive for its `/crawl` endpoint; do not imply this feature governs every crawler or establishes legal permission.
- Cloudflare documents `reference` and `full` as allowed `contentUse` values, with `full` as the default; this workflow deliberately chooses the more restrictive `reference` pilot.
- Current Cloudflare documentation exposes `content_use_disallowed` as a crawl-record outcome; the August 31 launch note describes a `400` rejection when site rules are more restrictive. Interfaces and response shapes can change, so inspect the current result rather than hard-coding one response assumption.
- Content Signals and `robots.txt` are machine-readable publisher preferences, not a substitute for contracts, copyright review, privacy review, terms of service, or legal advice.
- Use only approved, non-sensitive test domains and retain the minimum content needed for the reviewed purpose.
- Preserve the human gate: a successful crawl does not authorize automatic inclusion in a client report, model-training set, or knowledge base.

## Sources
- https://developers.cloudflare.com/changelog/post/2026-08-31-crawl-content-use/ — **verified**, Sheet source URL; published 2026-08-31 and accessed 2026-11-27. Confirms the `contentUse` parameter, `reference` and `full` values, default, and restrictive-site rejection behavior.
- https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/ — **verified**, current official documentation accessed 2026-11-27. Corroborates the asynchronous job flow, Browser Run Edit prerequisite, limits, Content Signals handling, and `content_use_disallowed` outcome.

## QA Scorecard
- Accuracy: 5/5 — product behavior, values, job flow, and outcome language are supported by the dated launch note and current official documentation.
- Specificity: 5/5 — names one operator, one domain, one page, one declared use level, one observable stop state, and one review gate.
- Clarity: 5/5 — follows a single crawl from bounded request through outcome inspection and retention decision.
- Actionability: 5/5 — gives prerequisites, pilot scope, observable evidence, a stop rule, and human ownership.
- Format match: 5/5 — required headings, frontmatter, bullet URLs, 2–4-second visual changes, and one gated CTA are present.
- Creator usefulness: 5/5 — turns a crawler-governance release into a short, visible research-operations workflow.
- Evidence quality: 5/5 — the Sheet source was revalidated and corroborated by current official endpoint documentation with dates and statuses recorded.
- Duplicate safety: 5/5 — the 30-day review found no outbound crawl workflow using declared content use as its stop gate.
- Reproducibility: 5/5 — approved input, declared intent, page cap, job evidence, stop state, retention rule, and human review are explicit.
