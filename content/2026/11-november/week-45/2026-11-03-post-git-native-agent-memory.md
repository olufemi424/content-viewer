---
title: "Give AI agents memory you can review in Git"
status: draft
stage: research-complete
platform: youtube-shorts|tiktok|instagram-reels|linkedin
content_type: short-video-script
pillar: ai-workflows
goal: teach
publish_date: 2026-11-03
cta_keyword: none
audience: creator|solo-builder|operator
difficulty: intermediate
created: 2026-11-03
modified: 2026-11-03
tags:
  - ai-agents
  - agent-memory
  - git
  - okf
  - workflow-design
---

## Audience + difficulty
Audience: solo builders and operators running recurring AI-agent workflows. Difficulty: Intermediate.

## Why now (1 sentence)
OKF Agent Memory turns a new open knowledge standard into a Git-native memory layer, making agent decisions inspectable instead of burying them in a chat history or opaque database.

## 3 hook options (<12 words each)
1. Your AI agent’s memory should have a Git diff
2. Stop hiding important agent decisions inside old chat threads
3. This memory layer makes agent knowledge reviewable like code

## Final record-ready script
Your AI agent’s memory should have a Git diff.

OKF Agent Memory stores project knowledge as Markdown and YAML inside your repository. An agent can search that knowledge through its command-line tool or MCP server, then retrieve only the relevant decisions, facts, and runbooks for the current task.

That matters when a workflow runs every day. A content agent can remember approved voice rules. A support agent can retrieve the current escalation policy. And you can review every memory change before it becomes trusted context.

The format underneath is Google’s Open Knowledge Format version 0.2. It supports provenance, verification, freshness, and lifecycle metadata, so a memory can show where it came from and whether a human reviewed it.

Try it on one low-risk workflow first. Store three approved decisions, require search before writing, and inspect the diff after each run. Keep sensitive data out, and require human review before new memory becomes authoritative.

Save this for your next persistent-agent build.

## Shot list by timestamp (A-roll/B-roll)
- **0:00–0:05 — A-roll:** Deliver the hook; cut to a Git diff with one added decision.
- **0:05–0:18 — B-roll:** Show a `knowledge/` folder containing Markdown files, then a search returning one relevant runbook.
- **0:18–0:34 — A-roll/B-roll:** Overlay the creator, support, and operator use cases beside short file names.
- **0:34–0:49 — B-roll:** Highlight provenance, verification, freshness, and lifecycle fields in an OKF document.
- **0:49–0:62 — A-roll:** Give the three-decision pilot and human-review boundary; end on the CTA.

## On-screen text cues
- “Agent memory should be reviewable”
- “Markdown + YAML + Git history”
- “Retrieve only what the task needs”
- “Provenance • verification • freshness”
- “Human review before memory becomes authoritative”

## Caption options
1. Persistent agent memory is more useful when every change is visible in Git. Start with one low-risk workflow and review the memory diff after every run.
2. Before giving an agent a bigger context window, give it a smaller, reviewable knowledge base with provenance and human approval.
3. The practical agent-memory pattern: searchable project knowledge, selective retrieval, Git history, and a human trust gate.

## CTA type + exact line
Save/share — “Save this for your next persistent-agent build.”

## Thumbnail text options (3)
1. Agent Memory With Git Diffs
2. Stop Losing Agent Decisions
3. Review AI Memory Like Code

## Risk check (claims needing cautious phrasing)
- The repository’s sub-300-microsecond search and token-reduction figures are project-reported benchmarks; they are not used as performance promises in the spoken script.
- OKF v0.2 defines a portable Markdown-and-YAML knowledge format, but it does not prescribe this project’s runtime, retrieval approach, or governance workflow.
- Git history improves inspectability; it does not make stored knowledge correct, private, or safe. Sensitive data should remain outside the memory bundle, and human review is still required.

## Sources
- https://github.com/okf-memory/okf-agent-memory
- https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md

## QA Scorecard
- Accuracy: 5/5
- Specificity: 5/5
- Clarity: 5/5
- Actionability: 5/5
- Format match: 5/5
- Creator usefulness: 5/5
