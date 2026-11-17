---
title: "Turn agent feedback into a reviewed skill update"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-workflows
goal: teach
publish_date: 2026-11-17
cta_keyword: LOOP
created: 2026-11-17
modified: 2026-11-17
tags:
  - agent-skills
  - human-feedback
  - workflow-improvement
  - github
  - human-approval
---

## Audience + difficulty
Audience: Small-team operations lead maintaining an internal issue-triage agent
Difficulty: Intermediate

## Why now (1 sentence)
Anthropic's Warp implementation story documents a reproducible two-skill loop that turns feedback left in normal issues into small, reviewable updates instead of losing it after each agent run.

## 3 hook options (<12 words each)
1. Stop letting useful agent feedback disappear after every run
2. Your agent should not rewrite its own rules unchecked
3. Turn issue comments into reviewed agent improvements

## Final record-ready script
Stop letting useful agent feedback disappear after every run. Warp documented a safer loop for an issue-triage agent: keep its instructions in one skill file, then leave specific corrections on the issue. A separate scheduled agent collects that feedback and proposes the smallest skill edit as a pull request. Your operations lead checks the evidence, tests the change on past issues, and decides whether to merge. The agent improves, but never rewrites its own rules unchecked. Comment LOOP and I’ll send the review checklist.

## Shot list by timestamp (A-roll/B-roll)
- 0:00–0:03 — A-roll: Deliver the hook as an issue comment fades away.
- 0:03–0:06 — B-roll: Pin the correction beside a file labeled `triage-skill.md`.
- 0:06–0:09 — Evidence: Highlight Anthropic's two-skill architecture description.
- 0:09–0:12 — B-roll: Issue-triage agent reads the base skill.
- 0:12–0:15 — B-roll: Maintainer writes a specific correction on the issue.
- 0:15–0:18 — Evidence: Highlight “the more explicit the better” in the source.
- 0:18–0:21 — B-roll: Scheduled improver gathers approved feedback.
- 0:21–0:24 — B-roll: A one-line skill diff appears in a pull request.
- 0:24–0:27 — Evidence: Show Warp's public issue-triage demo repository.
- 0:27–0:30 — B-roll: Replay the edit against three past issues.
- 0:30–0:33 — A-roll: Operations lead reviews evidence and test results.
- 0:33–0:36 — B-roll: Human selects merge; automatic rewrite stays blocked.
- 0:36–0:39 — A-roll: Deliver the gated LOOP CTA over the checklist cover.

## On-screen text cues
- "FEEDBACK SHOULD PERSIST"
- "BASE SKILL + IMPROVER"
- "SMALLEST EDIT"
- "TEST ON PAST ISSUES"
- "HUMAN APPROVES MERGE"
- "Comment LOOP"

## Caption options
Short: Turn issue feedback into a tested skill update, not an automatic rewrite.

Long: Keep agent instructions in a reviewable skill file. Let a separate scheduled agent propose a small update from specific issue feedback, replay it against past cases, and require a human to approve the merge. Comment LOOP for the review checklist.

## CTA type + exact line
CTA type: Gated comment keyword
Exact line: "Comment LOOP and I’ll send the review checklist."

## Thumbnail text options (3)
- SAVE AGENT FEEDBACK
- REVIEW EVERY SKILL UPDATE
- DON’T AUTO-REWRITE RULES

## Risk check (claims needing cautious phrasing)
- Verified on 2026-11-17: Anthropic's Warp implementation article describes an inner base skill, human feedback, and a scheduled outer improver that proposes small skill-file edits through a normal pull-request workflow.
- Verified on 2026-11-17: Warp's public GitHub repository demonstrates an issue-triage agent launched from GitHub Actions and states that it drafts fixes for human review.
- Supplied by Sheet row 397, dated 2026-08-29: Warp's implementation was framed as a self-improving agent loop; this script uses the narrower phrase “documented a safer loop” and does not claim autonomous learning.
- Illustrative: replaying a proposed edit against three past issues is a recommended reproducibility gate, not a step Anthropic says Warp always uses.
- Unverified: any accuracy, speed, cost, or productivity improvement; none is claimed.
- Human approval boundary: the improver may propose a pull request, but an operations lead reviews evidence, tests the change, and decides whether to merge.
- Reproducibility gate: use a versioned base skill, specific issue feedback, a minimal diff, a fixed set of past issues, and a blocked automatic merge.
- Workflow qualification score: repetitive pain 5/5, audience fit 5/5, demonstrability 5/5, evidence 5/5, reproducibility 5/5, human control 5/5, 35–45-second fit 5/5, visual proof 5/5, gated CTA asset 4/5 — 44/45.
- Thirty-day duplicate check on 2026-11-17: no recent post matches Warp, issue-triage feedback, reviewed skill updates, and this operator angle.

## Sources
- https://claude.com/resources/articles/how-warp-builds-self-improving-agents-on-claude
- https://github.com/warpdotdev/warp-agents-demo-github-issue-triage
- https://news.ycombinator.com/item?id=49492432

## QA Scorecard
- Accuracy: 5/5 — The two-skill, issue-feedback, minimal-edit, and pull-request claims match the primary implementation article; recommendations are labeled illustrative.
- Specificity: 5/5 — Names one operator, one triage workflow, one versioned skill, one feedback surface, a replay gate, and a merge boundary.
- Clarity: 5/5 — Explains the loop in plain language without treating “self-improving” as unsupervised learning.
- Actionability: 5/5 — Gives a reproducible capture, proposal, replay, review, and approval sequence.
- Format match: 5/5 — Uses every required heading in order, read-aloud prose only, bullet URLs, and three-second visual changes.
- Creator usefulness: 5/5 — Delivers one demonstrable small-team workflow and one gated checklist CTA in approximately 40 seconds.
