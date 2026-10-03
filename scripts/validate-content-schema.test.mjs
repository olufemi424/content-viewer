#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const repoRoot = process.cwd();
const fixtureDir = mkdtempSync(join(repoRoot, 'content/.schema-validator-test-'));
const validator = join(repoRoot, 'scripts/validate-content-schema.mjs');

const finalScript = `
Stop making agents click pixels like humans.

Most browser and desktop agents break for boring reasons: a button moves, a panel collapses, or the screenshot parser guesses wrong. CLI-Anything takes a more durable route. It wraps real software in stateful command-line harnesses, so an agent can call one-shot commands, stay in an interactive session, read JSON output, and use undo or redo when the harness supports it.

The useful operator move is not to remove humans. It is to give the agent one bounded export task, inspect the JSON result and artifact, then require approval before anything gets published, overwritten, or connected to credentials.
`;

const sections = {
  'Audience + difficulty': '- **Audience:** builders\n- **Difficulty:** intermediate',
  'Why now (1 sentence)': 'Agents need structured controls for software work.',
  '3 hook options (<12 words each)': '1. Stop making agents click pixels.\n2. Give agents commands.\n3. Make software agent-ready.',
  'Final record-ready script': finalScript.trim(),
  'Shot list by timestamp (A-roll/B-roll)': '- **0:00-0:05:** A-roll hook',
  'On-screen text cues': '- Commands over pixels',
  'Caption options': '### Short\nStructured controls beat fragile pixel clicking.',
  'CTA type + exact line': '- **Type:** comment keyword\n- **Exact line:** Comment **HARNESS** for the checklist.',
  'Thumbnail text options (3)': '1. STOP CLICKING\n2. AGENT COMMANDS\n3. CLI HARNESS',
  'Risk check (claims needing cautious phrasing)': '- Do not imply every side effect is reversible.',
  Sources: '- https://example.com/source',
  'QA Scorecard': '- **Accuracy: 5/5** — Source-linked and cautious.',
};

function markdownWithFinalScript(finalScriptBody) {
  return `---\ntitle: "Validator fixture"\n---\n\n${Object.entries({ ...sections, 'Final record-ready script': finalScriptBody })
    .map(([heading, body]) => `## ${heading}\n\n${body}`)
    .join('\n\n')}\n`;
}

function writeFixture(name, finalScriptBody) {
  const file = join(fixtureDir, name);
  writeFileSync(file, markdownWithFinalScript(finalScriptBody));
  return file;
}

function runValidator(file) {
  try {
    execFileSync(process.execPath, [validator, relative(repoRoot, file)], { encoding: 'utf8', stdio: 'pipe' });
    return { ok: true, output: '' };
  } catch (error) {
    return {
      ok: false,
      output: `${error.stdout?.toString() ?? ''}${error.stderr?.toString() ?? ''}`,
    };
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const cases = [
  { name: 'valid.md', body: finalScript.trim(), shouldPass: true },
  { name: 'empty.md', body: '', shouldPass: false },
  { name: 'whitespace.md', body: '   \n\t  ', shouldPass: false },
  { name: 'placeholder.md', body: 'TBD', shouldPass: false },
  { name: 'headings-only.md', body: '### Hook\n\n### CTA', shouldPass: false },
  { name: 'sectioned-outline.md', body: '### Hook\n\nStop making agents click pixels like humans.\n\n### Why this matters\n\nMost browser and desktop agents break when a button moves or a layout changes. CLI-Anything takes a more durable route by wrapping real software in stateful command-line harnesses.\n\n### Mechanism\n\nAn agent can call one-shot commands, stay in an interactive session, read JSON output, and use undo or redo when the harness supports it.\n\n### CTA\n\nComment HARNESS if you want the checklist.', shouldPass: false },
  { name: 'too-short.md', body: 'A short non-placeholder line.', shouldPass: false },
];

try {
  for (const testCase of cases) {
    const file = writeFixture(testCase.name, testCase.body);
    const result = runValidator(file);
    assert(
      result.ok === testCase.shouldPass,
      `${testCase.name} expected ${testCase.shouldPass ? 'pass' : 'failure'}, got ${result.ok ? 'pass' : 'failure'}\n${result.output}`,
    );
    if (!testCase.shouldPass) {
      assert(
        result.output.includes('## Final record-ready script'),
        `${testCase.name} failure should identify the final script section\n${result.output}`,
      );
    }
  }
  console.log(`validate-content-schema tests passed (${cases.length} cases).`);
} finally {
  rmSync(fixtureDir, { recursive: true, force: true });
}
