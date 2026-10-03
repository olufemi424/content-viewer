#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const repoRoot = process.cwd();
const dryRunRoot = join(repoRoot, 'content', '.dry-runs', 'content-pr-generation-boundary-test');
const contentRoot = join(dryRunRoot, '2026', '10-october', 'week-40');
const validator = join(repoRoot, 'scripts', 'validate-content-schema.mjs');

const sectionedOutline = `### Hook

Stop making agents click pixels like humans.

### Why this matters

Browser and desktop agents often break when a button moves or a layout changes. CLI-Anything takes a different route: give the agent a structured command-line interface to the real software.

### Mechanism

Its framework generates stateful CLI harnesses with one-shot commands, interactive sessions, machine-readable JSON, and undo and redo. The project also publishes a hub where agents can discover and install existing harnesses.

### Proof/use case

The official catalog lists more than 40 harnesses, including tools for Blender, GIMP, LibreOffice, Audacity, and OBS. So a practical test is to give an agent one bounded export task, inspect the JSON result and output file, then keep human approval before publishing or overwriting anything.

### CTA

Comment HARNESS if you want the agent-interface checklist.`;

const spokenScript = `Stop making agents click pixels like humans.

Most browser and desktop agents fail for boring reasons: a button moves, a menu collapses, or the screenshot parser guesses wrong. CLI-Anything is trying a different path. Instead of asking an agent to pretend it has eyes and hands, it wraps real software in a structured command-line interface.

That means an agent can run one-shot commands, stay inside an interactive session, read machine-readable JSON, and use undo or redo when the harness supports it. The CLI-Hub catalog already lists more than 40 harnesses for tools like Blender, GIMP, LibreOffice, Audacity, and OBS.

The operator lesson is simple: do not start with full autonomy. Start with one bounded export task. Let the agent call the harness, inspect the JSON result and the output file, then require a human approval step before anything gets published, overwritten, or connected to credentials.

So the shift is not “agents replace your judgment.” It is “agents get safer controls, and you keep the release gate.”

Comment HARNESS if you want the agent-interface checklist.`;

const sections = [
  ['Audience + difficulty', '- **Audience:** solo builders and operators automating work in desktop software\n- **Difficulty:** intermediate'],
  ['Why now (1 sentence)', 'CLI-Anything is drawing fresh attention as an open-source way to give agents structured command-line access to real software instead of relying on pixel-based GUI automation.'],
  ['3 hook options (<12 words each)', '1. **Stop making agents click pixels.**\n2. **Your agent needs commands.**\n3. **Make software agent-ready.**'],
  ['Final record-ready script', null],
  ['Shot list by timestamp (A-roll/B-roll)', '- **0:00–0:04 — A-roll:** Deliver the hook.'],
  ['On-screen text cues', '- Pixels move. Commands stay structured.'],
  ['Caption options', '### Short\nAgents do not need to imitate every human click.'],
  ['CTA type + exact line', '- **Type:** comment keyword\n- **Exact line:** Comment **HARNESS** if you want the agent-interface checklist.'],
  ['Thumbnail text options (3)', '1. STOP CLICKING PIXELS\n2. GIVE AGENTS COMMANDS\n3. SOFTWARE, NOW AGENT-READY'],
  ['Risk check (claims needing cautious phrasing)', '- Do not imply every external side effect can be reversed.'],
  ['Sources', '- https://x.com/LFrefman/status/2102763323762561506\n- https://github.com/HKUDS/CLI-Anything\n- https://pypi.org/project/cli-anything-hub/'],
  ['QA Scorecard', '- **Accuracy: 5/5** — Claims are source-linked and cautiously phrased.\n- **Specificity: 5/5** — Includes concrete harness capabilities and example apps.\n- **Clarity: 5/5** — Explains the pixel-to-command shift plainly.\n- **Actionability: 5/5** — Gives a bounded export test and approval boundary.\n- **Format match: 5/5** — Uses the canonical schema.\n- **Creator usefulness: 5/5** — Ready to record.'],
];

function contentWithFinalScript(title, finalScriptBody) {
  return `---
title: "${title}"
status: idea
stage: script-ready
platform: short-video
content_type: news-explainer
pillar: ai-builder-workflows
goal: educate
publish_date: 2026-10-03
cta_keyword: HARNESS
created: 2026-10-03
modified: 2026-10-03
tags:
  - cli-anything
  - ai-agents
---

${sections.map(([heading, body]) => `## ${heading}\n\n${body ?? finalScriptBody}`).join('\n\n')}
`;
}

function runValidator(file) {
  try {
    execFileSync(process.execPath, [validator, relative(repoRoot, file)], { encoding: 'utf8', stdio: 'pipe' });
    return { ok: true, output: '' };
  } catch (error) {
    return { ok: false, output: `${error.stdout?.toString() ?? ''}${error.stderr?.toString() ?? ''}` };
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

rmSync(dryRunRoot, { recursive: true, force: true });
mkdirSync(contentRoot, { recursive: true });

try {
  const failedGenerated = join(contentRoot, '2026-10-03-post-cli-anything-agent-interfaces.failed-generated.md');
  const dryRunArtifact = join(contentRoot, '2026-10-03-post-cli-anything-agent-interfaces.md');

  writeFileSync(failedGenerated, contentWithFinalScript('Failed generated CLI-Anything boundary fixture', sectionedOutline));
  const failedResult = runValidator(failedGenerated);
  assert(!failedResult.ok, `sectioned outline should fail before PR creation\n${failedResult.output}`);
  assert(
    failedResult.output.includes('single spoken script body'),
    `sectioned outline failure should identify the generation boundary issue\n${failedResult.output}`,
  );

  writeFileSync(dryRunArtifact, contentWithFinalScript('CLI-Anything gives agents structured controls for real software', spokenScript));
  const dryRunResult = runValidator(dryRunArtifact);
  assert(dryRunResult.ok, `clean dry-run artifact should pass before PR creation\n${dryRunResult.output}`);

  console.log('content PR generation boundary test passed.');
  console.log(`Dry-run artifact: ${dryRunArtifact}`);
} finally {
  if (!process.env.KEEP_CONTENT_PR_DRY_RUN) {
    rmSync(dryRunRoot, { recursive: true, force: true });
  }
}
