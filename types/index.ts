export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

export interface FileContent {
  path: string;
  content: string;
  name: string;
}

export interface CreateFileRequest {
  folder: string;
  filename: string;
  content?: string;
}
