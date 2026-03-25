import { IngestTopicInput, IngestTopicsRequest } from './contracts';

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?Z$/;

function isIsoDateTime(value: string): boolean {
  return ISO_DATE_RE.test(value);
}

export function validateIngestRequest(payload: unknown): asserts payload is IngestTopicsRequest {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be an object.');
  }

  const maybe = payload as Partial<IngestTopicsRequest>;
  if (!Array.isArray(maybe.topics) || maybe.topics.length === 0) {
    throw new Error('`topics` must be a non-empty array.');
  }

  for (const topic of maybe.topics) {
    validateTopic(topic as IngestTopicInput);
  }
}

function validateTopic(topic: IngestTopicInput): void {
  if (!topic || typeof topic !== 'object') throw new Error('Each topic must be an object.');
  if (!topic.topic || typeof topic.topic !== 'string') throw new Error('`topic` is required and must be a string.');
  if (!topic.idempotencyKey || typeof topic.idempotencyKey !== 'string') {
    throw new Error('`idempotencyKey` is required and must be a string.');
  }

  const validStates = new Set([
    'generated',
    'pending_reviewer',
    'reviewer_approved',
    'reviewer_rejected',
    'ingested',
  ]);

  if (!validStates.has(topic.state)) {
    throw new Error(`Invalid topic state: ${topic.state}`);
  }

  if (topic.state === 'reviewer_approved') {
    if (!topic.reviewerGate) {
      throw new Error('`reviewerGate` is required for reviewer_approved topics.');
    }
    if (topic.reviewerGate.decision !== 'approved') {
      throw new Error('`reviewerGate.decision` must be approved for reviewer_approved topics.');
    }
    if (!topic.reviewerGate.reviewerId) {
      throw new Error('`reviewerGate.reviewerId` is required for reviewer_approved topics.');
    }
    if (!topic.reviewerGate.reviewedAt || !isIsoDateTime(topic.reviewerGate.reviewedAt)) {
      throw new Error('`reviewerGate.reviewedAt` must be an ISO UTC date-time.');
    }
  }

  if (topic.generatedAt && !isIsoDateTime(topic.generatedAt)) {
    throw new Error('`generatedAt` must be an ISO UTC date-time when provided.');
  }
}

export function onlyApprovedTopics(topics: IngestTopicInput[]): IngestTopicInput[] {
  return topics.filter((topic) => topic.state === 'reviewer_approved' && topic.reviewerGate?.decision === 'approved');
}
