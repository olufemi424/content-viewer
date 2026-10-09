---
title: "GPT-6.1 Sol makes context-heavy agents cheaper to run"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-tools
goal: teach
publish_date: 2026-10-09
cta_keyword: none
audience: creator|solo-builder|operator
difficulty: intermediate
created: 2026-10-09
modified: 2026-10-09
tags:
  - openai
  - coding-agents
  - api-costs
  - prompt-caching
---

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Intermediate

## Why now (1 sentence)
OpenAI's GPT-6.1 Sol gives builders a timely reason to re-test context-heavy agent workflows where cached input—not just headline model intelligence—can shape the bill.

## 3 hook options (<12 words each)
1. Your agent's cheapest token might be the repeated one
2. OpenAI just changed the math for long-running agents
3. Stop choosing agent models by intelligence alone

## Final record-ready script
Your agent's cheapest token might be the repeated one.

OpenAI says GPT-6.1 Sol nearly matches its flagship Astra model on agentic coding, computer use, and professional work, while charging one-fifth of Astra's standard input and output prices.

The more interesting number for long-running agents is cached input: ten cents per million tokens, a ninety-five percent discount from Sol's standard input price. That matters when an agent repeatedly reuses the same instructions, tool definitions, documents, or code context across requests.

In OpenAI's DeepSWE evaluation, GPT-6.1 Sol matched Astra at roughly one-fifth the cost. But that is a vendor benchmark, not your workload.

So run a bounded comparison: give both models the same real task, track completion quality, retries, latency, and total cost, then let a human review the diff before anything ships.

Save this and audit what your agent keeps rereading.

## Shot list by timestamp (A-roll/B-roll)
- 0:00–0:05 A-roll: Deliver the hook with a token counter beside you.
- 0:05–0:19 B-roll: Compare Sol and Astra standard pricing with a simple one-fifth graphic.
- 0:19–0:34 B-roll: Animate instructions, tools, documents, and code entering a cache, then being reused.
- 0:34–0:48 A-roll/B-roll split: Show the DeepSWE claim with a clear "OpenAI benchmark" label.
- 0:48–1:04 A-roll: Walk through the four-part comparison and deliver the CTA.

## On-screen text cues
- "REPEATED CONTEXT CAN COST LESS"
- "$0.10 / 1M cached input tokens"
- "95% below standard Sol input"
- "Vendor benchmark ≠ your workload"
- "Track quality • retries • latency • cost"

## Caption options
Short: The agent-cost question is not only which model you use. It is how much context you keep sending again.

Long: OpenAI priced GPT-6.1 Sol at $2 per million input tokens, $0.10 per million cached input tokens, and $10 per million output tokens. For context-heavy agents, that makes prompt caching worth measuring—but test quality, retries, latency, and total task cost on your own workflow before switching.

## CTA type + exact line
CTA type: save
Exact line: "Save this and audit what your agent keeps rereading."

## Thumbnail text options (3)
- YOUR AGENT KEEPS REREADING
- THE 95% CACHE DISCOUNT
- TEST COST PER COMPLETED TASK

## Risk check (claims needing cautious phrasing)
- Attribute performance and benchmark comparisons to OpenAI; they are vendor-reported evaluations, not independent proof of real-world results.
- The one-fifth comparison applies to standard input and output token prices versus GPT-6 Astra, not every task's final bill.
- The 95% discount compares GPT-6.1 Sol's cached input price of $0.10 per million tokens with its standard input price of $2 per million tokens.
- Do not imply every repeated token is automatically cached; actual cache eligibility and savings depend on API behavior and request structure.
- Availability and pricing can change, so viewers should verify current OpenAI documentation before deployment.

## Sources
- https://x.com/grok/status/2105085177013711131
- https://openai.com/index/introducing-gpt-6-1-sol/
- https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/

## QA Scorecard
- Accuracy: 5/5 — Pricing and benchmark statements match OpenAI's announcement and are explicitly framed as company-reported; TechCrunch independently corroborates the launch and positioning.
- Specificity: 5/5 — Names exact token prices, the 95% cached-input discount, the DeepSWE comparison, and four evaluation measures.
- Clarity: 5/5 — Explains why repeated context matters without assuming the viewer already understands prompt caching.
- Actionability: 5/5 — Gives viewers a bounded same-task comparison using quality, retries, latency, total cost, and human diff review.
- Format match: 5/5 — Uses every required heading in exact order and keeps the spoken section as read-aloud prose only.
- Creator usefulness: 5/5 — Provides a record-ready 140-word script, concise visual plan, captions, thumbnails, risk language, and one exact CTA.
