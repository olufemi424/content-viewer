---
title: "SwiftFairy gives coding agents a deterministic Swift review pass"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-coding
goal: teach
publish_date: 2026-09-30
cta_keyword: none
audience: creator|solo-builder|operator
difficulty: intermediate
created: 2026-09-30
modified: 2026-09-30
tags:
  - ai-coding
  - swift
  - swiftui
  - code-review
  - mcp
---

## Hook
Your coding agent can read every rule—and still ignore one.

## Why this matters
SwiftFairy adds a deterministic review pass after an agent writes Swift or SwiftUI. For Apple-platform builders, the useful pattern is to enforce important rules with a specialized checker instead of trusting prompt memory alone.

## Mechanism
The native Mac app exposes a local MCP server. An agent sends relevant code to it; SwiftFairy parses the code into a partial graph, matches structural patterns associated with potential issues, and returns line-specific guidance and examples.

## Proof/use case
Nil Coalescing says SwiftFairy can flag correctness, performance, and maintainability issues. One documented example catches a SwiftUI `ForEach` that can emit a variable number of rows—an easy pattern for an agent to produce even when project instructions discourage it.

## CTA
CTA type: save/share
Exact line: "Save this pattern for your next agent-built app."

## Audience + difficulty
Audience: solo-builder, operator, technical creator
Difficulty: Intermediate

## Why now (1 sentence)
SwiftFairy's September launch turns a recurring coding-agent weakness—forgetting project guidance—into a concrete local review workflow.

## 3 hook options (<12 words each)
1. Your coding agent can read every rule—and still ignore one
2. More prompts will not fix every agent mistake
3. Add a deterministic reviewer after your coding agent

## Final record-ready script
"Your coding agent can read every rule—and still ignore one.

That is the problem behind SwiftFairy, a new native Mac app for reviewing agent-written Swift and SwiftUI.

Why does this matter? Project instructions depend on the model remembering the right rule at the right moment. Important guidance can disappear inside a long context.

SwiftFairy adds a different layer. Your agent sends relevant code through a local MCP server. The app parses its structure, matches known issue patterns, and returns focused findings with explanations and examples.

Nil Coalescing shows one practical case: spotting a SwiftUI `ForEach` that can create a variable number of rows and slow large lists—even when the agent already had guidance against that pattern.

This is not another model reviewing a model. It is deterministic static analysis paired with expert guidance, running locally on your Mac.

The broader pattern: let the agent generate, then make a specialized checker enforce what prompts may miss.

Save this pattern for your next agent-built app."

## Shot list by timestamp (A-roll/B-roll)
- 0:00-0:06 A-roll: Deliver the hook; overlay “THE AGENT READ THE RULE. THEN MISSED IT.”
- 0:06-0:18 B-roll: Show an `AGENTS.md` rule beside agent-generated Swift code that violates it.
- 0:18-0:34 B-roll: Animate agent → local MCP server → structural pattern check → line-specific finding.
- 0:34-0:51 A-roll/B-roll split: Show the documented `ForEach` example and highlight variable row output.
- 0:51-1:03 A-roll: Contrast “another model review” with “deterministic check,” then deliver the CTA.

## On-screen text cues
- "Prompt memory is not enforcement"
- "Agent → local MCP → static analysis"
- "Findings attached to relevant code"
- "Generate first. Verify second."
- "macOS 26+ • Apple silicon"

## Caption options
Short: Coding agents forget rules. SwiftFairy shows a stronger pattern: generate with the model, then verify with a deterministic checker.

Long: SwiftFairy is a native Mac app that reviews agent-written Swift and SwiftUI locally through MCP. Instead of asking another model to remember every rule, it uses structural static analysis to detect potential issues and return focused guidance with examples. The bigger lesson for agent workflows: prompts can guide generation, but specialized checks should enforce the rules that matter.

## CTA type + exact line
CTA type: save/share
Exact line: "Save this pattern for your next agent-built app."

## Thumbnail text options (3)
- YOUR AGENT MISSED THE RULE
- PROMPTS ARE NOT ENFORCEMENT
- GENERATE, THEN VERIFY

## Risk check (claims needing cautious phrasing)
- Describe findings as known or potential issues; do not imply every flagged pattern is definitely a bug.
- Attribute token-reduction and quality benefits to Nil Coalescing unless independently benchmarked.
- Do not call SwiftFairy an AI reviewer: its documented review mechanism is deterministic static analysis with expert-authored guidance.
- Avoid implying it supports every Swift or SwiftUI issue; coverage is organized into specific knowledge “Scrolls.”
- State current compatibility precisely: the product page lists macOS 26.0 or later on Apple silicon.

## Sources
- https://x.com/natpanferova/status/2103061607408701508
- https://nilcoalescing.com/blog/IntroducingSwiftFairy/
- https://tools.nilcoalescing.com/swiftfairy
- https://nilcoalescing.com/newsletter/2026-09-28/

## QA Scorecard
- Accuracy: 5/5 — The local MCP workflow, static-analysis mechanism, `ForEach` example, scope, and compatibility are grounded in the official announcement, product page, launch article, and newsletter.
- Specificity: 5/5 — Names the partial-graph pattern matching, line-specific findings, documented SwiftUI example, and current platform requirements.
- Clarity: 5/5 — Contrasts prompt memory with deterministic enforcement in plain language and explains the workflow in one sequence.
- Actionability: 5/5 — Gives builders a reusable pattern: generate with an agent, then run a specialized deterministic verification step.
- Format match: 5/5 — Follows Hook → Why this matters → Mechanism → Proof/use case → CTA and includes the complete creator pack.
- Creator usefulness: 5/5 — Includes three short hooks, a record-ready 164-word script, timestamped shots, text cues, captions, thumbnails, and claim caveats.
