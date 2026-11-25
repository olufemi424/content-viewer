---
title: "Review Agent-Built UI Without Writing Another Prompt"
status: idea
stage: research-complete
platform: youtube-shorts|tiktok|instagram-reels|linkedin
content_type: show-and-tell-workflow
pillar: ai-workflows
goal: attract-leads
publish_date: 2026-11-24
cta_keyword: REVIEW
audience: small-team-product-operators
difficulty: intermediate
created: 2026-11-24
modified: 2026-11-24
tags:
  - github-copilot
  - vscode
  - ui-review
  - product-operations
  - workflow
---

## Audience + difficulty
- **Audience:** small-team product operators who review agent-built web UI before a developer accepts the changes.
- **Difficulty:** intermediate; requires VS Code with the August 2026 Copilot updates, a local HTML page, an approved test brief, and a human reviewer.
- **Input:** one reproducible UI issue, its acceptance checks, and a local branch with no production credentials.
- **Output:** a reviewed draft change with element-level feedback, visible evidence, and a human accept-or-reject decision.
- **Workflow score:** Trigger 5/5 | Input clarity 5/5 | Mechanism 5/5 | Output clarity 5/5 | Human gate 5/5 | Evidence 5/5 | Reproducibility 5/5 | Audience value 5/5 | 35–45s showability 5/5 = **45/45**.
- **Evidence status:** Sheet claim **verified** against GitHub’s August 31 changelog; release timing, external-session continuity, and detailed chat usage **verified** in the dated VS Code 1.135 notes; element annotation and batch feedback **verified** in GitHub’s release summary, all accessed 2026-11-24.
- **Reproducibility gate:** start from a clean local branch without production credentials, save three acceptance checks, let one agent session implement the bounded issue, preview the local page, annotate exact elements, request one batch correction, capture before/after evidence, and require a human to accept or reject the diff.
- **Duplicate gate:** passed on 2026-11-24. Recent Linear coverage used autonomous browser testing and screenshot proof for delegated bug fixes. This workflow instead makes the product operator the browser reviewer, turns element annotations into one bounded correction batch, and ends with a human diff decision; the mechanism and angle are materially different.

## Why now (1 sentence)
GitHub’s August Copilot release added element-level browser annotations and batch feedback alongside improved agent-session review controls in VS Code.

## 3 hook options (<12 words each)
1. Stop describing UI bugs in another giant prompt.
2. Point at broken UI; let the agent batch the fixes.
3. Review agent-built pages like a product operator.

## Final record-ready script
Stop describing UI bugs in another giant prompt.
VS Code’s Copilot browser now lets you annotate multiple page elements, then send that feedback to the agent in one batch.
Start with a local branch and three acceptance checks.
Let the agent build, open the preview, and click the exact spacing, copy, or layout problems.
Send one correction batch, then compare the diff and before-and-after page.
Reject anything that misses a check; a human accepts the final change.
Already reviewing agent-built UI? Comment REVIEW for the checklist.

## Shot list by timestamp (A-roll/B-roll)
- **0:00–0:03 — A-roll:** Hold up a dense prompt, then cross it out.
- **0:03–0:06 — B-roll:** Show GitHub’s August 31 changelog title and date.
- **0:06–0:09 — B-roll:** Highlight “Comment on web page elements.”
- **0:09–0:12 — B-roll:** Select three broken elements in a local preview.
- **0:12–0:15 — B-roll:** Show a clean local branch with production credentials absent.
- **0:15–0:18 — B-roll:** Pin three acceptance checks beside the preview.
- **0:18–0:21 — B-roll:** Show the agent editing the bounded page.
- **0:21–0:24 — B-roll:** Click one spacing issue.
- **0:24–0:27 — B-roll:** Click one copy issue and one layout issue.
- **0:27–0:30 — B-roll:** Send the three annotations as one correction batch.
- **0:30–0:33 — B-roll:** Compare the before-and-after page.
- **0:33–0:36 — B-roll:** Inspect the file diff against the checks.
- **0:36–0:39 — A-roll:** Put a human accept-or-reject card on screen.
- **0:39–0:43 — A-roll/B-roll:** Deliver the gated `REVIEW` CTA beside the checklist.

## On-screen text cues
- `Stop rewriting the prompt`
- `Annotate exact elements`
- `Local branch • no prod secrets`
- `3 acceptance checks`
- `One correction batch`
- `Before/after + diff`
- `Human accepts or rejects`
- `Reviewing agent UI? Comment REVIEW`

## Caption options
1. Replace vague UI follow-ups with element-level feedback, one correction batch, and a human diff decision.
2. Agent-built UI still needs product judgment; make that judgment visible on the page and testable in the diff.
3. Bound the issue, annotate the preview, compare the evidence, and let a human decide whether the change lands.

## CTA type + exact line
- **Type:** gated comment-keyword CTA; the checklist is for viewers already responsible for reviewing agent-built UI.
- **Exact line:** Already reviewing agent-built UI? Comment REVIEW for the checklist.

## Thumbnail text options (3)
1. POINT AT THE UI BUG
2. REVIEW, DON’T REPROMPT
3. BATCH THE UI FIXES

## Risk check (claims needing cautious phrasing)
- Say the integrated browser can annotate multiple HTML elements and send targeted feedback to the agent; do not imply that visual annotations prove accessibility, responsiveness, or functional correctness.
- GitHub’s August 31 summary covers VS Code versions 1.132 through 1.135; feature availability can depend on the installed version, rollout, plan, and experimental settings.
- The workflow uses a local branch without production credentials; do not demonstrate it against a live customer or production environment.
- Before-and-after visuals support review but do not replace acceptance checks, automated tests, or diff inspection.
- Keep the human gate explicit: the agent proposes and revises; a person accepts or rejects the final change.

## Sources
- https://github.blog/changelog/2026-08-31-github-copilot-in-vs-code-august-2026-releases/ — **verified**, Sheet source URL; published 2026-08-31 and accessed 2026-11-24. Confirms side-by-side sessions, shared-context side conversations, element annotation, batch feedback, and related review controls.
- https://code.visualstudio.com/updates/v1_135 — **verified**, official release notes published 2026-08-26 and accessed 2026-11-24. Confirms the release date, agent-session continuity, review-oriented Agents window updates, and detailed per-turn usage.

## QA Scorecard
- Accuracy: 5/5 — the dated official sources support element annotation, batch feedback, and the release context; workflow recommendations are clearly separated from product claims.
- Specificity: 5/5 — names one audience, one bounded UI issue, three checks, one correction batch, two evidence views, and one decision gate.
- Clarity: 5/5 — follows one review loop from acceptance checks through annotations, revision, evidence, and human decision.
- Actionability: 5/5 — includes prerequisites, safe scope, exact review actions, rejection criteria, and ownership.
- Format match: 5/5 — required headings, frontmatter, bullet URLs, 2–4-second visual changes, and one gated CTA are present.
- Creator usefulness: 5/5 — converts a release bundle into a compact product-operator workflow that is easy to demonstrate on screen.
- Evidence quality: 5/5 — the Sheet source was revalidated and corroborated by dated official VS Code release notes.
- Duplicate safety: 4/5 — it touches browser-based UI review but materially changes the operator, mechanism, and result from the recent Linear agent-testing post.
- Reproducibility: 5/5 — clean scope, fixed checks, observable annotations, before/after proof, diff review, and a human decision are explicit.
