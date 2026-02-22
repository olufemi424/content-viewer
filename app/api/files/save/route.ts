import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { parseFrontmatter, serializeFrontmatter, today } from '@/lib/frontmatter';

const CONTENT_DIR = path.join(process.cwd(), '.', 'content');

export async function PUT(request: NextRequest) {
  try {
    const { path: filePath, content } = await request.json();

    if (!filePath || typeof content !== 'string') {
      return NextResponse.json({ error: 'path and content are required' }, { status: 400 });
    }

    if (filePath.includes('..')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    const fullPath = path.join(CONTENT_DIR, filePath);

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Update modified date in frontmatter
    const { metadata, body } = parseFrontmatter(content);
    const updated = serializeFrontmatter({ ...metadata, modified: today() }, body);

    fs.writeFileSync(fullPath, updated, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
  }
}
