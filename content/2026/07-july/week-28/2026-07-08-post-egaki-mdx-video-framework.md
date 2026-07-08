---
title: "Egaki turns AI video into an editable MDX workflow"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-tooling
goal: teach
publish_date: 2026-07-08
cta_keyword: egaki
created: 2026-07-08
modified: 2026-07-08
tags:
  - egaki
  - mdx
  - ai-video
  - creator-tools
  - remotion
  - solo-builders
  - operators
---

## Hook
AI video gets more useful when it becomes editable like code.

That is the real idea behind Egaki.

## Why this matters
Egaki matters because most AI video workflows still break at the editing stage. You can generate clips, but revising structure, captions, timing, and visual components usually means jumping back into prompts or switching to a traditional editor. Egaki's official repo describes it as a terminal tool for AI image and video generation that also includes an MDX-to-video framework built on Remotion. For creators, solo builders, and operators, that changes the shape of the workflow: instead of treating AI video like a one-shot output, you can treat it like a structured document that can be revised scene by scene.

## Mechanism
According to the official repo and docs, Egaki lets you write MDX with headings as section boundaries, then use built-in animation primitives, layout transitions, captions, and generated media components inside that file. The docs also show built-in components like `GeneratedImage`, `GeneratedVideo`, and `GeneratedSpeech`, plus a captions workflow and browser export path for rendering MP4s. The quickstart adds a practical on-ramp: authenticate once, generate images or videos from the CLI, and then move into the MDX video framework when you need a more repeatable production flow. The important mechanism is that prompts stop being the only control surface because the video can be structured and edited in code-like form.

## Proof/use case
The proof is that Egaki already ships as a real documentation-backed workflow, not just a flashy demo. The GitHub repo documents the CLI and the MDX-to-video layer, while the docs site walks through project setup, built-in components, captions, and export. A practical use case is a creator or operator making recurring explainers, changelog videos, or product demos: instead of regenerating a whole video every time one scene changes, they can revise the MDX, swap generated assets, update captions, and re-export. That makes Egaki especially relevant for people who want AI speed without giving up versionable structure. The caution is that this is a framework-style workflow, so it helps most when you are willing to treat video production as an editable system, not just a prompt box.

## CTA
CTA type: Comment-for-breakdown
Exact line: "Comment `egaki` if you want the exact AI-video workflow I'd test for repeatable content."

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Intermediate

## Why now (1 sentence)
This matters now because creator AI tooling is shifting from one-shot generation toward structured workflows that are easier to revise, reuse, and operationalize.

## 3 hook options (<12 words each)
- AI video needs editable structure
- Video is becoming code-like
- Egaki makes AI video revisable

## Final record-ready script
"AI video gets more useful when it becomes editable like code.

That is the real idea behind Egaki.

This is a new AI media tool that does two things.

First,
the official repo says it can generate images and videos from the terminal.

But the more interesting part is the second layer.

Egaki also ships an MDX-to-video framework built on Remotion,
which means your video can be written as a structured file
instead of staying trapped inside one prompt or one timeline.

According to the docs,
you can use headings as section boundaries,
add built-in animation primitives,
drop in generated image, video, and speech components,
work with captions,
and export an MP4 from the browser.

That matters because most AI video workflows are fast at generation
but weak at revision.

If one scene changes,
you often end up re-prompting too much
or rebuilding inside a separate editor.

Egaki points at a better workflow:
generate with AI,
but keep the structure in something you can actually edit,
version,
and reuse.

So if you make explainers,
product demos,
or recurring short-form content,
this is the kind of tool worth watching.

Not because it makes video effortless,
but because it makes AI video more systematic.

Comment `egaki` if you want the exact AI-video workflow I'd test for repeatable content."

## Shot list by timestamp (A-roll/B-roll)
- 0:00-0:07 A-roll: open on "AI video gets more useful when it becomes editable like code."
- 0:07-0:18 B-roll: Egaki GitHub repo headline with "AI image and video generation from the terminal" and "MDX-to-video framework built on Remotion."
- 0:18-0:34 A-roll: explain the problem with one-shot AI video generation and painful revisions.
- 0:34-0:50 B-roll: Egaki docs navigation showing MDX video, captions, and export sections.
- 0:50-1:07 A-roll: explain why structured video files beat constant re-prompting.
- 1:07-1:21 B-roll: built-in components page highlighting `GeneratedImage`, `GeneratedVideo`, and `GeneratedSpeech`.
- 1:21-1:30 A-roll: deliver the workflow takeaway and CTA.

## On-screen text cues
- AI video, but editable
- MDX-to-video workflow
- Headings become scenes
- Built-in captions
- Generated speech and visuals
- Better revisions, less rework

## Caption options: short + long
Short: "Egaki is interesting because it treats AI video like something you can actually revise, not just regenerate."
Long: "Most AI video tools are great at making a first draft and weak at making the fifth version. Egaki stands out because it pairs terminal-based image and video generation with an MDX-to-video framework built on Remotion, plus captions, generated media components, and browser export. For creators and operators, the practical takeaway is simple: AI video gets more valuable when it becomes structured, editable, and reusable."

## CTA type + exact line
CTA type: Comment-for-breakdown
Exact line: "Comment `egaki` if you want the exact AI-video workflow I'd test for repeatable content."

## Thumbnail text options (3)
- AI Video, But Editable
- Video As Code Is Here
- Egaki Fixes AI Video Rework

## Risk check (claims needing cautious phrasing)
- Attribute all product-behavior claims about MDX sections, built-in components, captions, and export to Egaki's official repo or docs.
- Do not imply Egaki removes the need for editing judgment; frame it as a more structured workflow for revision.
- Avoid repeating launch-post engagement numbers unless verified from a source of record.

## Sources
- https://x.com/__morse/status/2073452795299004793
- https://github.com/remorses/egaki
- https://egaki.org/docs/quickstart
- https://egaki.org/docs/mdx-video/components
