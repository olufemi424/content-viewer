export type TopicState =
  | 'generated'
  | 'pending_reviewer'
  | 'reviewer_approved'
  | 'reviewer_rejected'
  | 'ingested';

export interface ReviewerGate {
  reviewerId: string;
  decision: 'approved' | 'rejected';
  reviewedAt: string; // ISO date-time
  notes?: string;
}

export interface IngestTopicInput {
  sourceId?: string;
  topic: string;
  state: TopicState;
  idempotencyKey: string;
  reviewerGate?: ReviewerGate;
  generatedAt?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}

export interface IngestTopicsRequest {
  requestId?: string;
  source?: string;
  dryRun?: boolean;
  topics: IngestTopicInput[];
}

export interface IngestResultItem {
  idempotencyKey: string;
  topic: string;
  status: 'written' | 'skipped_unapproved' | 'duplicate_payload' | 'duplicate_existing';
  reason?: string;
}

export interface IngestTopicsResponse {
  requestId: string;
  dryRun: boolean;
  total: number;
  written: number;
  skipped: number;
  results: IngestResultItem[];
}
