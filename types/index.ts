export type ContentStatus = 'draft' | 'in-progress' | 'done';
export type ContentPriority = 'low' | 'medium' | 'high';

export type ContentStage = 'idea' | 'drafted' | 'recorded' | 'posted' | 'analyzed';

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

export interface CreateFileRequest {
  folder: string;
  filename: string;
  content?: string;
  metadata?: Metadata;
}
