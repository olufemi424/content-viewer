---
title: "Salvor makes coding-agent memory part of the repository"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-development
goal: teach
publish_date: 2026-09-25
cta_keyword: memory
audience: creator|solo-builder|operator
difficulty: intermediate
created: 2026-09-25
modified: 2026-09-25
tags:
  - coding-agents
  - developer-tools
  - agent-memory
  - open-source
---

## Hook
Your coding agent can read the code—and still repeat last week's mistake.

## Why this matters
Chat history is a weak place to keep project knowledge. Decisions, failed approaches, and constraints should survive a new session, teammate, branch, or model.

## Mechanism
Salvor v1.0.0-beta stores that context as reviewable Markdown beside the code. A concise file tracks current state, a deeper file preserves reasoning, and separate records hold approved decisions, lessons, failures, and deferred work. Thin adapters point supported coding agents to the same shared knowledge.

## Proof/use case
After an integration fails because of an undocumented vendor quirk, the team can approve a learned-failure record. The next agent sees the failure and its cause before proposing the same approach again. Salvor's repository and example project show this structure, but the project says long-term validation is still open.

## CTA
CTA type: comment keyword
Exact line: "Comment MEMORY if you want the repo checklist."

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Intermediate

## Why now (1 sentence)
Salvor's v1.0.0-beta release makes repo-owned context a timely, testable response to continuity problems in multi-session coding-agent work.

## 3 hook options (<12 words each)
1. Your coding agent can still repeat last week's mistake
2. Stop storing project knowledge in disposable chat history
3. Your next agent session should inherit the team's scars

## Final record-ready script
"Your coding agent can read the code—and still repeat last week's mistake.

That happens because Git preserves what changed, but not always why one approach failed or which constraint cannot move.

Salvor v1.0.0-beta puts that missing context inside the repository as reviewable Markdown. One file tracks the project's current state. Another preserves deeper reasoning. Separate records hold approved decisions, domain lessons, failed approaches, and deferred work. Supported coding agents then read the same shared knowledge instead of depending on one vendor's chat history.

Imagine an integration fails because of a weird vendor rule. You approve that as a learned failure, including the cause. When a fresh agent starts next week, it sees the warning before suggesting the same broken path.

Important caveat: Salvor is a beta, and its maintainers say long-term validation is still open. But the pattern is solid: keep durable engineering knowledge with the code, review it in Git, and make agents ask before promoting it.

Comment MEMORY if you want the repo checklist."

## Shot list by timestamp (A-roll/B-roll)
- 0:00-0:06 A-roll: Deliver the repeated-mistake hook; flash “NEW SESSION ≠ NEW PROJECT.”
- 0:06-0:17 B-roll: Git diff on one side, missing rationale bubble on the other.
- 0:17-0:35 B-roll: Animate `.salvor/` files for current state, reasoning, decisions, and failures.
- 0:35-0:50 B-roll: Show “vendor quirk” failure becoming a reviewed Markdown record, then appearing in a fresh session.
- 0:50-1:05 A-roll: State the beta caveat, summarize the repo-owned pattern, and deliver CTA.

## On-screen text cues
- "Git stores changes—not every reason"
- "Repo-owned Markdown"
- "Decisions • failures • constraints"
- "Human approval before durable capture"
- "Beta: long-term validation is open"

## Caption options
Short: Coding agents need more than chat history. Salvor's useful idea is to keep approved decisions, failures, and constraints as reviewable Markdown beside the code.

Long: Salvor v1.0.0-beta treats engineering knowledge as repository state. Current context, deeper reasoning, approved decisions, learned failures, and deferred work live in Git-tracked Markdown that supported coding agents can share. It is still a beta, and the maintainers explicitly say longitudinal validation remains open. The practical pattern is still worth testing: preserve the “why” with the code and require human approval before an agent turns a finding into durable project knowledge.

## CTA type + exact line
CTA type: comment keyword
Exact line: "Comment MEMORY if you want the repo checklist."

## Thumbnail text options (3)
- YOUR REPO NEEDS MEMORY
- STOP REPEATING AGENT MISTAKES
- SAVE THE WHY

## Risk check (claims needing cautious phrasing)
- Describe Salvor as v1.0.0-beta, not a proven production standard.
- Do not claim it eliminates repeated mistakes; it makes reviewed prior knowledge available to later sessions.
- Attribute compatibility to the project's documented supported adapters; do not imply every coding agent reads Salvor automatically.
- State that durable decisions, learnings, failures, and deferred findings require approval in the default workflow; routine state files may update automatically.
- Do not claim independent performance gains. The maintainers say longitudinal validation is still open.
- Do not imply Salvor recovers undocumented history automatically; its documentation says rationale requires evidence.

## Sources
- https://x.com/BlockchainDan/status/2101905589731258729
- https://github.com/dwasyluk/Salvor/tree/v1.0.0-beta
- https://salvorknows.dev/

## QA Scorecard
- Accuracy: 5/5 — Version, file structure, approval gates, adapter model, and validation caveat match the tagged repository and official project site.
- Specificity: 5/5 — Names the two-tier state, durable capture categories, Git review model, and a concrete vendor-quirk use case.
- Clarity: 5/5 — Explains repo-native memory without relying on specialized memory-system jargon.
- Actionability: 5/5 — Gives builders a clear pattern: store the why beside the code, review it, and gate durable captures.
- Format match: 5/5 — Follows Hook → Why this matters → Mechanism → Proof/use case → CTA and includes the full creator output pack.
- Creator usefulness: 5/5 — Provides three short hooks, a record-ready script, timed visuals, captions, cautious framing, and one CTA.
