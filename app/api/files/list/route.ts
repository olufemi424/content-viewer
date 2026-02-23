import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { FileNode } from '@/types';
import { parseFrontmatter } from '@/lib/frontmatter';

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
        if (children.length > 0) {
          items.push({
            name: entry.name,
            path: relPath,
            type: 'folder',
            children: children
          });
        }
      } else if (entry.name.endsWith('.md')) {
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const { metadata } = parseFrontmatter(raw);
        items.push({
          name: entry.name,
          path: relPath,
          type: 'file',
          metadata,
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

    // Aggregate all tags from all files
    const tagSet = new Set<string>();
    function collectTags(nodes: FileNode[]) {
      for (const node of nodes) {
        if (node.type === 'file') node.metadata?.tags?.forEach(t => tagSet.add(t));
        if (node.children) collectTags(node.children);
      }
    }
    collectTags(fileTree);

    return NextResponse.json({ tree: fileTree, allTags: Array.from(tagSet).sort() });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read content directory' },
      { status: 500 }
    );
  }
}
