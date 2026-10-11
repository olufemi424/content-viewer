---
title: "Antigravity CLI lets operators steer subagents directly"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-tools
goal: teach
publish_date: 2026-10-11
cta_keyword: none
audience: creator|solo-builder|operator
difficulty: intermediate
created: 2026-10-11
modified: 2026-10-11
tags:
  - antigravity
  - subagents
  - agent-orchestration
  - cli
---

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Intermediate

## Why now (1 sentence)
Antigravity CLI 1.2.9 adds direct messaging to running or completed subagents, making human steering a first-class part of parallel agent work.

## 3 hook options (<12 words each)
1. Stop making your main agent relay every correction
2. Parallel agents just got a direct human steering wheel
3. Antigravity now lets you message subagents mid-task

## Final record-ready script
Stop making your main agent relay every correction.

Antigravity CLI 1.2.9 lets you message a subagent directly from the main prompt. Type the at symbol, choose a running or completed subagent from autocomplete, then send the correction or follow-up straight to that conversation.

Why does that matter? Parallel agents often fail at the handoff. Your research agent finds the wrong market, or your coding agent follows an outdated constraint, and the parent agent becomes a slow middleman.

Now you can steer the running agent mid-task. You can also message a completed agent, which the documentation says wakes it with its previous context intact.

For your next parallel workflow, give each subagent one narrow job, watch its status, and intervene only when the direction changes. Keep approvals in front of consequential commands.

Save this pattern for your next multi-agent project.

## Shot list by timestamp (A-roll/B-roll)
- 0:00–0:05 A-roll: Deliver the hook with three agent cards behind you.
- 0:05–0:18 B-roll: Type the at symbol and show subagent autocomplete.
- 0:18–0:34 B-roll: Animate a correction traveling directly to a research agent instead of through the parent.
- 0:34–0:49 B-roll: Show a completed agent waking with its prior conversation retained.
- 0:49–1:03 A-roll: Present the narrow-job, monitor, intervene, and approve workflow.

## On-screen text cues
- "DIRECTLY MESSAGE SUBAGENTS"
- "Running + completed agents"
- "Steer mid-task"
- "Previous context retained"
- "Human approval for consequential commands"

## Caption options
Short: Parallel agents are more useful when humans can correct the right worker directly.

Long: Antigravity CLI 1.2.9 adds direct subagent messaging from the main prompt. The practical pattern: assign narrow jobs, monitor status, steer the specific agent when direction changes, and preserve approval gates for consequential actions.

## CTA type + exact line
CTA type: save
Exact line: "Save this pattern for your next multi-agent project."

## Thumbnail text options (3)
- STEER SUBAGENTS DIRECTLY
- SKIP THE AGENT MIDDLEMAN
- FIX PARALLEL AGENT HANDOFFS

## Risk check (claims needing cautious phrasing)
- The sheet source is a post from a contributor associated with the launch; the release note and official documentation corroborate the feature mechanics.
- The release note confirms direct messaging and autocomplete for running and completed subagents; live status and current-step preview are described in the sheet source post.
- Official documentation says idle subagents retain prior context and automatically re-awaken when messaged; this does not mean context persists after permanent termination.
- Direct steering can reduce relay friction, but no speed or quality improvement is guaranteed.
- Subagents inherit safety settings, but consequential commands can still require explicit authorization and review.

## Sources
- https://x.com/shengzheyao/status/2102649372454572339
- https://github.com/google-antigravity/antigravity-cli/releases/tag/1.2.9
- https://antigravity.google/docs/subagents

## QA Scorecard
- Accuracy: 5/5 — Direct messaging, autocomplete, lifecycle behavior, context retention, and permission handling match the release note and official documentation.
- Specificity: 5/5 — Names the exact syntax, eligible agent states, mid-task steering, auto-wake behavior, and one concrete correction workflow.
- Clarity: 5/5 — Explains the feature through a simple parent-agent handoff problem without unnecessary orchestration jargon.
- Actionability: 5/5 — Gives a four-part pattern: narrow assignments, status monitoring, targeted intervention, and approval gates.
- Format match: 5/5 — Uses every required heading in exact order and keeps the spoken section as read-aloud prose only.
- Creator usefulness: 5/5 — Provides a 137-word recording script, visual beats, captions, thumbnail options, risk language, and one exact CTA.
