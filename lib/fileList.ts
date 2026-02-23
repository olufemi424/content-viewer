import { FileNode } from '@/types';

/** Flatten a FileNode tree depth-first into an ordered array of file paths only. */
export function flattenFileList(nodes: FileNode[]): FileNode[] {
  const result: FileNode[] = [];
  for (const node of nodes) {
    if (node.type === 'file') {
      result.push(node);
    } else if (node.children) {
      result.push(...flattenFileList(node.children));
    }
  }
  return result;
}

/** Given a flat file list and current path, return the prev and next FileNodes. */
export function getPrevNext(flat: FileNode[], currentPath: string): { prev: FileNode | null; next: FileNode | null } {
  const idx = flat.findIndex(f => f.path === currentPath);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

/** Get all direct children (files + folders) of a given folder path. */
export function getFolderChildren(nodes: FileNode[], folderPath: string): FileNode[] {
  if (!folderPath) return nodes;
  const parts = folderPath.split('/');

  let current: FileNode[] = nodes;
  for (const part of parts) {
    const found = current.find(n => n.type === 'folder' && n.name === part);
    if (!found || !found.children) return [];
    current = found.children;
  }
  return current;
}
