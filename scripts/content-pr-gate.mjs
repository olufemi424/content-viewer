#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const allowedPrCommands = new Set(['create', 'edit']);

function usage() {
  console.error('Usage: node scripts/content-pr-gate.mjs <create|edit> [gh-pr-args...]');
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    env: process.env,
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  return result;
}

function runRequired(command, args, label) {
  console.error(`[content-pr-gate] ${label}: ${command} ${args.join(' ')}`);
  const result = run(command, args);
  if (result.status !== 0) {
    console.error(`[content-pr-gate] blocked PR command because ${label} failed with exit ${result.status ?? 'unknown'}.`);
    process.exit(result.status || 1);
  }
}

const [prCommand, ...prArgs] = process.argv.slice(2);

if (!allowedPrCommands.has(prCommand)) {
  usage();
  process.exit(2);
}

runRequired('npm', ['run', 'test:content-schema'], 'content schema tests');
runRequired('npm', ['run', 'validate:content-schema', '--', '--changed', 'origin/main'], 'changed-content validation');

console.error(`[content-pr-gate] validation passed; running: gh pr ${prCommand} ${prArgs.join(' ')}`);
const ghResult = run('gh', ['pr', prCommand, ...prArgs]);
process.exit(ghResult.status ?? 1);
