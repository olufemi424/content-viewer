---
title: "Test Mercury 2.5 before changing your voice-agent model"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-workflows
goal: teach
publish_date: 2026-11-10
cta_keyword: LATENCY
audience: small-business-customer-support-operator
difficulty: intermediate
created: 2026-11-10
modified: 2026-11-10
tags:
  - mercury-2-5
  - voice-agents
  - latency-testing
  - customer-support
  - workflow
---

## Audience + difficulty
Audience: Small-business customer-support operator running or evaluating a voice agent
Difficulty: Intermediate

Workflow qualification: 38/45 — clear trigger 5, exact audience 5, repeatability 4, demonstrability 5, evidence 4, reproducibility 4, measurable result 5, human gate 3, freshness 3. Pass threshold: 30/45.

Reproducibility gate: Use the same approved test calls, region, provider route, tool set, and concurrency for both models; log time to first token, median and P99 response latency, task completion, and cost. Do not switch production traffic until a human reviews call recordings and failed tasks.

30-day duplicate check: Passed on 2026-11-10. No recent post tests a voice-agent model by latency, completion quality, and cost. The nearest model-cost post covers DeepSeek context-memory economics for coding agents, which differs by tool, problem, result, and angle.

## Why now (1 sentence)
Inception's Mercury 2.5 launch gives customer-support operators a testable low-latency voice-agent option, but its speed and production results remain vendor-supplied claims that should be reproduced on their own calls.

## 3 hook options (<12 words each)
1. Your voice agent's awkward pause needs a benchmark
2. Do not switch voice models because of one speed claim
3. Test this model before your next customer call

## Final record-ready script
Your voice agent's awkward pause needs a benchmark.

Inception says Mercury 2.5 reaches 1,107 tokens per second, and reports that OpenCall cut median model latency to about 170 milliseconds. Those are vendor-supplied results, so test your own calls.

Replay the same approved support scenarios through your current model and Mercury. Log time to first token, median and P99 latency, cost, and whether each task finishes correctly. Then review the recordings for interruptions, wrong answers, and broken tool calls.

Only switch production traffic if speed improves without lowering completion quality. Comment LATENCY, and I'll send the benchmark checklist.

## Shot list by timestamp (A-roll/B-roll)
- 0:00–0:03 — A-roll: Deliver the hook beside a waveform with a visible pause.
- 0:03–0:06 — B-roll: Zoom into the silent gap on a call timeline.
- 0:06–0:09 — B-roll: Show "1,107 tokens/sec" labeled "vendor claim."
- 0:09–0:12 — B-roll: Show "~170 ms median" labeled "OpenCall, vendor case study."
- 0:12–0:15 — A-roll: Say, "test your own calls."
- 0:15–0:18 — B-roll: Duplicate one approved support-scenario list.
- 0:18–0:21 — B-roll: Route identical tests to Current Model and Mercury.
- 0:21–0:24 — B-roll: Highlight time to first token.
- 0:24–0:27 — B-roll: Switch to median and P99 latency cards.
- 0:27–0:30 — B-roll: Add cost and task-completion columns.
- 0:30–0:33 — B-roll: Play a recording with an interruption marker.
- 0:33–0:36 — B-roll: Flag a wrong answer and failed tool call.
- 0:36–0:39 — A-roll/B-roll split: Human reviewer checks the scorecard.
- 0:39–0:42 — B-roll: Production switch remains locked pending approval.
- 0:42–0:45 — A-roll: Deliver the LATENCY CTA over a checklist preview.

## On-screen text cues
- "BENCHMARK THE PAUSE"
- "Vendor claim: 1,107 tokens/sec"
- "Vendor case study: ~170 ms median"
- "Same calls. Same tools. Same region."
- "TTFT • P50 • P99 • COST • COMPLETION"
- "Human review before production"
- "COMMENT: LATENCY"

## Caption options
Short: Benchmark voice-agent latency on your own calls before changing models.

Long: Mercury 2.5 comes with strong vendor-reported speed and latency numbers. A safer workflow replays identical approved support scenarios, compares latency, cost, and task completion, then keeps the production switch behind human review.

## CTA type + exact line
CTA type: gated comment keyword
Exact line: "Comment LATENCY, and I'll send the benchmark checklist."

## Thumbnail text options (3)
- BENCHMARK THE AWKWARD PAUSE
- TEST BEFORE YOU SWITCH
- 170 MS—ON YOUR CALLS?

## Risk check (claims needing cautious phrasing)
- **Verified, 2026-11-10:** Inception's product post states Mercury 2.5 runs at 1,107 tokens per second on widely available NVIDIA GPUs, has a 260K-token context window, and is available through its API, Baseten, and OpenRouter.
- **Supplied, published 2026-10-29 and rechecked 2026-11-10:** The roughly 170-millisecond median model latency and P99 reduction to one second are an OpenCall customer quote inside Inception's launch post, not an independent benchmark.
- **Verified, dated 2026-09-08 and rechecked 2026-11-10:** The selected Sheet source is a launch post by Inception CEO Stefano Ermon; it repeats the vendor's 1,100-plus-token-per-second claim.
- **Illustrative:** The proposed benchmark workflow, metrics, support scenarios, and production approval gate are editorial recommendations, not vendor promises.
- Do not imply that token throughput equals end-to-end call latency or that a faster model will preserve task quality, tool reliability, regional performance, or cost under every workload.
- Do not send sensitive customer recordings to a new provider until retention, consent, access, and compliance requirements have been reviewed.

## Sources
- https://x.com/StefanoErmon/status/2097363229681099062
- https://www.inceptionlabs.ai/blog/introducing-mercury-2-5

## QA Scorecard
- Accuracy: 5/5 — Every number is attributed to Inception or its quoted customer, and the script explicitly identifies the results as vendor-supplied.
- Specificity: 5/5 — Names the comparison setup, five metrics, recording review, failure modes, and production decision gate.
- Clarity: 5/5 — One audience gets one recommendation: benchmark identical calls before changing models.
- Actionability: 5/5 — The operator can reproduce the test with approved scenarios and a fixed environment.
- Format match: 5/5 — Uses every required heading in exact order; the spoken section contains prose only.
- Creator usefulness: 5/5 — Delivers a concrete 35–45-second workflow, three-second visual changes, cautious evidence labels, and one gated CTA.
