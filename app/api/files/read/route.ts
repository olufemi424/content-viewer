import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const CONTENT_DIR = path.join(process.cwd(), '.', 'content');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json(
      { error: 'File path is required' },
      { status: 400 }
    );
  }

  // Security: prevent directory traversal
  if (filePath.includes('..')) {
    return NextResponse.json(
      { error: 'Invalid file path' },
      { status: 400 }
    );
  }

  try {
    const fullPath = path.join(CONTENT_DIR, filePath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Read file content
    const content = fs.readFileSync(fullPath, 'utf-8');

    return NextResponse.json({
      path: filePath,
      name: path.basename(filePath),
      content
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json(
      { error: 'Failed to read file' },
      { status: 500 }
    );
  }
}
