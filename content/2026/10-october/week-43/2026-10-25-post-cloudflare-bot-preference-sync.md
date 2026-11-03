---
title: "Cloudflare turns AI crawler policy into a repeatable website control"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: ai-tools
goal: teach
publish_date: 2026-10-25
cta_keyword: none
audience: creator|solo-builder|operator
difficulty: beginner
created: 2026-10-25
modified: 2026-10-25
tags:
  - cloudflare
  - robots-txt
  - ai-crawlers
  - creator-ops
---

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Beginner

## Why now (1 sentence)
Cloudflare's updated October documentation makes Bot Preference Sync a practical control for publishing AI crawler preferences without manually maintaining a separate robots.txt policy.

## 3 hook options (<12 words each)
1. Your website needs separate rules for search, agents, and training
2. Stop treating every AI crawler like the same bot
3. One setting can keep your AI crawler rules synchronized

## Final record-ready script
Your website needs separate rules for search, agents, and training.

Cloudflare's Bot Preference Sync turns those choices into managed robots.txt directives. Set a policy to block search or agent crawlers, or disallow training, enable the sync, and Cloudflare can prepend its managed rules while preserving your existing file.

Why does that matter? A creator may want articles discoverable in search without offering the same content for model training. One blunt block cannot express that workflow clearly.

Try this on one non-critical domain first. Choose your Search, Agent, and Training policies in Cloudflare, enable Bot Preference Sync, then reload robots.txt and confirm the managed section appears. Keep the final policy decision human-owned, because it affects discoverability and access.

And remember: robots.txt states a preference; it does not technically stop every crawler. Use crawler blocking when you need enforcement.

Save this for your next website policy review.

## Shot list by timestamp (A-roll/B-roll)
- 0:00–0:06 A-roll: Deliver the hook beside three cards labeled Search, Agent, and Training.
- 0:06–0:20 B-roll: Show the Cloudflare policy controls and Bot Preference Sync toggle.
- 0:20–0:34 A-roll/B-roll split: Contrast search discovery with model training.
- 0:34–0:52 B-roll: Configure a test domain, reload robots.txt, and highlight the managed section.
- 0:52–1:04 A-roll: Explain preference versus enforcement, then deliver the CTA.

## On-screen text cues
- "SEARCH ≠ AGENTS ≠ TRAINING"
- "Set policy once"
- "Verify robots.txt"
- "Preference is not enforcement"
- "Human approves the policy"

## Caption options
Short: Cloudflare can synchronize your Search, Agent, and Training choices with robots.txt. Test it on one domain, verify the output, and keep the discoverability decision human-owned.

Long: AI crawler policy is no longer one yes-or-no switch. Bot Preference Sync can translate Cloudflare's Search, Agent, and Training settings into managed robots.txt directives while preserving an existing file. Start on a non-critical domain, verify the generated section, and use crawler blocking when you need technical enforcement rather than a published preference.

## CTA type + exact line
CTA type: save
Exact line: "Save this for your next website policy review."

## Thumbnail text options (3)
- SPLIT YOUR AI BOT RULES
- SEARCH IS NOT TRAINING
- FIX YOUR ROBOTS.TXT WORKFLOW

## Risk check (claims needing cautious phrasing)
- robots.txt communicates preferences and relies on crawler compliance; it is not, by itself, an access-control mechanism.
- Bot Preference Sync only adds managed directives when it is enabled and at least one eligible Search, Agent, or Training policy is not set to Allow.
- Blocking mixed-use crawlers can affect search discoverability; site owners should review the current Cloudflare options before changing production policy.
- Cloudflare says managed directives are prepended while an existing robots.txt file is preserved, but operators should still inspect the rendered file after every policy change.
- The recommendation to test on a non-critical domain is workflow guidance, not a Cloudflare requirement.

## Sources
- https://blog.cloudflare.com/bot-preference-sync/
- https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/
- https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/

## QA Scorecard
- Accuracy: 5/5 — The policy categories, sync behavior, preservation of an existing file, and preference-versus-enforcement caveat match Cloudflare's current documentation.
- Specificity: 5/5 — Names the eligible policy choices and gives a concrete configure, reload, and verify workflow.
- Clarity: 5/5 — Separates search discovery, agent access, training permission, and technical enforcement in plain language.
- Actionability: 5/5 — Gives a bounded test procedure and keeps the production policy decision human-owned.
- Format match: 5/5 — Uses every required heading in exact order and keeps the spoken section as read-aloud prose only.
- Creator usefulness: 5/5 — Gives site-owning creators and operators a practical 147-word policy-review workflow with clear caveats.
