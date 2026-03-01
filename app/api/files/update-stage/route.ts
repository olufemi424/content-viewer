import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { parseFrontmatter, serializeFrontmatter, today } from '@/lib/frontmatter';

const CONTENT_DIR = path.join(process.cwd(), '.', 'content');
const VALID_STAGES = ['idea', 'drafted', 'recorded', 'posted', 'analyzed'];

export async function PATCH(request: NextRequest) {
  try {
    const { path: filePath, stage } = await request.json();

    if (!filePath || !stage) {
      return NextResponse.json({ error: 'path and stage are required' }, { status: 400 });
    }

    if (filePath.includes('..')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    if (!VALID_STAGES.includes(stage)) {
      return NextResponse.json({ error: 'Invalid stage' }, { status: 400 });
    }

    const fullPath = path.join(CONTENT_DIR, filePath);

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { metadata, body } = parseFrontmatter(raw);
    const updated = serializeFrontmatter({ ...metadata, stage, modified: today() }, body);

    fs.writeFileSync(fullPath, updated, 'utf-8');

    return NextResponse.json({ success: true, stage });
  } catch (error) {
    console.error('Error updating stage:', error);
    return NextResponse.json({ error: 'Failed to update stage' }, { status: 500 });
  }
}
