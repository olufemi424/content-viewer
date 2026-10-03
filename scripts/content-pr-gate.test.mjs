#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process';
import { chmodSync, cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { tmpdir } from 'node:os';

const sourceRoot = process.cwd();
const testRoot = mkdtempSync(join(tmpdir(), 'content-pr-gate-'));
const worktree = join(testRoot, 'worktree');
const remote = join(testRoot, 'remote.git');
const fakeBin = join(testRoot, 'bin');
const ghLog = join(testRoot, 'gh.log');

const validScript = `Stop making agents click pixels like humans.

Most browser and desktop agents fail for boring reasons: a button moves, a menu collapses, or the screenshot parser guesses wrong. CLI-Anything is trying a different path. Instead of asking an agent to pretend it has eyes and hands, it wraps real software in a structured command-line interface.

That means an agent can run one-shot commands, stay inside an interactive session, read machine-readable JSON, and use undo or redo when the harness supports it. The useful operator lesson is simple: start with one bounded export task, inspect the output, and keep human approval before anything gets published, overwritten, or connected to credentials.

Comment HARNESS if you want the agent-interface checklist.`;

const invalidScript = `Hook: Stop making agents click pixels like humans.

Why this matters: Browser and desktop agents fail when buttons move, menus collapse, or screenshots are misread, so operators need a safer interface than pixel clicking.

Mechanism: CLI-Anything wraps real software in stateful command-line harnesses with one-shot commands, interactive sessions, JSON output, and undo or redo support.

Proof/use case: The catalog lists harnesses for Blender, GIMP, LibreOffice, Audacity, and OBS, which makes one bounded export task a realistic test.

CTA: Comment HARNESS if you want the checklist.`;

function exec(command, args, options = {}) {
  return execFileSync(command, args, { cwd: options.cwd ?? worktree, encoding: 'utf8', stdio: options.stdio ?? 'pipe', env: options.env ?? process.env });
}

function runGate(args) {
  return spawnSync(process.execPath, ['scripts/content-pr-gate.mjs', ...args], {
    cwd: worktree,
    encoding: 'utf8',
    stdio: 'pipe',
    env: { ...process.env, PATH: `${fakeBin}:${process.env.PATH}` },
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function contentWithFinalScript(finalScript) {
  return `---
title: "Gate fixture"
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

## Audience + difficulty

- **Audience:** builders
- **Difficulty:** intermediate

## Why now (1 sentence)

Agents need structured software controls now.

## 3 hook options (<12 words each)

1. Stop making agents click pixels.
2. Give agents commands.
3. Make software agent-ready.

## Final record-ready script

${finalScript}

## Shot list by timestamp (A-roll/B-roll)

- **0:00-0:05:** A-roll hook.

## On-screen text cues

- Commands over pixels.

## Caption options

### Short
Structured controls beat fragile pixel clicking.

## CTA type + exact line

- **Type:** comment keyword
- **Exact line:** Comment **HARNESS** for the checklist.

## Thumbnail text options (3)

1. STOP CLICKING
2. AGENT COMMANDS
3. CLI HARNESS

## Risk check (claims needing cautious phrasing)

- Do not imply every side effect is reversible.

## Sources

- https://example.com/source

## QA Scorecard

- **Accuracy: 5/5** — Source-linked and cautious.
- **Specificity: 5/5** — Concrete harness behavior.
- **Clarity: 5/5** — Plain spoken structure.
- **Actionability: 5/5** — Gives a bounded test.
- **Format match: 5/5** — Uses canonical schema.
- **Creator usefulness: 5/5** — Ready to record.
`;
}

try {
  mkdirSync(worktree, { recursive: true });
  mkdirSync(join(worktree, 'scripts'), { recursive: true });
  mkdirSync(join(worktree, 'content/2026/10-october/week-40'), { recursive: true });
  mkdirSync(fakeBin, { recursive: true });

  cpSync(join(sourceRoot, 'scripts/validate-content-schema.mjs'), join(worktree, 'scripts/validate-content-schema.mjs'));
  cpSync(join(sourceRoot, 'scripts/validate-content-schema.test.mjs'), join(worktree, 'scripts/validate-content-schema.test.mjs'));
  cpSync(join(sourceRoot, 'scripts/content-pr-generation-boundary.test.mjs'), join(worktree, 'scripts/content-pr-generation-boundary.test.mjs'));
  cpSync(join(sourceRoot, 'scripts/content-pr-gate.mjs'), join(worktree, 'scripts/content-pr-gate.mjs'));
  writeFileSync(join(worktree, 'package.json'), JSON.stringify({ private: true, scripts: { 'test:content-schema': 'node scripts/validate-content-schema.test.mjs && node scripts/content-pr-generation-boundary.test.mjs', 'validate:content-schema': 'node scripts/validate-content-schema.mjs' } }, null, 2));
  writeFileSync(join(fakeBin, 'gh'), `#!/bin/sh\nprintf '%s\\n' "$*" >> ${JSON.stringify(ghLog)}\n`);
  chmodSync(join(fakeBin, 'gh'), 0o755);

  execFileSync('git', ['init', '--bare', remote], { stdio: 'ignore' });
  exec('git', ['init', '-b', 'main']);
  exec('git', ['config', 'user.email', 'content-pr-gate@example.invalid']);
  exec('git', ['config', 'user.name', 'Content PR Gate Test']);
  exec('git', ['config', 'commit.gpgsign', 'false']);
  exec('git', ['add', 'package.json', 'scripts']);
  exec('git', ['commit', '-m', 'test baseline']);
  exec('git', ['remote', 'add', 'origin', remote]);
  exec('git', ['push', '-u', 'origin', 'main']);
  exec('git', ['checkout', '-b', 'content/gate-test']);

  const contentFile = join(worktree, 'content/2026/10-october/week-40/2026-10-03-post-gate-fixture.md');
  writeFileSync(contentFile, contentWithFinalScript(invalidScript));
  exec('git', ['add', relative(worktree, contentFile)]);
  exec('git', ['commit', '-m', 'invalid content fixture']);
  const invalid = runGate(['create', '--title', 'Invalid should not call gh']);
  assert(invalid.status !== 0, `invalid content should block PR creation\nstdout:\n${invalid.stdout}\nstderr:\n${invalid.stderr}`);
  assert(!existsSync(ghLog) || readFileSync(ghLog, 'utf8').trim() === '', 'invalid content should produce zero gh invocations');
  assert(invalid.stderr.includes('changed-content validation'), `invalid run should reach changed-content validation and fail closed\n${invalid.stderr}`);

  writeFileSync(contentFile, contentWithFinalScript(validScript));
  exec('git', ['add', relative(worktree, contentFile)]);
  exec('git', ['commit', '--amend', '--no-edit']);
  const valid = runGate(['create', '--title', 'Valid content PR', '--body', 'Validated']);
  assert(valid.status === 0, `valid content should reach fake gh after validation\nstdout:\n${valid.stdout}\nstderr:\n${valid.stderr}`);
  const log = readFileSync(ghLog, 'utf8').trim().split(/\r?\n/).filter(Boolean);
  assert(log.length === 1, `valid content should produce exactly one gh invocation, got ${log.length}: ${log.join(' | ')}`);
  assert(log[0] === 'pr create --title Valid content PR --body Validated', `unexpected gh invocation: ${log[0]}`);
  assert(valid.stderr.indexOf('changed-content validation') !== -1 && valid.stderr.indexOf('validation passed; running: gh pr create') > valid.stderr.indexOf('changed-content validation'), `gh should run only after changed-content validation\n${valid.stderr}`);

  console.log('content PR gate e2e test passed.');
  console.log('Invalid fixture gh invocations: 0');
  console.log(`Valid fixture gh invocation: ${log[0]}`);
} finally {
  if (!process.env.KEEP_CONTENT_PR_GATE_TEST) {
    rmSync(testRoot, { recursive: true, force: true });
  } else {
    console.log(`Kept test root: ${testRoot}`);
  }
}
