---
title: cloudflare workers ai adds gemma 4 26b moe for long-context edge inference
status: draft
stage: idea
platform: facebook
content_type: talking_head
pillar: growth
goal: engagement
publish_date: 2026-04-29
cta_keyword: GEMMAEDGE
created: 2026-04-29
modified: 2026-04-29
tags:
  - facebook
  - talking-head
  - week-18
  - cloudflare
  - workers-ai
  - gemma-4
  - edge-ai
---

## Hook
If you build AI at the edge, Cloudflare just added a bigger Gemma model you can run without managing GPUs.

## 3 Key Points
1. **What happened:** Cloudflare announced `@cf/google/gemma-4-26b-a4b-it` on Workers AI, a Gemma 4 Mixture-of-Experts model exposed through Workers bindings and API endpoints.
2. **Why it matters now:** It gives teams a higher-capability open model option on edge infrastructure, including tool calling and multimodal support, which can reduce custom hosting overhead.
3. **What to do next:** Pilot one production-like workflow (support triage, doc Q&A, or extraction) and test real prompt length limits in your account before promising 256K context to users.

## Full Script (60–90 second talking-head)
Big update for anyone shipping AI features on Cloudflare: Workers AI now supports Google’s Gemma 4 26B MoE model.

The model handle is `@cf/google/gemma-4-26b-a4b-it`, and Cloudflare positions it for long-context, multimodal, tool-using workloads through the same Workers AI interfaces teams already use.

Why this is useful: you can move up to a stronger open model tier on edge infra instead of standing up separate GPU serving just to test higher-quality outputs.

One practical caveat: Cloudflare’s launch materials reference a 256K context window, but there are public reports of lower effective limits in some API usage. So treat context size as something to validate in your own environment, not a marketing number to assume.

Best rollout move today: pick one workflow where quality matters more than raw speed, run side-by-side evals against your current model, and track output quality, latency, and token cost before switching defaults.

## CTA
Comment **GEMMAEDGE** if you want my edge-model evaluation checklist.

## Sources
- https://x.com/CloudflareDev
- https://developers.cloudflare.com/changelog/post/2026-04-04-gemma-4-26b-a4b-workers-ai
- https://developers.cloudflare.com/workers-ai/models
- https://github.com/cloudflare/cloudflare-docs/issues/29731