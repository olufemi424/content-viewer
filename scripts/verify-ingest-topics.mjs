#!/usr/bin/env node

import assert from 'node:assert/strict';

const baseUrl = process.env.CONTENT_VIEWER_BASE_URL || 'http://localhost:3001';

const payload = {
  requestId: 'verify-script',
  source: 'verify-script',
  dryRun: true,
  topics: [
    {
      topic: 'Approved topic should be written',
      state: 'reviewer_approved',
      idempotencyKey: 'verify-approved-1',
      reviewerGate: {
        reviewerId: 'reviewer-1',
        decision: 'approved',
        reviewedAt: '2026-03-24T23:00:00Z',
      },
    },
    {
      topic: 'Unapproved topic should be skipped',
      state: 'pending_reviewer',
      idempotencyKey: 'verify-unapproved-1',
    },
    {
      topic: 'Second approved topic should be written',
      state: 'reviewer_approved',
      idempotencyKey: 'verify-approved-2',
      reviewerGate: {
        reviewerId: 'reviewer-1',
        decision: 'approved',
        reviewedAt: '2026-03-24T23:00:00Z',
      },
    },
    {
      topic: 'Duplicate approved should be marked duplicate_payload',
      state: 'reviewer_approved',
      idempotencyKey: 'verify-approved-2',
      reviewerGate: {
        reviewerId: 'reviewer-1',
        decision: 'approved',
        reviewedAt: '2026-03-24T23:00:00Z',
      },
    },
  ],
};

const response = await fetch(`${baseUrl}/api/ingest-topics`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(payload),
});

assert.equal(response.status, 200, `Expected HTTP 200, got ${response.status}`);
const json = await response.json();

assert.equal(json.dryRun, true);
assert.equal(json.total, 4);
assert.equal(json.results.length, 4);

const statuses = new Set(json.results.map((r) => r.status));
assert(statuses.has('written'));
assert(statuses.has('skipped_unapproved'));
assert(statuses.has('duplicate_payload'));

console.log('verify:ingest-topics passed');
