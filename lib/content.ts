import * as fs from 'fs';
import * as path from 'path';
import { FileNode } from '@/types';

// Content directory - configurable via environment variable
export const CONTENT_DIR = process.env.CONTENT_PATH
  ? path.isAbsolute(process.env.CONTENT_PATH)
    ? process.env.CONTENT_PATH
    : path.join(process.cwd(), process.env.CONTENT_PATH)
  : path.join(process.cwd(), 'content');

/**
 * Convert a URL slug array to a file path
 * e.g., ['topics', 'ai', 'gpt-evolution'] -> 'topics/ai/gpt-evolution.md'
 */
export function slugToFilePath(slug: string[]): string {
  const relativePath = slug.join('/');
  return `${relativePath}.md`;
}

/**
 * Convert a file path to a URL slug
 * e.g., 'topics/ai/gpt-evolution.md' -> '/topics/ai/gpt-evolution'
 */
export function filePathToSlug(filePath: string): string {
  // Remove .md extension and leading slash if present
  const withoutExtension = filePath.replace(/\.md$/, '');
  const cleanPath = withoutExtension.startsWith('/')
    ? withoutExtension.slice(1)
    : withoutExtension;
  return `/${cleanPath}`;
}

/**
 * Check if a content file exists
 */
export function contentExists(slug: string[]): boolean {
  const filePath = slugToFilePath(slug);
  const fullPath = path.join(CONTENT_DIR, filePath);
  return fs.existsSync(fullPath);
}

/**
 * Read content from a file by slug
 */
export function getContentBySlug(slug: string[]): { content: string; filePath: string } | null {
  const filePath = slugToFilePath(slug);
  const fullPath = path.join(CONTENT_DIR, filePath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  return { content, filePath };
}

/**
 * Get all markdown files recursively
 */
export function getAllContentPaths(): string[] {
  const paths: string[] = [];

  function walkDir(dir: string, relativePath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;

      const fullPath = path.join(dir, entry.name);
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        walkDir(fullPath, relPath);
      } else if (entry.name.endsWith('.md')) {
        paths.push(relPath);
      }
    }
  }

  try {
    walkDir(CONTENT_DIR);
  } catch (error) {
    console.error('Error walking content directory:', error);
  }

  return paths;
}

/**
 * Get all slugs for static generation
 */
export function getAllSlugs(): string[][] {
  const paths = getAllContentPaths();
  return paths.map(p => {
    // Remove .md and split into slug array
    const withoutExt = p.replace(/\.md$/, '');
    return withoutExt.split('/');
  });
}

/**
 * Build file tree structure
 */
export function buildFileTree(dirPath: string = CONTENT_DIR, relativePath: string = ''): FileNode[] {
  const items: FileNode[] = [];

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
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
