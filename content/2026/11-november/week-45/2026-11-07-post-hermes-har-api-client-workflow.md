---
title: "Turn one browser session into a reusable API client"
status: draft
stage: research-complete
platform: youtube-shorts|tiktok|instagram-reels|linkedin
content_type: short-video-script
pillar: builder-workflows
goal: teach
publish_date: 2026-11-07
cta_keyword: none
audience: solo-builders|operators|small-teams
difficulty: intermediate
created: 2026-11-07
modified: 2026-11-07
tags:
  - hermes-agent
  - browser-automation
  - har
  - api-client
  - playwright
---

## Audience + difficulty
- **Audience:** solo builders, automation engineers, and small teams repeating the same browser-based data task.
- **Difficulty:** intermediate. Capture requires Playwright and Chromium or an approved CDP browser; replay requires an HTTP client such as requests, httpx, curl, or urllib.
- **Starting input:** one authorized browser interaction with a site that fetches JSON through XHR or fetch.
- **Final output:** a tested, browserless HTTP client for the observed endpoint, with a browser fallback when the private API changes.
- **Evidence status:** verified from the current Hermes Agent documentation, skill source, scripts, and launch post; the workflow was documented, not independently reproduced in this run.

## Why now (1 sentence)
Hermes Agent's current optional skill now documents both local and CDP capture paths, a HAR-to-endpoint derivation step, and browserless verification, turning a launch demo into a repeatable workflow with explicit security limits.

## 3 hook options (<12 words each)
1. Stop clicking through the same website on every agent run
2. Turn one browser session into a reusable API client
3. Your browser automation may only need the browser once

## Final record-ready script
Your agent should not repeat the same website clicks for every result.

Hermes Agent's HAR-derived API client skill records one approved browser session, filters the HAR for XHR, fetch, and JSON traffic, then shows the method, endpoint, parameters, headers, and replay hints. Write a small HTTP client and test it browserless against the same task.

This can make repeat work lighter, but it is not an auth bypass. Cookies and tokens expire, private endpoints change, and HAR files can contain live secrets. Use only sites you are allowed to automate, delete the HAR after derivation, and keep a browser fallback.

Save this workflow before your next brittle browser automation.

## Shot list by timestamp (A-roll/B-roll)
- **0:00–0:03 — B-roll:** Open with the same search running twice: once through a browser, once through a tiny HTTP client. On-screen text: `BROWSER ONCE. CLIENT AFTER.`
- **0:03–0:06 — A-roll:** Deliver the hook beside repeated browser clicks.
- **0:06–0:09 — B-roll:** Show the Hermes optional skill installation page and version 0.1.0 label.
- **0:09–0:12 — B-roll:** Start one approved local browser capture with the target interaction highlighted.
- **0:12–0:15 — B-roll:** Switch to the documented CDP path for an existing remote browser.
- **0:15–0:18 — B-roll:** Show the HAR file collecting XHR, fetch, and JSON traffic.
- **0:18–0:21 — B-roll:** Filter static assets out and highlight one API-looking endpoint.
- **0:21–0:24 — B-roll:** Reveal the method, path template, query parameters, and request body.
- **0:24–0:27 — B-roll:** Highlight replay hints for user agent, cookie, and auth presence without displaying secret values.
- **0:27–0:30 — B-roll:** Turn the observed request into a small HTTP client.
- **0:30–0:33 — B-roll:** Run the client without a browser and compare the returned data.
- **0:33–0:36 — B-roll:** Flash the limits: `No auth bypass`, `Sessions expire`, `Endpoints change`.
- **0:36–0:39 — B-roll:** Delete the sensitive HAR and show a browser fallback path.
- **0:39–0:42 — A-roll:** Deliver the single save CTA over the working client output.

## On-screen text cues
- `BROWSER ONCE. CLIENT AFTER.`
- `Capture authorized XHR/fetch traffic`
- `HAR → method + endpoint + parameters`
- `Replay browserless`
- `Never expose HAR secrets`
- `Keep a browser fallback`
- `Save before your next brittle automation`

## Caption options
1. Hermes Agent's optional skill records one approved browser interaction, derives the observed JSON endpoint, and helps you verify the same result over plain HTTP.
2. The reusable lesson is to derive a lightweight client after a successful browser run, then keep the browser as a fallback when private endpoints change.
3. HAR files can contain active cookies and tokens. Treat them as sensitive, use only authorized sites, and delete the capture after derivation.

## CTA type + exact line
- **Type:** save.
- **Exact line:** Save this workflow before your next brittle browser automation.

## Thumbnail text options (3)
1. USE THE BROWSER ONCE
2. HAR → API CLIENT
3. STOP REPLAYING CLICKS

## Risk check (claims needing cautious phrasing)
- Describe the workflow as capturing and replaying requests observed during an authorized session. It does not bypass authentication, CAPTCHAs, bot detection, permissions, or site terms.
- HAR files can contain live cookies, authorization headers, response bodies, and private data. Never display them in a recording; store them briefly, restrict access, and delete them after derivation.
- Private APIs are undocumented and can change without notice. Re-capture or fall back to the browser when a tested client breaks.
- Server-rendered pages may expose no useful XHR or JSON endpoint, so this workflow does not fit every site.
- Session-bound credentials expire. Do not claim the generated client works forever or can safely reuse another person's session.
- Use only sites and accounts you are authorized to automate. Review terms, rate limits, data rights, and privacy obligations before production use.
- Repository behavior and documentation were verified on 2026-11-07; the workflow was not independently reproduced during this content run.

## Sources
1. **Verified primary source, published 2026-08-12 and accessed 2026-11-07:** Teknium's Hermes Agent launch post describing the optional skill and installation command: https://x.com/Teknium/status/2087686461822996905
2. **Verified official documentation, current page accessed 2026-11-07:** Hermes Agent HAR-derived API client skill, setup, local/CDP capture, derivation, replay, security limits, and verification: https://hermes-agent.nousresearch.com/docs/user-guide/skills/optional/web-development/web-development-har-derived-api-client
3. **Verified primary source, current file accessed 2026-11-07:** Hermes Agent skill definition and documented procedure: https://github.com/NousResearch/hermes-agent/blob/main/optional-skills/web-development/har-derived-api-client/SKILL.md
4. **Verified primary source, current code accessed 2026-11-07:** Hermes Agent capture and HAR-derivation scripts: https://github.com/NousResearch/hermes-agent/tree/main/optional-skills/web-development/har-derived-api-client/scripts
5. **Supplied Sheet evidence, captured 2026-08-13 and rechecked 2026-11-07:** Google Sheet row 325, source URL https://x.com/Teknium/status/2087686461822996905

## QA Scorecard
### Workflow-first eligibility (9 dimensions)
| Dimension | Score | Evidence |
|---|---:|---|
| Specificity of the problem | 5/5 | Replaces repeated browser navigation for one observed JSON-backed interaction. |
| Visibility of the result | 4/5 | The demo can compare repeated browser clicks with the same data returned by a small client. |
| Repeatability | 4/5 | The skill documents local and CDP capture paths, but selectors, sessions, and endpoints vary by site. |
| Save value | 5/5 | Builders can reuse the capture, derive, replay, verify, and fallback sequence. |
| Share value | 4/5 | The browser-once/client-after contrast is concrete and easy to explain. |
| Strength of the first-second hook | 4/5 | A side-by-side browser versus HTTP result makes the payoff immediate. |
| Ease of a 35–45-second demonstration | 5/5 | The 42-second plan changes visual evidence every three seconds. |
| Evidence quality | 5/5 | The launch post, current official documentation, skill source, and scripts support the mechanism and limitations. |
| CTA or downloadable-asset potential | 4/5 | A save CTA is supported; no uncreated client or template is promised. |

**Workflow gate result:** 40/45. Passes the required 30/45 threshold.

### Content QA
| Criterion | Score | Check |
|---|---:|---|
| Accuracy | 5/5 | Claims match the current skill documentation, code paths, and explicit security caveats. |
| Specificity | 5/5 | Names the capture routes, filtered traffic, derived fields, replay step, verification, and failure boundaries. |
| Clarity | 5/5 | Explains HAR capture and browserless replay without requiring prior reverse-engineering knowledge. |
| Actionability | 5/5 | Viewers get a bounded workflow plus authorization, secret-handling, endpoint-change, and fallback rules. |
| Format match | 5/5 | Frontmatter and every required case-sensitive section are present in the mandated order. |
| Creator usefulness | 5/5 | The workflow addresses a recurring automation cost and shows where human authorization and review remain necessary. |
