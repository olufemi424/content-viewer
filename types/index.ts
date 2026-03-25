export type ContentStatus = 'draft' | 'in-progress' | 'done';
export type ContentPriority = 'low' | 'medium' | 'high';

export type ContentStage = 'idea' | 'drafted' | 'recorded' | 'posted' | 'analyzed';
export type TopicState = 'generated' | 'pending_reviewer' | 'reviewer_approved' | 'reviewer_rejected' | 'ingested';

export interface Metadata {
  title?: string;
  status?: ContentStatus;
  priority?: ContentPriority;
  tags?: string[];
  created?: string;
  modified?: string;

  // Content system fields
  platform?: string;
  content_type?: string;
  pillar?: string;
  goal?: string;
  stage?: ContentStage;
  publish_date?: string;
  cta_keyword?: string;
  hook_score?: string;
  retention_target?: string;
  kpi_comments?: string;
  kpi_saves?: string;
  kpi_profile_visits?: string;
  actual_comments?: string;
  actual_saves?: string;
  actual_profile_visits?: string;
  lesson_learned?: string;

  // Topic-ingestion reviewer gate fields
  topic_state?: TopicState;
  reviewer_id?: string;
  reviewer_decision?: 'approved' | 'rejected';
  reviewer_reviewed_at?: string;
  reviewer_notes?: string;
  idempotency_key?: string;
}

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  metadata?: Metadata;
}

export interface FileContent {
  path: string;
  content: string;
  name: string;
  metadata?: Metadata;
}

