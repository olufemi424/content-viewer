---
title: "GitHub CLI just removed a dumb break in agent workflows"
status: draft
stage: research-complete
platform: x
content_type: short-video-script
pillar: builder-workflow
goal: teach
publish_date: 2026-09-02
cta_keyword: gh-media
created: 2026-09-02
modified: 2026-09-02
tags:
  - github
  - github-cli
  - developer-tools
  - agent-workflows
  - pull-requests
  - issues
---

## Hook
GitHub CLI just fixed one of the most annoying breaks in human and agent workflows: you can now attach screenshots and videos without leaving the terminal.

## Why this matters
If you file bugs, open pull requests, or let coding agents report what they changed, evidence matters more than explanation. The old workflow was clumsy: write the issue or PR in `gh`, stop, open the browser, drag in a screenshot or video, then go back and finish the post. GitHub's September 1 update matters because it turns media attachments into part of the same terminal command path. For creators, solo builders, and operators, that means faster bug reports, clearer PRs, and better proof when an agent says it fixed something.

## Mechanism
GitHub added a repeatable `--attach` flag to commands that write Markdown text in `gh`. According to GitHub's September 1 changelog and docs, it works on `gh issue create`, `gh issue edit`, `gh issue comment`, `gh pr create`, `gh pr edit`, and `gh pr comment`. If the Markdown body already references a local file path, GitHub rewrites that path to the uploaded asset while keeping the alt text. GitHub also says the feature supports PNG, JPEG, GIF, WebP, SVG, MP4, MOV, and WebM, requires `gh` v2.99.0, and follows the same upload limits as the web flow: 10 MB for images and GIFs, 10 MB for video on Free plans, and up to 100 MB for video on paid plans.

## Proof/use case
The practical use case is dead simple: if your agent opens a bug report after a failed UI test, it can now include the broken screen in the same command instead of describing the problem vaguely. If you open a PR with a before-and-after UI change, the reviewer can see the result immediately without pulling the branch first. That is small on paper, but it removes a real handoff break between terminal work and proof. GitHub also made this generally available across all plans with no preview period, which makes it more than an experiment.

## CTA
CTA type: Comment-for-template
Exact line: "Comment `gh-media` if you want my terminal bug-report template."

## Audience + difficulty
Audience: creator, solo-builder, operator
Difficulty: Beginner

## Why now (1 sentence)
This matters now because GitHub made `--attach` generally available on September 1, 2026, turning screenshots and videos into a first-class CLI workflow for issues, pull requests, and agent-generated updates.

## 3 hook options (<12 words each)
- GitHub fixed terminal proof sharing
- `gh` can finally attach screenshots
- Your agent can show receipts now

## Final record-ready script
"GitHub CLI just fixed a really dumb break
in human and agent workflows.

You can now attach screenshots and videos
without leaving the terminal.

That sounds small,
but it matters a lot.

Before this,
you could open an issue or PR in `gh`,
but if you wanted to show the actual bug,
the UI diff,
or a screen recording,
you usually had to stop,
open the browser,
drag the file in,
then come back.

GitHub's new `--attach` flag fixes that.

GitHub says it works on
issue create,
issue edit,
issue comment,
pull request create,
pull request edit,
and pull request comment.

So now the same command
that writes the Markdown
can also upload the screenshot or video.

That is huge for agents too.

If a coding agent files a bug,
it can show the broken screen.

If it opens a PR,
it can attach the before-and-after result
instead of just claiming the change works.

GitHub says this is generally available now,
works across all plans,
and ships in `gh` version 2.99.0.

So the bigger takeaway is this:
developer workflows are getting more multimodal.

The winning tools are not just better at generating text.
They're better at attaching proof.

Comment `gh-media`
if you want my terminal bug-report template."

## Shot list by timestamp (A-roll/B-roll)
- 0:00-0:08 A-roll: open with the "dumb break in workflows" line straight to camera.
- 0:08-0:20 B-roll: terminal showing `gh issue create` and a screenshot file beside it.
- 0:20-0:36 A-roll: explain the old browser detour and why it slowed reviews down.
- 0:36-0:52 B-roll: GitHub changelog bullets for `--attach`, supported commands, and v2.99.0.
- 0:52-1:06 A-roll: explain why agents and humans both benefit from proof-first reporting.
- 1:06-1:18 B-roll: show example bug screenshot, short UI clip, and PR comment flow.
- 1:18-1:28 A-roll: close with the multimodal workflow takeaway and CTA.

## On-screen text cues
- `gh` just added `--attach`
- Screenshots from the terminal
- Works on issues + PRs
- Better proof for agents
- Multimodal dev workflows

## Caption options: short + long
Short: "GitHub CLI can now attach screenshots and videos directly in issue and PR commands."
Long: "GitHub's September 1, 2026 `gh` update adds a repeatable `--attach` flag for issue and pull request create, edit, and comment commands. That means humans and coding agents can upload screenshots or videos in the same terminal workflow that writes the Markdown, instead of jumping out to the browser. It is generally available across all plans in `gh` v2.99.0 and supports common image and video formats, making proof-first bug reports and PRs much easier."

## CTA type + exact line
CTA type: Comment-for-template
Exact line: "Comment `gh-media` if you want my terminal bug-report template."

## Thumbnail text options (3)
- GitHub Fixed This Workflow
- `gh` Can Show Proof Now
- Terminal PRs With Media

## Risk check (claims needing cautious phrasing)
- Keep support, plan, and size-limit details attributed to GitHub's changelog and docs.
- Do not imply every local `gh` install already has the feature; GitHub says it requires `gh` v2.99.0.
- Avoid overstating agent automation; frame the agent use case as a workflow improvement, not autonomous correctness.

## Sources
- https://github.blog/changelog/2026-09-01-github-cli-media-in-issues-pull-requests-and-comments/
- https://docs.github.com/en/github-cli/github-cli/attaching-files-with-github-cli

## QA Scorecard
- Accuracy: 5/5
- Specificity: 5/5
- Clarity: 5/5
- Actionability: 4/5
- Format match: 5/5
- Creator usefulness: 5/5
