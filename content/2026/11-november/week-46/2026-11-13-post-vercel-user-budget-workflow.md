---
title: "Stop one AI agent from draining the team budget"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: operator-workflows
goal: teach
publish_date: 2026-11-13
cta_keyword: BUDGET
audience: small-team-ai-operations-lead
difficulty: beginner
created: 2026-11-13
modified: 2026-11-13
tags:
  - vercel
  - ai-gateway
  - cost-control
  - agent-operations
  - human-approval
---

## Audience + difficulty
Audience: Small-team AI operations lead
Difficulty: Beginner; requires team-owner or AI Gateway Budget Manager access

## Why now (1 sentence)
Vercel added per-user AI Gateway budgets on August 31, turning agent-cost control into a repeatable operator workflow with individual caps, reset periods, and alerts.

## 3 hook options (<12 words each)
1. One coding agent should not drain your team budget
2. Give every AI user a clear spending ceiling
3. Your agent budget needs a stop rule, not hope

## Final record-ready script
One runaway coding agent should not drain your whole team’s AI budget. Vercel’s AI Gateway now lets a small-team operations lead set a default dollar cap for every user, then give heavier users a custom limit. Choose daily, weekly, monthly, or no reset, and add alerts at fifty, seventy-five, and one hundred percent. When someone reaches the cap, new requests are rejected until it resets or an owner raises it. Keep shared production keys attributed to the team, review usage weekly, and make limit increases a human decision. Comment BUDGET and I’ll send the rollout checklist.

## Shot list by timestamp (A-roll/B-roll)
- 0:00–0:03 — A-roll: Deliver the hook beside a rapidly climbing agent-cost meter.
- 0:03–0:06 — B-roll: Freeze the meter and reveal “Per-user budget.”
- 0:06–0:09 — B-roll: Show the dated Vercel changelog headline as evidence.
- 0:09–0:12 — B-roll: Open the AI Gateway Users budget view.
- 0:12–0:15 — B-roll: Set a default dollar limit for each user.
- 0:15–0:18 — B-roll: Add a custom limit to one heavier user.
- 0:18–0:21 — B-roll: Cycle through daily, weekly, monthly, and no reset.
- 0:21–0:24 — B-roll: Toggle alerts at 50%, 75%, and 100%.
- 0:24–0:27 — B-roll: Push one test user to the spending ceiling.
- 0:27–0:30 — B-roll: Show a rejected request and “Budget exceeded.”
- 0:30–0:33 — B-roll: Attribute a shared production key to the team.
- 0:33–0:36 — A-roll/B-roll split: Review a simple weekly usage table.
- 0:36–0:39 — B-roll: Show a human approval gate for a limit increase.
- 0:39–0:42 — A-roll: Deliver the gated BUDGET CTA.

## On-screen text cues
- "ONE AGENT ≠ WHOLE TEAM BUDGET"
- "Default cap + custom limits"
- "Reset: daily • weekly • monthly • never"
- "Alerts: 50% • 75% • 100%"
- "Human approval to raise limits"
- "Comment BUDGET"

## Caption options
- Put a hard ceiling around each user’s AI spend, then keep every increase behind human approval.
- Default caps, custom limits, staged alerts, and one named owner for exceptions.

## CTA type + exact line
CTA type: gated comment keyword
Exact line: "Comment BUDGET and I’ll send the rollout checklist."

## Thumbnail text options (3)
- STOP RUNAWAY AGENT SPEND
- GIVE EVERY USER A CAP
- YOUR AI BUDGET NEEDS THIS

## Risk check (claims needing cautious phrasing)
- **Verified — 2026-11-13:** Vercel’s August 31 changelog says per-user budgets cover API keys attributed to a user and reject new requests after the applicable limit is reached until reset or increase.
- **Verified — 2026-11-13:** Vercel documents default and custom user budgets, daily, weekly, monthly, or no reset, and optional alerts at 50%, 75%, and 100%.
- **Verified — 2026-11-13:** Vercel says shared production API keys can be attributed to the team so their spend does not count against the creator’s user budget.
- **Verified — 2026-11-13:** Vercel says only team owners and members with AI Gateway Budget Manager permission can manage user budgets.
- **Supplied — 2026-08-31:** Google Sheet row 407 framed the feature as a control for autonomous agents; current feature details were revalidated against Vercel’s changelog and documentation.
- **Illustrative — 2026-11-13:** The small-team rollout, weekly review, heavier-user exception, and human approval step are a bounded operating pattern built from documented controls.
- **Unverified — 2026-11-13:** No independent cost-savings or incident-reduction benchmark was found, so none is claimed.
- Vercel documents budgets as soft caps: the request that crosses a limit can complete, so final spend may end slightly above the configured amount; later requests are rejected.
- User budgets stack with applicable API-key, project, and team budgets; they do not replace those controls.
- Bring Your Own Key spend does not count toward Vercel AI Gateway budgets.

## Sources
- https://vercel.com/changelog/set-per-user-budgets-on-ai-gateway
- https://vercel.com/docs/ai-gateway/observability-and-spend/budgets

## QA Scorecard
- Accuracy: 5/5 — Budget behavior, reset options, alert thresholds, permissions, attribution, and exclusions were checked against Vercel’s current changelog and documentation.
- Specificity: 5/5 — Names the exact cap types, four reset options, three alert thresholds, shared-key attribution, and the human exception gate.
- Clarity: 5/5 — Explains the workflow through one small-team operator and one runaway-agent risk without unnecessary infrastructure jargon.
- Actionability: 5/5 — Gives a reproducible setup, test, review, and limit-increase sequence plus a gated rollout checklist.
- Format match: 5/5 — Uses every required heading in exact order and keeps the spoken section as read-aloud prose only.
- Creator usefulness: 5/5 — Delivers a 42-second, visually demonstrable cost-control workflow for teams running AI agents.
