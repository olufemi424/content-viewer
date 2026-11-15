---
title: "Turn Notion comments into a human-reviewed agent queue"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-workflows
goal: teach
publish_date: 2026-11-15
cta_keyword: NOTION
audience: small-business
difficulty: beginner
created: 2026-11-15
modified: 2026-11-15
tags:
  - notion
  - vercel-chat-sdk
  - ai-agents
  - document-review
  - human-approval
---

## Audience + difficulty
Audience: Small-agency operations lead
Difficulty: Beginner

## Why now (1 sentence)
Vercel's August 25 Notion adapter lets an existing Chat SDK agent join page and block comment discussions while preserving threaded replies and page-level access controls.

## 3 hook options (<12 words each)
1. Stop copying Notion feedback into a separate AI chat
2. Your Notion comments can become an agent review queue
3. Put the agent where your team already reviews work

## Final record-ready script
Stop copying Notion feedback into a separate AI chat. Vercel’s Notion adapter lets the same Chat SDK agent join comment threads on pages your connection can access. For a small-agency ops lead, teammates could flag a proposal, ask the agent to summarize requested changes, then review its reply in the original thread. Start with one test page, grant only comment access, and keep client-facing edits human-approved. Comment NOTION and I’ll send the setup-and-review checklist.

## Shot list by timestamp (A-roll/B-roll)
- 0:00–0:03 — A-roll: Deliver the hook beside a Notion comment and separate AI chat.
- 0:03–0:06 — B-roll: Copy-paste motion stops; red X appears.
- 0:06–0:09 — Evidence: Highlight Vercel's “same agent” launch sentence.
- 0:09–0:12 — B-roll: Agent icon moves from Chat SDK into Notion.
- 0:12–0:15 — Evidence: Show page-to-channel and comment-to-thread mapping.
- 0:15–0:18 — A-roll: Name the small-agency operations audience.
- 0:18–0:21 — B-roll: Teammate flags one paragraph in a proposal review thread.
- 0:21–0:24 — B-roll: Agent produces a three-item change summary.
- 0:24–0:27 — B-roll: Reply appears inside the original Notion thread.
- 0:27–0:30 — Evidence: Highlight Notion content-access controls in the docs.
- 0:30–0:33 — B-roll: Select one test page and comment permissions only.
- 0:33–0:36 — B-roll: Human checks the summary against the original comments.
- 0:36–0:39 — A-roll: State that client-facing edits stay human-approved.
- 0:39–0:42 — A-roll: Deliver the gated NOTION CTA over the checklist cover.

## On-screen text cues
- "STOP COPY-PASTING FEEDBACK"
- "1 AGENT → NOTION THREADS"
- "Illustrative workflow"
- "START WITH 1 TEST PAGE"
- "HUMAN APPROVES CLIENT EDITS"
- "Comment NOTION"

## Caption options
Short: Bring the agent into the review thread. Keep client edits human-approved.

Long: Vercel's Notion adapter lets an existing Chat SDK agent respond inside page and block comment discussions. A small agency could use that pattern to summarize proposal feedback without moving review into another chat. Comment NOTION for the setup-and-review checklist.

## CTA type + exact line
CTA type: Gated comment keyword
Exact line: "Comment NOTION and I’ll send the setup-and-review checklist."

## Thumbnail text options (3)
- STOP COPYING NOTION FEEDBACK
- COMMENTS TO REVIEW QUEUE
- AGENT IN THE THREAD

## Risk check (claims needing cautious phrasing)
- Verified on 2026-11-15: Vercel's August 25 changelog and current Chat SDK documentation say the Notion adapter supports page and block comment discussions, threaded replies, mentions, comment history, message editing, and scoped content access.
- Supplied by Sheet row 381: the framing that the same Chat SDK agent can run across Notion and other supported collaboration surfaces without a separate codebase.
- Illustrative: flagging a proposal, summarizing requested changes, and reviewing the reply in-thread are a proposed small-agency workflow, not a documented customer result.
- Unverified: time saved, summary accuracy, adoption, and business outcomes; none is claimed.
- “Grant only comment access” is a least-privilege recommendation. The current docs also say Read content is required for page metadata, so teams should enable only the additional content capabilities their implementation needs.
- Notion history fetches include only unresolved discussions, and connection access is limited to selected pages and databases; test these boundaries before relying on the workflow.
- Keep final client-facing edits, sends, publishing, and permission changes human-approved.

## Sources
- https://vercel.com/changelog/notion-chat-sdk
- https://chat-sdk.dev/adapters/official/notion
- https://github.com/vercel/chat/tree/main/packages/adapter-notion

## QA Scorecard
- Accuracy: 5/5 — Product claims match the current changelog, adapter documentation, and repository; the proposal workflow is labeled illustrative.
- Specificity: 5/5 — Names one audience, one review artifact, the trigger, output, access boundary, and approval point.
- Clarity: 5/5 — The script follows feedback from comment to in-thread summary to human review in plain language.
- Actionability: 5/5 — Starts with one test page, least privilege, source-comment review, and human approval for external edits.
- Format match: 5/5 — Uses every required heading in order, read-aloud prose only, URL bullets, and three-second visual changes.
- Creator usefulness: 5/5 — Delivers one reproducible agency workflow and one gated checklist CTA in approximately 37 seconds.
