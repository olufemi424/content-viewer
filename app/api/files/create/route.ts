import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { serializeFrontmatter, today } from '@/lib/frontmatter';
import { Metadata } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), '.', 'content');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { folder, filename, content, metadata } = body;

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Ensure filename ends with .md
    const mdFilename = filename.endsWith('.md') ? filename : `${filename}.md`;
    const baseName = mdFilename.replace(/\.md$/, '');

    // Security: prevent directory traversal
    if (folder && folder.includes('..')) {
      return NextResponse.json(
        { error: 'Invalid folder path' },
        { status: 400 }
      );
    }

    // Build full path
    const targetDir = folder ? path.join(CONTENT_DIR, folder) : CONTENT_DIR;
    const fullPath = path.join(targetDir, mdFilename);

    // Check if file already exists
    if (fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'File already exists' },
        { status: 409 }
      );
    }

    // Ensure directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Build file content: frontmatter + body
    const meta: Metadata = {
      title: metadata?.title || baseName,
      status: metadata?.status || 'draft',
      priority: metadata?.priority,
      tags: metadata?.tags?.length ? metadata.tags : undefined,
      created: today(),
      modified: today(),
    };
    const body_content = content || `# ${meta.title}\n\n`;
    const fileContent = serializeFrontmatter(meta, body_content);

    fs.writeFileSync(fullPath, fileContent, 'utf-8');

    const relativePath = folder ? `${folder}/${mdFilename}` : mdFilename;

    return NextResponse.json({
      success: true,
      path: relativePath,
      message: 'File created successfully'
    });
  } catch (error) {
    console.error('Error creating file:', error);
    return NextResponse.json(
      { error: 'Failed to create file' },
      { status: 500 }
    );
  }
}
