# Show-and-tell workflow: Turn a messy spreadsheet into a checked data pack

## Audience + difficulty
Freelancers, operators, agencies, founders, and small teams that receive inconsistent CSV or Excel exports; beginner-friendly, with a medium setup because the operator must define the target schema and review every changed row.

## Why now (1 sentence)
People are actively looking for AI help with duplicate removal, format normalization, and missing-field cleanup, while the visible result is easy to judge in a before-and-after spreadsheet.

## 3 hook options (<12 words each)
- This messy spreadsheet becomes a clean, reviewable data pack.
- AI can clean rows; you still approve what it changes.
- Stop handing clients a cleaned file you cannot explain.

## Final record-ready script
This is the finished result: a cleaned contact sheet beside an exception report that shows every row the AI changed, skipped, or could not verify. Start with a redacted CSV or Excel export. In Claude, ChatGPT, or an AI spreadsheet tool, give it the target columns and explicit rules: standardize country names, normalize phone numbers, flag duplicate emails, and leave uncertain values untouched. Ask for two outputs: the cleaned table and a change log with row number, old value, new value, and reason. Then check a few rows against the source, filter the exception report, and fix the rules before running it again. Keep the original file, and do not let the model invent missing contact details. The useful deliverable is a clean sheet someone can use and a short audit trail someone can trust. Save this workflow if you clean spreadsheets for clients or your own team.

## Shot list by timestamp (A-roll/B-roll)
- 0:00–0:03 — A-roll: show the finished clean sheet and exception report full screen before explaining anything.
- 0:03–0:08 — A-roll: introduce the problem while B-roll shows a redacted messy export with inconsistent country, phone, and email values.
- 0:08–0:15 — A-roll: show the target schema and the four cleanup rules being entered into the AI tool.
- 0:15–0:23 — A-roll: show the generated clean table; B-roll zooms into normalized values and preserved row IDs.
- 0:23–0:31 — A-roll: show the change log with old value, new value, row number, and reason columns.
- 0:31–0:39 — A-roll: filter the exception report; B-roll shows blank, ambiguous, duplicate, and rejected examples.
- 0:39–0:47 — A-roll: compare three rows with the original file and correct one rule that produced a false match.
- 0:47–0:55 — A-roll: show the final folder containing original, cleaned, exception report, and rules file; deliver the CTA.

## On-screen text cues
- 0:00: CLEAN SHEET + EXCEPTION REPORT
- 0:04: INPUT: REDACTED CSV / XLSX
- 0:10: DEFINE THE TARGET SCHEMA
- 0:16: NORMALIZE, FLAG, DO NOT GUESS
- 0:24: EVERY CHANGE GETS A ROW
- 0:33: EXCEPTIONS NEED HUMAN REVIEW
- 0:42: COMPARE BACK TO SOURCE
- 0:49: ORIGINAL | CLEANED | LOG | RULES

## Caption options
1. A clean spreadsheet is useful. A clean spreadsheet with a change log is reviewable. This workflow keeps the original, defines rules up front, leaves uncertain values alone, and produces an exception report for human review.
2. Turn a messy CSV into a usable data pack: cleaned table, row-level change log, and exception queue. Keep the source file and approve the uncertain rows.
3. AI can normalize a spreadsheet quickly. The trust layer is the rules, the preserved original, and the list of rows it could not safely change.

## CTA type + exact line
Save CTA: Save this workflow if you clean spreadsheets for clients or your own team.

## Thumbnail text options (3)
- MESSY SHEET → CHECKED DATA PACK
- CLEAN IT WITHOUT LOSING TRUST
- AI CLEANUP + CHANGE LOG

## Risk check (claims needing cautious phrasing)
- Treat YouTube views and likes as observed attention signals, not proof that an AI cleanup workflow is accurate or saves a specific amount of time.
- Do not promise that AI will correctly infer missing values, resolve every duplicate, or preserve formatting across every Excel/CSV export.
- The script names Claude, ChatGPT, and AI spreadsheet tools as examples; capabilities, file limits, privacy controls, and pricing vary by product and plan.
- Use redacted or permitted data for a public demo. Do not upload confidential client records without checking the tool's current data-handling terms.
- The workflow should preserve row IDs and the original file, but the operator must verify the output against the source before delivery or import.
- Agent-Reach YouTube subtitle retrieval was attempted but the channel was rate-limited; this brief does not claim transcript-level inspection.
- Reddit results came from public-web page/search-results scope with completeness unverified; they are demand signals, not a complete survey.

## Sources
1. Kenji Explains, "Master Data Cleaning Essentials on Excel in Just 10 Minutes," YouTube, published 2023-06-11; 1,555,115 views and 40,377 likes observed 2026-11-13. The result demonstrates strong interest in the visible data-cleaning outcome, though it is not an AI-specific tutorial. https://www.youtube.com/watch?v=jxq4-KSB_OA
2. Excel For Freelancers, "STOP Cleaning Data Manually — Build a Free AI Data Cleaner That Fixes Messy Spreadsheets in Seconds," YouTube, published 2026-02-03; 5,178 views and 205 likes observed 2026-11-13. https://www.youtube.com/watch?v=TtfiIU8nxAc
3. Reddit, r/ExcelAi, "Any AI tool for Excel data cleanup?" published 2025-10-15. The public result asks for automating country propagation, validation, and column manipulation. Agent-Reach returned search-results scope and completeness_verified=false. https://www.reddit.com/r/ExcelAi/comments/1o76w79/any_ai_tool_for_excel_data_cleanup/
4. Reddit, r/AItoolsCatalog, "Best AI tool to automate data cleaning in Google Sheets?" published 2025-06-07. The public result names duplicate removal, format standardization, and categorization as desired tasks. Agent-Reach returned search-results scope and completeness_verified=false. https://www.reddit.com/r/AItoolsCatalog/comments/1l5jwii/best_ai_tool_to_automate_data_cleaning_in_google/
5. adithkuttz/Automated-Data-Analysis-Pipeline, GitHub. README metadata describes date normalization, field validation, staging/final tables, and Quadratic for validation, analysis, and summarization. Agent-Reach GitHub read succeeded; the repository showed 0 stars and 0 forks when checked 2026-11-13. https://github.com/adithkuttz/Automated-Data-Analysis-Pipeline

## QA Scorecard
- Accuracy: 4/5 — source metrics and access limits are recorded; product behavior is phrased conditionally.
- Demand Evidence: 4/5 — medium demand with clear buyer intent: 1.56M views on general data cleaning, an AI-specific tutorial, two direct public requests, and an implementation repository.
- Final-Result Clarity: 5/5 — the first frame shows the cleaned table and exception report.
- Showability: 5/5 — input, action, output, and the row-level trust detail are visible.
- Reproducibility: 5/5 — the rules, schema, preserved original, and review loop are concrete.
- Save/Share Value: 5/5 — viewers can reuse the rule and change-log pattern.
- Audience Fit: 5/5 — the workflow fits client exports and internal operations.
- Actionability: 5/5 — the script gives a bounded sequence and a stop condition.
- Record-Readiness: 5/5 — result-first script, timed shots, text cues, captions, CTA, and risks are complete.

Demand gate: PASS at medium demand because the buyer intent is explicit and the finished result is highly demonstrable.

Deduplication: Checked `origin/main` content from the last 30 days and all open PRs with `git` and `gh` on 2026-11-13. Rejected overlap with spreadsheet-to-operations-app (#276), metric investigation (#290), invoice processing (#275), client report/dashboard (#268), client handoff pack (#293), support knowledge base (#297), and recent content repurposing or document workflows. This brief starts with a messy tabular export and produces a cleaned table plus row-level exception/change log; it does not build an app, investigate a metric, process invoices, generate a report, or publish client content. No substantial overlap was found.

Humanizer pass: Applied only to the spoken script. Removed staged filler and generic AI phrasing, varied sentence rhythm, and kept the tools, inputs, outputs, trust boundary, caveats, and CTA intent intact. Research sections were not rewritten wholesale.
