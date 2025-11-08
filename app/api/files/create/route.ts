import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const CONTENT_DIR = path.join(process.cwd(), '.', 'content');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { folder, filename, content = '# New File\n\n' } = body;

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Ensure filename ends with .md
    const mdFilename = filename.endsWith('.md') ? filename : `${filename}.md`;

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

    // Write file
    fs.writeFileSync(fullPath, content, 'utf-8');

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
