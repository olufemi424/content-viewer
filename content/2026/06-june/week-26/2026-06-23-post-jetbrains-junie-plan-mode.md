---
title: "JetBrains just turned planning into the product with Junie out of beta"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-tooling
goal: teach
publish_date: 2026-06-23
cta_keyword: planmode
created: 2026-06-23
modified: 2026-06-23
tags:
  - jetbrains
  - junie
  - ai-coding-agents
  - planning
  - developers
  - operators
  - creators
---

## Hook
JetBrains just pushed Junie out of beta, and the real story is not "another coding agent." It is that planning is becoming a first-class artifact instead of a disposable prompt.

## Why this matters
Most coding agents still jump from prompt to code too fast. That is fine for tiny tasks, but it gets expensive and messy when you are building client work, internal tools, or anything that needs review. Junie matters for creators, solo builders, and operators because JetBrains is turning the planning step into something you can inspect, edit, and even commit to the repo before the agent writes code. That means fewer wrong turns, cleaner handoffs, and a better governance story than "trust the chat and hope."

## Mechanism
JetBrains announced on June 17, 2026 that Junie left beta. In the launch post, JetBrains says Junie plans before it codes, debugs with the real debugger, reviews pull requests with project context, and runs long tasks while you do other work. The key workflow change is Advanced Plan mode: Junie creates a structured plan document with product requirements, technical design, delivery stages, and optional test strategy, stores it in `.junie/plans`, and lets you edit and approve it before implementation. JetBrains documentation also confirms Junie can run terminal commands, edit files, run tests, and switch between read-only ask mode and execution-focused code mode.

## Proof/use case
The best proof is that JetBrains is making the plan a real repo artifact instead of burying reasoning in a transient chat. That matters if you are a solo builder using agents for feature work, because you can approve the implementation path before spending tokens on a bad one. It also matters for teams, because PR review and debugging are tied to the actual project context. JetBrains also cites the latest SWE-Rebench cycle, where Junie placed first with 61.6% resolved and 72.7% pass@5, which gives the release a measurable benchmark claim beyond marketing language. The practical use case is simple: use a stronger model to shape the plan, then switch to a cheaper model to execute the scoped work.

## CTA
CTA type: Comment-for-template
Exact line: "Comment `planmode` if you want the exact planning template I would use before letting a coding agent touch production code."

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Intermediate

## Why now (1 sentence)
This matters now because coding-agent competition is shifting from raw code generation toward workflow control, reviewability, and cost-aware execution.

## 3 hook options (<12 words each)
- Junie made planning part of the product.
- JetBrains fixed a core agent failure mode.
- Stop letting coding agents freestyle your repo.

## Final record-ready script
"JetBrains just pushed Junie out of beta, but the real story is not another AI coding agent.

It is that planning is becoming part of the product.

Most agents still go from prompt to code way too fast.

That works for tiny tasks, but for real feature work it burns tokens, creates bad PRs, and solves the wrong problem surprisingly often.

JetBrains says Junie now plans before it codes, debugs with the real debugger, reviews PRs with project context, and can keep running long tasks while you do something else.

The important part is Advanced Plan mode.

Before Junie writes code, it creates a structured plan with requirements, technical design, delivery stages, and even test strategy if you want it.

That plan lives in `.junie/plans`, so it is a real file you can edit, approve, and even commit.

That is a much better workflow than hiding the thinking inside a chat thread nobody can review later.

JetBrains also says Junie topped the latest SWE-Rebench cycle at 61.6 percent resolved and 72.7 percent pass at five, so they are backing the launch with a benchmark claim too.

For solo builders and operators, the practical move is simple: use a strong model to make the plan, then a cheaper model to execute the scoped work.

That is the bigger shift here. The best agent workflows are starting to look less like prompting and more like lightweight project management.

Comment `planmode` if you want the exact planning template I would use before letting a coding agent touch production code."

## Shot list by timestamp (A-roll/B-roll)
- 0:00-0:08 A-roll: open on "another coding agent" fatigue and pivot to why this one is different.
- 0:08-0:20 B-roll: JetBrains Junie launch headline and the "leaves beta" framing.
- 0:20-0:36 A-roll: explain why prompt-to-code too fast creates bad PRs and wasted tokens.
- 0:36-0:52 B-roll: Plan mode visuals, `.junie/plans`, and the structured plan tabs.
- 0:52-1:05 A-roll: land the debugger, PR review, and benchmark credibility angle.
- 1:05-1:15 A-roll: CTA close aimed at builders who want safer agent workflows.

## On-screen text cues
- Planning beats freestyle prompting
- `.junie/plans`
- Review before code
- Debugger + PR context
- Strong model to plan, cheap model to execute

## Caption options: short + long
Short: "JetBrains is betting the next coding-agent win is better planning, not just faster code."
Long: "JetBrains moved Junie out of beta and made Advanced Plan mode the real headline. Instead of jumping straight from prompt to code, Junie creates a structured plan you can edit, approve, and even commit before implementation starts. For solo builders and operators, that is a cleaner way to control cost, review scope, and avoid bad agent detours."

## CTA type + exact line
CTA type: Comment-for-template
Exact line: "Comment `planmode` if you want the exact planning template I would use before letting a coding agent touch production code."

## Thumbnail text options (3)
- Planning > Prompting
- Junie Left Beta
- Review Before Code

## Risk check (claims needing cautious phrasing)
- Attribute the SWE-Rebench ranking and percentages directly to JetBrains' cited benchmark result rather than presenting them as a universal truth across all setups.
- Do not imply every Junie capability is unique in the market; frame the differentiation as workflow design, not sole invention.
- Keep the repo-artifact phrasing specific to Plan mode storing files in `.junie/plans`, not every agent action.

## Sources
- https://blog.jetbrains.com/junie/2026/06/junie-coding-agent-out-of-beta/
- https://junie.jetbrains.com/docs/junie-ide-plugin.html
- https://junie.jetbrains.com/docs/junie-review-agent.html
- https://www.jetbrains.com/help/ai-assistant/junie-agent.html

## QA scorecard
Accuracy: 5/5
Specificity: 5/5
Clarity: 5/5
Actionability: 4/5
Format match: 5/5
Creator usefulness: 5/5
