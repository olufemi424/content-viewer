---
title: "Rampart turns AI privacy into a browser-side workflow builders can actually ship"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-tooling
goal: teach
publish_date: 2026-07-04
cta_keyword: privacy-layer
created: 2026-07-04
modified: 2026-07-04
tags:
  - rampart
  - privacy
  - pii
  - browser-ai
  - developers
  - solo-builders
  - operators
---

## Hook
If your AI product ever touches customer text, the smartest privacy move might be adding a tiny model before the prompt leaves the browser.

National Design Studio's Rampart is a 14.7 MB browser-side redaction system that detects and replaces personal information before text is sent to a remote AI service.

## Why this matters
This matters because a lot of teams talk about AI privacy like it is a policy page problem, when it is really a workflow design problem. If raw text hits your backend, your model provider, your logs, or a third-party SDK before redaction, you already expanded the blast radius. Rampart's angle is useful because it shifts the trust boundary earlier. The user types, the browser checks the text locally, and only the redacted version needs to leave the device. For solo builders, that is a concrete pattern for support tools, intake forms, and assistant-style products handling sensitive prompts. For operators, it is a practical first layer for reducing risk without waiting for a giant compliance program.

## Mechanism
According to National Design Studio's launch post and whitepaper, Rampart runs entirely in-browser and combines two layers. The first is a deterministic recognizer for structured identifiers like Social Security numbers, cards, emails, and IP addresses. The second is a small ONNX MiniLM-based token-classification model for context-heavy personal information like names and street addresses. The system keeps the model lightweight enough for browser delivery at 14.7 MB, and the team reports 3.9 ms p50 latency on WebGPU in the browser. The important workflow point is not just that it redacts PII. It does it before the prompt leaves the device.

## Proof/use case
The official launch post links the shipped NPM package, Hugging Face model, and whitepaper, which makes this more than a concept thread. The whitepaper reports 98.42% private-term recall on a 30,000-row held-out OpenPII test set across seven supported Latin-script languages, while clearly framing Rampart as harm reduction rather than perfect protection. The public GitHub repository and package release show this is something builders can inspect and integrate, not just admire. A practical use case is any AI assistant that helps with healthcare costs, housing, HR intake, or customer support, where you still need rough context from a prompt but do not want names, SSNs, or street-level details leaving the browser unfiltered.

## CTA
CTA type: Comment-for-breakdown
Exact line: "Comment `privacy-layer` if you want my checklist for adding browser-side redaction to an AI workflow."

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Intermediate

## Why now (1 sentence)
This matters now because more AI products are moving into real customer-facing workflows where the fastest way to lose trust is sending raw personal data farther through the stack than necessary.

## 3 hook options (<12 words each)
- Privacy before the prompt leaves
- This tiny model cuts AI risk
- Stop sending raw prompts upstream

## Final record-ready script
"If your AI product ever touches customer text, the smartest privacy move might be adding a tiny model before the prompt leaves the browser.

National Design Studio's Rampart is a 14.7 megabyte browser-side redaction system that detects and replaces personal information before text is sent to a remote AI service.

That matters because most teams still treat AI privacy like a policy page problem.
It is really a workflow design problem.

If raw text reaches your backend,
your model provider,
your logs,
or some third-party SDK before redaction,
you already widened the blast radius.

Rampart's idea is simple:
move the trust boundary earlier.

The browser checks the text locally,
replaces the sensitive parts,
and only the redacted version needs to leave the device.

According to the launch post and whitepaper,
Rampart combines two layers.

One is deterministic rules for structured identifiers like Social Security numbers,
emails,
cards,
and IP addresses.

The other is a small MiniLM-based model for context-heavy personal information like names and street addresses.

The team says it ships at 14.7 megabytes,
runs in-browser,
and hits 3.9 millisecond p50 latency on WebGPU.

The big takeaway is not just 'AI privacy.'
It is that privacy can become part of the product workflow before the prompt ever leaves the device.

That is useful for support tools,
intake forms,
healthcare or housing assistants,
or any product where users paste sensitive details into an AI box.

One caution:
the whitepaper is clear that Rampart is harm reduction,
not perfect protection.
So this is a first layer,
not a reason to stop thinking about the rest of your stack.

But if you build AI products that touch real user data,
this is exactly the kind of infrastructure worth paying attention to.

Comment `privacy-layer` if you want my checklist for adding browser-side redaction to an AI workflow."

## Shot list by timestamp (A-roll/B-roll)
- 0:00-0:08 A-roll: lead with the "tiny model before the prompt leaves the browser" hook.
- 0:08-0:20 B-roll: Rampart launch page with the 14.7 MB and in-browser framing highlighted.
- 0:20-0:38 A-roll: explain why privacy is a workflow-boundary issue, not just policy language.
- 0:38-0:52 B-roll: whitepaper section describing deterministic plus model layers.
- 0:52-1:08 A-roll: translate the feature into support, intake, and assistant use cases.
- 1:08-1:18 B-roll: GitHub repo or Hugging Face page to show it is inspectable and real.
- 1:18-1:30 A-roll: deliver the harm-reduction caution and CTA.

## On-screen text cues
- Privacy before the API call
- 14.7 MB browser model
- Redact PII on-device
- Smaller blast radius
- First layer, not perfect protection
- Better workflow design

## Caption options: short + long
Short: "Rampart is a useful reminder that AI privacy is a workflow decision: redact sensitive text in the browser before the prompt leaves the device."
Long: "National Design Studio's Rampart packages a practical privacy pattern for AI products: use deterministic checks plus a small browser-side model to redact names, addresses, and structured identifiers before text ever reaches your backend or model provider. The important idea is not hype about privacy. It is moving the trust boundary earlier in the workflow."

## CTA type + exact line
CTA type: Comment-for-breakdown
Exact line: "Comment `privacy-layer` if you want my checklist for adding browser-side redaction to an AI workflow."

## Thumbnail text options (3)
- Stop Sending Raw Prompts
- Tiny Model, Bigger Privacy
- Privacy Before The API Call

## Risk check (claims needing cautious phrasing)
- Keep the 98.42% recall figure attributed to the National Design Studio whitepaper, not as an independently verified benchmark.
- Do not imply Rampart guarantees privacy; frame it as a first defensive layer and harm-reduction system.
- Keep supported-language claims limited to the seven Latin-script languages named in the whitepaper and launch post.

## Sources
- https://x.com/ndstudio/status/2071638578145145251
- https://ndstudio.gov/posts/say-hello-to-rampart
- https://inference.ndstudio.gov/rampart/whitepaper.pdf
- https://github.com/nationaldesignstudio/rampart
- https://huggingface.co/nationaldesignstudio/rampart

## QA scorecard
Accuracy: 5/5
Specificity: 5/5
Clarity: 5/5
Actionability: 4/5
Format match: 5/5
Creator usefulness: 5/5
