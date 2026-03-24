import { NextRequest, NextResponse } from 'next/server';
import {
  IngestResultItem,
  IngestTopicInput,
  IngestTopicsRequest,
  IngestTopicsResponse,
} from '@/lib/topicIngestion/contracts';
import { onlyApprovedTopics, validateIngestRequest } from '@/lib/topicIngestion/validation';
import { appendTopics, getSheetsConfigFromEnv, listExistingIdempotencyKeys, toSheetRow } from '@/lib/topicIngestion/sheets';

function makeRequestId(): string {
  return `ingest_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function collectPayloadDuplicates(topics: IngestTopicInput[]): Set<string> {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const topic of topics) {
    if (seen.has(topic.idempotencyKey)) dupes.add(topic.idempotencyKey);
    seen.add(topic.idempotencyKey);
  }
  return dupes;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as IngestTopicsRequest;
    validateIngestRequest(payload);

    const requestId = payload.requestId || makeRequestId();
    const dryRun = Boolean(payload.dryRun);

    const approved = onlyApprovedTopics(payload.topics);
    const payloadDupes = collectPayloadDuplicates(approved);

    const results: IngestResultItem[] = [];
    for (const topic of payload.topics) {
      if (topic.state !== 'reviewer_approved' || topic.reviewerGate?.decision !== 'approved') {
        results.push({
          idempotencyKey: topic.idempotencyKey,
          topic: topic.topic,
          status: 'skipped_unapproved',
          reason: 'Only reviewer-approved topics are written.',
        });
      }
    }

    if (approved.length === 0) {
      const response: IngestTopicsResponse = {
        requestId,
        dryRun,
        total: payload.topics.length,
        written: 0,
        skipped: results.length,
        results,
      };
      return NextResponse.json(response, { status: 200 });
    }

    let existingKeys = new Set<string>();
    if (!dryRun) {
      const config = getSheetsConfigFromEnv();
      existingKeys = await listExistingIdempotencyKeys(config);

      const rows: string[][] = [];
      for (const topic of approved) {
        if (payloadDupes.has(topic.idempotencyKey)) {
          results.push({
            idempotencyKey: topic.idempotencyKey,
            topic: topic.topic,
            status: 'duplicate_payload',
            reason: 'Duplicate idempotencyKey in request payload.',
          });
          continue;
        }

        if (existingKeys.has(topic.idempotencyKey)) {
          results.push({
            idempotencyKey: topic.idempotencyKey,
            topic: topic.topic,
            status: 'duplicate_existing',
            reason: 'idempotencyKey already exists in sheet.',
          });
          continue;
        }

        rows.push(toSheetRow(topic, payload.source));
        existingKeys.add(topic.idempotencyKey);
        results.push({ idempotencyKey: topic.idempotencyKey, topic: topic.topic, status: 'written' });
      }

      await appendTopics(config, rows);
    } else {
      for (const topic of approved) {
        if (payloadDupes.has(topic.idempotencyKey)) {
          results.push({
            idempotencyKey: topic.idempotencyKey,
            topic: topic.topic,
            status: 'duplicate_payload',
            reason: 'Duplicate idempotencyKey in request payload.',
          });
        } else {
          results.push({ idempotencyKey: topic.idempotencyKey, topic: topic.topic, status: 'written' });
        }
      }
    }

    const written = results.filter((r) => r.status === 'written').length;
    const response: IngestTopicsResponse = {
      requestId,
      dryRun,
      total: payload.topics.length,
      written,
      skipped: results.length - written,
      results,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to ingest topics';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
