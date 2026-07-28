---
title: "Cloudflare's Agents SDK just removed more MCP friction from production workflows"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-tooling
goal: teach
publish_date: 2026-07-28
cta_keyword: mcp
created: 2026-07-28
modified: 2026-07-28
tags:
  - cloudflare
  - agents-sdk
  - mcp
  - code-mode
  - solo-builders
  - operators
  - developers
---

## Hook
Cloudflare just shipped one of those boring agent updates that actually matters: less MCP overhead, less tool clutter, and a cleaner way to run agent code against real infrastructure.

## Why this matters
This matters because a lot of agent demos still fall apart when you try to make them durable. Too much schema conversion adds overhead, too many auto-exposed tools make context noisy, and custom runtimes often need extra glue just to run code safely. Cloudflare's July 22, 2026 Agents SDK update targets those exact pain points. For creators, solo builders, and operators, the practical shift is simple: less friction turning an MCP-connected prototype into something you can actually run, inspect, and maintain.

## Mechanism
Cloudflare's changelog says Agents SDK MCP clients now reuse converted input and output schemas while a live connection keeps the same tool catalog, instead of reconverting every MCP JSON Schema on each model turn. The same update adds `includeMcpTools`, which lets developers stop Think from automatically exposing MCP tools when they prefer to surface them through Code Mode or another path. Cloudflare also says Code Mode now exposes direct host APIs like `describe()` and `execute()` for non-AI-SDK hosts, so durable runtimes outside the AI SDK can still invoke the Code Mode loop directly. In plain English: less repeated translation, cleaner tool exposure, and fewer custom runtime workarounds.

## Proof/use case
The proof is strong because Cloudflare documented both the release and the surrounding architecture publicly. The July 22 changelog spells out the schema reuse, MCP exposure control, and direct host API additions. Cloudflare's earlier Code Mode posts explain why this matters: instead of dumping a huge tool catalog into the model context, Code Mode narrows the interface and lets the model write code against a smaller, more controlled surface. A practical use case for Olufemi's audience is an operator or solo builder hosting a long-running agent that talks to MCP servers, but only wants the model to see a limited tool surface while still being able to execute real infrastructure actions through a durable runtime.

## CTA
CTA type: Comment-for-breakdown
Exact line: "Comment `mcp` if you want the simplest way I'd explain Code Mode versus normal MCP."

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Intermediate

## Why now (1 sentence)
This matters now because teams are moving from agent demos to production workflows, and production agent workflows need less tool bloat and more predictable runtime behavior.

## 3 hook options (<12 words each)
- MCP just got less annoying
- Cloudflare cut real agent friction
- Better MCP without tool bloat

## Final record-ready script
"Cloudflare just shipped
one of those boring updates
that actually matters
for anyone building with agents.

This is an Agents SDK update,
but the real story is
less MCP friction.

Here is the problem.

A lot of agent workflows
get messy in production
because too many tools
get exposed,
too much schema conversion
happens over and over,
and custom runtimes need
extra glue code
just to stay usable.

Cloudflare says
its updated Agents SDK
now reuses converted
MCP schemas
while the tool catalog
stays the same
for a live connection.

That means less repeated work
every model turn.

It also added a flag
called `includeMcpTools`
so you can stop Think
from auto-exposing
every MCP tool
if you would rather
surface them through
Code Mode
or another path.

And this part matters too:
Cloudflare says Code Mode
now exposes direct host APIs
like `describe()`
and `execute()`
for non-AI-SDK hosts.

So if you are running
a durable agent runtime,
you get a cleaner way
to connect real infrastructure
without shoving
a giant tool list
into the model context.

The big takeaway is simple:
the next agent advantage
is not more demos.

It is less orchestration mess.

Comment `mcp`
if you want the simplest way
I'd explain Code Mode
versus normal MCP."

## Shot list by timestamp (A-roll/B-roll)
- 0:00-0:08 A-roll: deliver the "boring update that matters" hook straight to camera.
- 0:08-0:22 B-roll: show an overloaded tool list and a noisy agent-flow diagram.
- 0:22-0:41 A-roll: explain repeated schema conversion and auto-exposed-tool clutter.
- 0:41-0:58 B-roll: show the Cloudflare changelog headline with schema reuse and `includeMcpTools` highlighted.
- 0:58-1:14 A-roll: explain direct host APIs and why durable runtimes care.
- 1:14-1:24 B-roll: show Code Mode diagrams or code snippets with `describe()` and `execute()`.
- 1:24-1:31 A-roll: land the orchestration point and CTA.

## On-screen text cues
- Less MCP friction
- Reuse schemas, reduce overhead
- Control tool exposure
- Direct host APIs
- Less orchestration mess

## Caption options: short + long
Short: "Cloudflare's latest Agents SDK update is the kind of boring infrastructure change that quietly makes real agent workflows cleaner."
Long: "Cloudflare's July 22 Agents SDK update reused MCP schema conversions across a live connection, added `includeMcpTools` to control automatic tool exposure, and exposed direct Code Mode host APIs like `describe()` and `execute()` for non-AI-SDK hosts. That sounds niche, but it matters if you care about getting agents past the demo stage and into runtimes that are easier to control, audit, and maintain."

## CTA type + exact line
CTA type: Comment-for-breakdown
Exact line: "Comment `mcp` if you want the simplest way I'd explain Code Mode versus normal MCP."

## Thumbnail text options (3)
- MCP Without The Mess
- Cloudflare Fixed Agent Friction
- Better Agents, Less Tool Bloat

## Risk check (claims needing cautious phrasing)
- Attribute schema reuse, `includeMcpTools`, and direct host API details to Cloudflare's July 22, 2026 changelog.
- Do not claim guaranteed latency or cost gains because Cloudflare describes the mechanism, not a universal benchmark for every agent stack.
- Frame production benefits as practical implications, not as proof that every MCP workflow should use Cloudflare's approach.

## Sources
- https://x.com/CFchangelog/status/2080699676005912853
- https://developers.cloudflare.com/changelog/post/2026-07-22-mcp-codemode-updates/
- https://blog.cloudflare.com/code-mode/
- https://blog.cloudflare.com/code-mode-mcp/

## QA Scorecard
- Accuracy: 5/5
- Specificity: 4/5
- Clarity: 5/5
- Actionability: 4/5
- Format match: 5/5
- Creator usefulness: 4/5
