---
title: TanStack AI AG-UI compliance update: what breaks and how to migrate
status: draft
stage: script_ready
platform: youtube_shorts
content_type: daily_news_script
pillar: ai-dev-tools
goal: Help solo builders avoid breakage while upgrading TanStack AI client/server packages
publish_date: 2026-05-17
cta_keyword: ag-ui-migration
created: 2026-05-17
modified: 2026-05-17
tags:
  - tanstack
  - ai
  - ag-ui
  - javascript
  - developer-tools
---

## Hook
TanStack AI just shipped a breaking AG-UI wire-format change.

## Why this matters
If you run `@tanstack/ai-client` with an older server endpoint, your chat flow can fail or silently mis-handle request payloads. For solo builders shipping fast, this is exactly the kind of upgrade mismatch that burns release time.

## Mechanism
The release notes indicate client-to-server compliance updates around AG-UI `RunAgentInput` and new server helpers for parsing request bodies. In practical terms: update client and server packages together, switch handlers to the new request-body parser/helper flow, and retest threaded runs before deploying.

## Proof/use case
TanStack AI release notes (May 16) explicitly call out:
- A breaking AG-UI compliance change
- New server helpers (`chatParamsFromRequestBody`, `mergeAgentTools`)
- New request wire format fields (thread/run metadata, tools/context)

A creator building an internal support bot with TanStack AI can avoid production regressions by pinning both packages, upgrading in one PR, and replaying known conversation fixtures in CI.

## CTA
Before your next deploy: pair-upgrade TanStack AI client and server, then run one end-to-end chat replay test.

## Audience + Difficulty
- Audience: creator, solo-builder, operator
- Difficulty: intermediate

## Why now (1 sentence)
The latest TanStack AI releases include a documented breaking protocol change, so upgrading one side without the other is a current, high-likelihood failure mode.

## 3 Hook Options
- TanStack AI shipped a breaking protocol change
- This TanStack AI upgrade can break your bot
- Upgrade both sides or your chat may fail

## Final Record-Ready Script
“Quick heads-up if you use TanStack AI: there’s a breaking AG-UI compliance update in the latest releases.  
Why you should care: if your `@tanstack/ai-client` updates but your server handler stays old, requests can break or map wrong fields.  
What changed: the release notes call out a new request-body shape and new server helpers like `chatParamsFromRequestBody` and `mergeAgentTools`.  
The move is simple: upgrade client and server together in one PR, update the endpoint parser, and replay a real chat fixture before deploy.  
If you’re a solo builder, this is one of those tiny release-note details that can save you a full day of debugging.  
CTA: pair-upgrade both packages today and run one end-to-end chat replay test before shipping.”

## Shot List By Timestamp (A-roll/B-roll)
- 0:00-0:08 A-roll: direct-to-camera opener with urgency
- 0:08-0:20 B-roll: TanStack AI releases page highlighting “Breaking” note
- 0:20-0:38 B-roll: code editor showing client+server package bump in same PR
- 0:38-0:54 A-roll: practical migration checklist delivery
- 0:54-1:05 B-roll: CI/test run screen + deploy button pause
- 1:05-1:12 A-roll: CTA close

## On-Screen Text Cues
- “Breaking AG-UI update”
- “Upgrade client + server together”
- “New parser helpers required”
- “Replay one real chat in CI”
- “Ship only after E2E pass”

## Caption Options
- Short: TanStack AI changed protocol details. Upgrade both sides together or risk chat breakage.
- Long: TanStack AI’s latest release notes flag a breaking AG-UI client/server compliance update. If you bump one side and not the other, your endpoint can fail or mis-handle payload fields. Fast fix: do a paired client+server upgrade, switch to the new request-body helpers, and replay one real chat fixture in CI before deploy.

## CTA Type + Exact Line
- CTA type: action
- Exact line: “Pair-upgrade TanStack AI client and server today, then run one end-to-end chat replay before deploy.”

## Thumbnail Text Options (3)
- “Breaking TanStack AI Change”
- “This Upgrade Can Break Chat”
- “Upgrade Both Sides”

## Risk Check (Claims Needing Cautious Phrasing)
- “Can fail or mis-handle” should stay conditional, since impact depends on implementation.
- AG-UI field-level details should be attributed to release notes, not generalized to all architectures.

## Sources
- https://github.com/TanStack/ai/releases
- https://x.com/tan_stack/status/2003080699235185013

