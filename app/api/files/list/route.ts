import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { FileNode } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), '.', 'content');

function buildFileTree(dirPath: string, relativePath: string = ''): FileNode[] {
  const items: FileNode[] = [];

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      // Skip hidden files and git directory
      if (entry.name.startsWith('.')) continue;

      const fullPath = path.join(dirPath, entry.name);
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        const children = buildFileTree(fullPath, relPath);
        items.push({
          name: entry.name,
          path: relPath,
          type: 'folder',
          children: children
        });
      } else if (entry.name.endsWith('.md')) {
        items.push({
          name: entry.name,
          path: relPath,
          type: 'file'
        });
      }
    }

    // Sort: folders first, then files, both alphabetically
    items.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

  } catch (error) {
    console.error('Error reading directory:', dirPath, error);
  }

  return items;
}

export async function GET() {
  try {
    const fileTree = buildFileTree(CONTENT_DIR);
    return NextResponse.json({ tree: fileTree });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read content directory' },
      { status: 500 }
    );
  }
}
