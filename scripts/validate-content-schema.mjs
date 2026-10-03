#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const REQUIRED_HEADINGS = [
  '## Audience + difficulty',
  '## Why now (1 sentence)',
  '## 3 hook options (<12 words each)',
  '## Final record-ready script',
  '## Shot list by timestamp (A-roll/B-roll)',
  '## On-screen text cues',
  '## Caption options',
  '## CTA type + exact line',
  '## Thumbnail text options (3)',
  '## Risk check (claims needing cautious phrasing)',
  '## Sources',
  '## QA Scorecard',
];

const FINAL_SCRIPT_HEADING = '## Final record-ready script';
const FINAL_SCRIPT_MIN_WORDS = 50;
const FINAL_SCRIPT_MIN_CHARS = 250;
const FINAL_SCRIPT_DISALLOWED_SUBHEADING_PATTERN = /^#{3,6}\s+/m;

const PLACEHOLDER_FINAL_SCRIPT_PATTERNS = [
  /^tbd$/i,
  /^todo$/i,
  /^to do$/i,
  /^placeholder$/i,
  /^n\/?a$/i,
  /^none$/i,
  /^coming soon$/i,
  /^draft forthcoming$/i,
  /^insert (the )?final (record-ready )?script( here)?$/i,
  /^final (record-ready )?script (goes )?here$/i,
];

function usage() {
  console.error('Usage: node scripts/validate-content-schema.mjs [--changed <base-ref>] [content/file.md ...]');
}

function normalizeFile(file) {
  return file.replaceAll('\\\\', '/').replace(/^\.\//, '');
}

function isContentMarkdown(file) {
  const normalized = normalizeFile(file);
  return normalized.startsWith('content/') && normalized.endsWith('.md');
}

function changedFiles(baseRef) {
  execFileSync('git', ['fetch', '--no-tags', '--depth=1', 'origin', baseRef.replace(/^origin\//, '')], {
    stdio: 'ignore',
  });
  const mergeBase = execFileSync('git', ['merge-base', `origin/${baseRef.replace(/^origin\//, '')}`, 'HEAD'], {
    encoding: 'utf8',
  }).trim();
  const output = execFileSync('git', ['diff', '--name-only', '--diff-filter=AM', `${mergeBase}...HEAD`], {
    encoding: 'utf8',
  });
  return output.split('\n').map((line) => line.trim()).filter(Boolean);
}

function parseArgs(argv) {
  const files = [];
  let changedBase = null;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--changed') {
      changedBase = argv[index + 1];
      if (!changedBase) {
        usage();
        process.exit(2);
      }
      index += 1;
      continue;
    }
    if (arg === '--help' || arg === '-h') {
      usage();
      process.exit(0);
    }
    files.push(arg);
  }
  if (changedBase && files.length > 0) {
    console.error('Use either --changed <base-ref> or explicit file paths, not both.');
    process.exit(2);
  }
  return changedBase ? changedFiles(changedBase) : files;
}

function validateFile(file) {
  const normalized = normalizeFile(file);
  if (!existsSync(normalized)) {
    return [`${normalized}: file does not exist`];
  }

  const content = readFileSync(normalized, 'utf8');
  const headings = content
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.startsWith('## '));

  const errors = [];
  const unexpected = headings.filter((heading) => !REQUIRED_HEADINGS.includes(heading));
  const missing = REQUIRED_HEADINGS.filter((heading) => !headings.includes(heading));

  if (missing.length > 0) {
    errors.push(`${normalized}: missing exact heading(s): ${missing.join('; ')}`);
  }
  if (unexpected.length > 0) {
    errors.push(`${normalized}: unexpected or case-mismatched heading(s): ${unexpected.join('; ')}`);
  }

  const relevant = headings.filter((heading) => REQUIRED_HEADINGS.includes(heading));
  const duplicate = relevant.find((heading, index) => relevant.indexOf(heading) !== index);
  if (duplicate) {
    errors.push(`${normalized}: duplicate heading: ${duplicate}`);
  }

  if (relevant.length === REQUIRED_HEADINGS.length) {
    for (let index = 0; index < REQUIRED_HEADINGS.length; index += 1) {
      if (relevant[index] !== REQUIRED_HEADINGS[index]) {
        errors.push(
          `${normalized}: headings are out of order; expected ${REQUIRED_HEADINGS[index]} at position ${index + 1}, found ${relevant[index]}`,
        );
        break;
      }
    }
  }

  const finalScriptBody = sectionBody(content, FINAL_SCRIPT_HEADING);
  if (finalScriptBody === null) {
    errors.push(`${normalized}: missing case-sensitive heading "${FINAL_SCRIPT_HEADING}"`);
  } else {
    const bodyError = validateFinalRecordReadyScript(finalScriptBody);
    if (bodyError) {
      errors.push(`${normalized}: ${FINAL_SCRIPT_HEADING} ${bodyError}`);
    }
  }

  return errors;
}

function sectionBody(content, heading) {
  const headingPattern = new RegExp(`(?:^|\\n)${escapeRegExp(heading)}[ \\t]*\\r?\\n`);
  const match = content.match(headingPattern);
  if (!match || match.index === undefined) {
    return null;
  }

  const bodyStart = match.index + match[0].length;
  const nextHeadingIndex = content.slice(bodyStart).search(/\r?\n## /);
  if (nextHeadingIndex === -1) {
    return content.slice(bodyStart);
  }
  return content.slice(bodyStart, bodyStart + nextHeadingIndex);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function validateFinalRecordReadyScript(body) {
  const trimmed = body.trim();
  if (!trimmed) {
    return 'must contain a substantive script body, not an empty section';
  }

  if (FINAL_SCRIPT_DISALLOWED_SUBHEADING_PATTERN.test(trimmed)) {
    return 'must be a single spoken script body, not an outline with subsection headings';
  }

  const prose = trimmed
    .replace(/<!--[^]*?-->/g, ' ')
    .split(/\r?\n/)
    .map((line) => line.replace(/^#{1,6}\s+/, '').trim())
    .filter(Boolean)
    .join(' ')
    .replace(/[*_`>#\-[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!prose) {
    return 'must contain script prose, not only subsection headings or formatting';
  }

  if (PLACEHOLDER_FINAL_SCRIPT_PATTERNS.some((pattern) => pattern.test(prose))) {
    return `must contain a substantive script body, not placeholder text: "${prose}"`;
  }

  const wordCount = prose.match(/\b[\p{L}\p{N}][\p{L}\p{N}'’:-]*\b/gu)?.length ?? 0;
  if (wordCount < FINAL_SCRIPT_MIN_WORDS || prose.length < FINAL_SCRIPT_MIN_CHARS) {
    return `must be substantive; found ${wordCount} word(s) and ${prose.length} character(s), expected at least ${FINAL_SCRIPT_MIN_WORDS} words and ${FINAL_SCRIPT_MIN_CHARS} characters`;
  }

  return null;
}

const filesToCheck = parseArgs(process.argv.slice(2)).filter(isContentMarkdown);

if (filesToCheck.length === 0) {
  console.log('No changed content markdown files to validate.');
  process.exit(0);
}

const failures = filesToCheck.flatMap((file) => validateFile(file));
if (failures.length > 0) {
  console.error('Content schema validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Validated ${filesToCheck.length} content markdown file(s).`);
