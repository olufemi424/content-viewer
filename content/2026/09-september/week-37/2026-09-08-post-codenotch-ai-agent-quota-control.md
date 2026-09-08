---
title: "Codenotch turns AI coding quotas into an operator dashboard"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: builder-workflow
goal: teach
publish_date: 2026-09-08
cta_keyword: quota
audience: creator|solo-builder|operator
difficulty: beginner
created: 2026-09-08
modified: 2026-09-08
tags:
  - codenotch
  - coding-agents
  - ai-workflows
  - macos
  - operator-workflow
---

## Hook
If you juggle coding agents, your next dashboard might be a notch.

## Why this matters
Codenotch launched as an open-source macOS app that puts usage rings for Claude Code, Cursor, Codex, Antigravity, and GLM on a screen edge. That sounds small, but it exposes a real operator problem: agent capacity is now something builders have to schedule. The repository passed 1,000 GitHub stars within days of its September 5 creation, which is a useful adoption signal—not proof that every reading is perfect.

## Mechanism
Codenotch reads signals already available to the installed tools: Claude Code's usage endpoint, Cursor's local signed-in state, Codex's app server, and Antigravity's language server or quota endpoint. It also shows whether sessions are working, finished, or waiting on the user. The project explicitly warns that vendors do not provide one clean, stable percentage API, so adapters can break and some values are derived. Failed reads surface as stale, authentication-needed, or error states instead of invented numbers.

## Proof/use case
Picture a solo builder running one agent on a refactor and another on tests. A visible quota ring and waiting-state indicator help decide whether to start another task, switch tools, or unblock a session before capacity is wasted. The bigger lesson is not to install one more widget. It is to treat agent quotas and human-attention bottlenecks as operational telemetry.

## CTA
CTA type: Comment keyword
Exact line: "Comment `quota` if you want the agent dashboard checklist."

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Beginner

## Why now (1 sentence)
Codenotch launched September 5 and crossed 1,000 GitHub stars within days, signaling that multi-agent quota visibility has become a practical builder pain point.

## 3 hook options (<12 words each)
1. Your coding-agent dashboard might be a notch
2. Better models will not fix your quota problem
3. Agent capacity is becoming an operator metric

## Final record-ready script
"If you juggle coding agents,
your next dashboard might be a notch.

Codenotch is a new open-source Mac app
that puts usage rings for Claude Code,
Cursor, Codex, Antigravity, and GLM
on the edge of your screen.

Why does that matter?

Because agent capacity is now
something solo builders have to schedule.

The app reads signals from the tools
already installed on your Mac.
It shows quota windows,
when they reset,
and whether a session is working,
finished, or waiting on you.

That last part is the real insight.

Your bottleneck might not be the model.
It might be a hidden rate limit
or an agent waiting for approval.

There is an important caveat:
these vendors do not expose
one clean, stable usage API.
So Codenotch labels imperfect readings
and shows stale or error states
instead of inventing precision.

The project crossed 1,000 GitHub stars
within days of launch.

My takeaway:
if you run multiple agents,
track quota and human-attention status
like any other operational metric.

Comment `quota`
if you want the agent dashboard checklist."

## Shot list by timestamp (A-roll/B-roll)
- 0:00-0:05 A-roll: Direct-to-camera hook; point toward the edge of the frame.
- 0:05-0:16 B-roll: Codenotch repository and a crop of the colored usage rings.
- 0:16-0:29 A-roll: Explain why agent capacity now needs scheduling.
- 0:29-0:42 B-roll: Animate three states—working, finished, waiting on you.
- 0:42-0:56 A-roll: Deliver the API caveat and "no invented precision" line.
- 0:56-1:07 B-roll/A-roll: Show the 1,000-star proof point, then close with the operator takeaway and CTA.

## On-screen text cues
- "Agent capacity = operator metric"
- "Quota window + reset time"
- "Working • Finished • Waiting"
- "Visible errors, not fake precision"
- "Track the bottleneck"

## Caption options
Short: Coding agents need an operator dashboard too. Codenotch makes quota and waiting states visible on your Mac.

Long: Codenotch puts Claude Code, Cursor, Codex, Antigravity, and GLM usage signals on one screen edge. The useful idea is bigger than the widget: when you run multiple agents, quota windows and sessions waiting for approval become operational telemetry. Caveat: provider interfaces can change, so treat the readings as signals—not guaranteed billing records.

## CTA type + exact line
CTA type: Comment keyword
Exact line: "Comment `quota` if you want the agent dashboard checklist."

## Thumbnail text options (3)
- Your Agent Dashboard
- Stop Hitting Limits
- Track Agent Capacity

## Risk check (claims needing cautious phrasing)
- Say Codenotch reads tool-owned or locally available signals; do not imply every provider offers a public, supported quota API.
- Treat the GitHub star count as a time-bound adoption signal observed on September 8, not a quality guarantee.
- Do not describe derived readings as official billing data.
- Note that provider endpoints and local data formats can change, which may temporarily break adapters.

## Sources
- https://github.com/vinzdg/codenotch
- https://api.github.com/repos/vinzdg/codenotch
- https://mondary.design/2026/09/codenotch-suivre-vos-quotas-ia-directement-dans-le-notch-mac/

## QA Scorecard
- Accuracy: 5/5 — Feature and caveat claims match the repository; launch timing and star count were checked against GitHub's API.
- Specificity: 5/5 — Names supported tools, signal sources, session states, and the observed adoption marker.
- Clarity: 5/5 — Explains the widget through one idea: quota and attention are operational constraints.
- Actionability: 5/5 — Gives viewers a concrete practice: monitor quota windows and blocked sessions before scheduling agent work.
- Format match: 5/5 — Follows the required core order and includes the complete creator output pack.
- Creator usefulness: 5/5 — Delivers a visual, timely workflow story that is record-ready in roughly one minute.
