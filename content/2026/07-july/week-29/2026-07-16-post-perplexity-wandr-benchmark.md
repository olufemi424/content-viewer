---
title: "Perplexity's WANDR benchmark shows why research agents still break at scale"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-tooling
goal: teach
publish_date: 2026-07-16
cta_keyword: research
created: 2026-07-16
modified: 2026-07-16
tags:
  - perplexity
  - research-agents
  - benchmarks
  - ai-agents
  - creators
  - solo-builders
  - operators
---

## Hook
Perplexity just exposed the real problem with research agents.

They can find examples.

They still struggle to find everything and prove every claim.

## Why this matters
If you are a creator, solo builder, or operator using agents for market maps, lead lists, competitor research, or due diligence, this is the bottleneck that actually matters. Perplexity released WANDR on July 14, 2026 as a benchmark for wide-and-deep research: not just answering one question, but finding a large set of qualifying items and backing each one with evidence. The reason that matters is simple. Most impressive agent demos show one good example. Real work usually needs coverage, consistency, and citations across dozens or hundreds of records. WANDR makes that gap measurable.

## Mechanism
The benchmark is built around 500 public tasks for high-volume, evidence-heavy knowledge work. Perplexity's research post says the median task asks for 50 members, four records per member, and 245 records overall, adding up to 170,495 source-backed records across the full release. Each task follows a hierarchy like company to employee to URL, so the agent has to discover enough qualifying items, enrich each one, and attach evidence that can be checked again later. Perplexity also turned the same task shape into a product preset in its Agent API called `wide-research`, which runs in the background and writes the cited output to a downloadable file. In plain English: this is a benchmark and an execution pattern for research jobs that need breadth, depth, and proof.

## Proof/use case
The most useful proof is that even the leader is far from perfect. Perplexity's own evaluation says its Search as Code system led WANDR at 0.363 soft F1 and 0.133 hard F1, while the strongest system at high effort still only reached 0.447 soft F1 and 0.224 hard F1 on the 45-task subset. That is the signal. Wide research is not solved. For a practical use case, think about building a sponsor list, prospect database, or competitor map where every row needs a source. Perplexity's docs now package that workflow directly: submit a `wide-research` run in the background, let it fan out across the web, then download the evidence-backed results file when it finishes.

## CTA
CTA type: Comment-for-template
Exact line: "Comment `research` if you want my rubric for verifying agent-built research lists."

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Intermediate

## Why now (1 sentence)
This matters now because more teams are handing agents real research work, and WANDR shows how far the tools still are from dependable coverage.

## 3 hook options (<12 words each)
- Research agents still miss too much
- The benchmark agents should fear
- Wide research is not solved

## Final record-ready script
"Perplexity just exposed
the real problem
with research agents.

They can find examples.

They still struggle
to find everything
and prove every claim.

Perplexity released a new benchmark
called WANDR,
which stands for
wide and deep research.

The point is not one clever answer.

The point is whether an agent
can build a big list,
qualify every item,
and attach evidence
for every row.

That is what real work looks like
for competitor maps,
lead lists,
due diligence,
and sponsor research.

And the important part is this:
even the best system
is still far from solved.

Perplexity says its leading setup
hit 0.363 soft F1
and 0.133 hard F1,
which tells you
coverage and proof
still break at scale.

They also turned that workflow
into a product preset
called wide-research,
so you can run
big cited collection jobs
in the background
and download the results later.

The takeaway is simple:
stop judging research agents
by whether they find one good example.

Judge them by whether
they can find enough,
prove enough,
and stay consistent
across the whole list.

Comment `research`
if you want my rubric
for verifying agent-built research lists."

## Shot list by timestamp (A-roll/B-roll)
- 0:00-0:07 A-roll: open with the contrast between finding examples and proving complete research.
- 0:07-0:20 B-roll: spreadsheet or Airtable-style list filling up with rows, then several rows marked with source icons.
- 0:20-0:37 A-roll: explain WANDR as a benchmark for wide-and-deep research, not single-answer chat.
- 0:37-0:53 B-roll: show the hierarchy idea visually, for example company to person to URL or item to source tree.
- 0:53-1:10 A-roll: land the score point that even the leader is still far from dependable at scale.
- 1:10-1:22 B-roll: show docs snippet for the `wide-research` preset and background run flow.
- 1:22-1:30 A-roll: close with the verification rubric CTA.

## On-screen text cues
- WANDR benchmark
- Wide + deep research
- 500 public tasks
- 170,495 source-backed records
- Coverage beats cherry-picked examples

## Caption options: short + long
Short: "Perplexity's WANDR benchmark is a reality check for research agents."
Long: "Perplexity just released WANDR, a benchmark built for the kind of research work people actually delegate: large collections, repeated enrichment, and evidence for every item. The interesting part is not just the launch. It is the score gap. Even the leader is still far from dependable when the task needs broad coverage and proof across dozens or hundreds of records. If you use agents for prospecting, market maps, or due diligence, this is the metric shift to watch."

## CTA type + exact line
CTA type: Comment-for-template
Exact line: "Comment `research` if you want my rubric for verifying agent-built research lists."

## Thumbnail text options (3)
- Research Agents Still Break
- Wide Research Is Hard
- One Good Example Isn't Enough

## Risk check (claims needing cautious phrasing)
- Attribute benchmark scores and leaderboard claims to Perplexity's published research and docs.
- Do not imply WANDR measures every kind of agent work; frame it specifically as wide-and-deep research.
- Avoid claiming the `wide-research` preset guarantees reliable results; present it as a packaged workflow for cited collection jobs.

## Sources
- https://x.com/i/status/2077099503723946121
- https://research.perplexity.ai/articles/wandr-benchmark-evaluating-research-agents-that-must-search-wide-and-deep
- https://docs.perplexity.ai/docs/agent-api/wide-research

## QA Scorecard
- Accuracy: 5/5
- Specificity: 5/5
- Clarity: 5/5
- Actionability: 4/5
- Format match: 5/5
- Creator usefulness: 5/5
