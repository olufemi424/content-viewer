import { Metadata, ContentStatus, ContentPriority } from '@/types';

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---/;

const VALID_STATUSES: ContentStatus[] = ['draft', 'in-progress', 'done'];
const VALID_PRIORITIES: ContentPriority[] = ['low', 'medium', 'high'];

/** Parse a simple YAML frontmatter block (no external dependency). */
function parseYaml(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = yaml.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const keyMatch = line.match(/^(\w+):\s*(.*)/);
    if (!keyMatch) { i++; continue; }

    const key = keyMatch[1];
    const value = keyMatch[2].trim();

    if (value === '') {
      // Possibly a YAML array on following lines
      const items: string[] = [];
      i++;
      while (i < lines.length && lines[i].match(/^\s+-\s+(.*)/)) {
        const item = lines[i].match(/^\s+-\s+(.*)/);
        if (item) items.push(item[1].trim());
        i++;
      }
      result[key] = items;
    } else {
      result[key] = value;
      i++;
    }
  }

  return result;
}

export interface ParsedFile {
  metadata: Metadata;
  body: string;
}

const EXTRA_FIELDS: Array<keyof Metadata> = [
  'platform',
  'content_type',
  'pillar',
  'goal',
  'stage',
  'publish_date',
  'cta_keyword',
  'hook_score',
  'retention_target',
  'kpi_comments',
  'kpi_saves',
  'kpi_profile_visits',
  'actual_comments',
  'actual_saves',
  'actual_profile_visits',
  'lesson_learned',
  'topic_state',
  'reviewer_id',
  'reviewer_decision',
  'reviewer_reviewed_at',
  'reviewer_notes',
  'idempotency_key',
];

/** Extract frontmatter metadata and body from markdown content. */
export function parseFrontmatter(content: string): ParsedFile {
  const match = content.match(FRONTMATTER_REGEX);
  if (!match) return { metadata: {}, body: content };

  const raw = parseYaml(match[1]);
  const metadata: Metadata = {};

  if (typeof raw.title === 'string') metadata.title = raw.title;
  if (typeof raw.status === 'string' && VALID_STATUSES.includes(raw.status as ContentStatus)) {
    metadata.status = raw.status as ContentStatus;
  }
  if (typeof raw.priority === 'string' && VALID_PRIORITIES.includes(raw.priority as ContentPriority)) {
    metadata.priority = raw.priority as ContentPriority;
  }
  if (Array.isArray(raw.tags)) {
    metadata.tags = raw.tags.map(String);
  }
  if (typeof raw.created === 'string') metadata.created = raw.created;
  if (typeof raw.modified === 'string') metadata.modified = raw.modified;

  for (const field of EXTRA_FIELDS) {
    const value = raw[field];
    if (typeof value === 'string') {
      metadata[field] = value as never;
    }
  }

  const body = content.slice(match[0].length).replace(/^\r?\n/, '');
  return { metadata, body };
}

/** Serialize metadata back into a YAML frontmatter string. */
export function serializeFrontmatter(metadata: Metadata, body: string): string {
  const lines: string[] = ['---'];
  if (metadata.title)    lines.push(`title: ${metadata.title}`);
  if (metadata.status)   lines.push(`status: ${metadata.status}`);
  if (metadata.priority) lines.push(`priority: ${metadata.priority}`);
  if (metadata.tags?.length) {
    lines.push('tags:');
    metadata.tags.forEach(t => lines.push(`  - ${t}`));
  }
  if (metadata.created)  lines.push(`created: ${metadata.created}`);
  if (metadata.modified) lines.push(`modified: ${metadata.modified}`);

  for (const field of EXTRA_FIELDS) {
    const value = metadata[field];
    if (typeof value === 'string' && value.trim()) {
      lines.push(`${field}: ${value}`);
    }
  }

  lines.push('---');
  return `${lines.join('\n')}\n\n${body}`;
}

/** Generate today's date string YYYY-MM-DD. */
export function today(): string {
  return new Date().toISOString().split('T')[0];
}
