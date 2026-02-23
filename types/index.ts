export type ContentStatus = 'draft' | 'in-progress' | 'done';
export type ContentPriority = 'low' | 'medium' | 'high';

export interface Metadata {
  title?: string;
  status?: ContentStatus;
  priority?: ContentPriority;
  tags?: string[];
  created?: string;
  modified?: string;
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
