import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { serializeFrontmatter, today } from '@/lib/frontmatter';
import { buildTalkingHeadTemplate } from '@/lib/contentTemplate';
import { Metadata } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), '.', 'content');

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, month, week, topics } = body as {
      year: string;
      month: string;
      week: string;
      topics?: string[];
    };

    if (!year || !month || !week) {
      return NextResponse.json({ error: 'year, month, and week are required' }, { status: 400 });
    }

    const folder = `${year}/${month}/${week}`;
    if (folder.includes('..')) {
      return NextResponse.json({ error: 'Invalid folder path' }, { status: 400 });
    }

    const weekDir = path.join(CONTENT_DIR, folder);
    if (!fs.existsSync(weekDir)) fs.mkdirSync(weekDir, { recursive: true });

    const defaultTopics = [
      'How I balance a 9-5 with building my content business',
      '3 mistakes engineers make when building personal brands',
      'My 30-minute daily content system',
      'What my 9-5 taught me about trust online',
      'If I had to restart my page from zero today',
    ];

    const selectedTopics = (topics?.filter(Boolean).length ? topics : defaultTopics).slice(0, 7);
    const createdFiles: string[] = [];

    selectedTopics.forEach((topic, index) => {
      const baseDate = new Date();
      baseDate.setDate(baseDate.getDate() + index);
      const publishDate = baseDate.toISOString().slice(0, 10);
      const slug = slugify(topic) || `post-${index + 1}`;
      const filename = `${publishDate}-${slug}.md`;
      const fullPath = path.join(weekDir, filename);

      if (fs.existsSync(fullPath)) return;

      const meta: Metadata = {
        title: topic,
        status: 'draft',
        stage: 'idea',
        platform: 'facebook',
        content_type: 'talking_head',
        pillar: 'authority',
        goal: 'engagement',
        publish_date: publishDate,
        cta_keyword: `WEEK${index + 1}`,
        created: today(),
        modified: today(),
        tags: ['facebook', 'talking-head', 'weekly-plan'],
      };

      const content = serializeFrontmatter(meta, buildTalkingHeadTemplate(meta));
      fs.writeFileSync(fullPath, content, 'utf-8');
      createdFiles.push(`${folder}/${filename}`);
    });

    return NextResponse.json({ success: true, folder, createdFiles });
  } catch (error) {
    console.error('Error seeding week:', error);
    return NextResponse.json({ error: 'Failed to seed week plan' }, { status: 500 });
  }
}
