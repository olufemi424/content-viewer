import matter from 'gray-matter';

export interface Frontmatter {
  title?: string;
  date?: string;
  tags?: string[];
  draft?: boolean;
  description?: string;
  [key: string]: unknown;
}

export interface ParsedContent {
  content: string;
  frontmatter: Frontmatter;
  excerpt?: string;
}

/**
 * Parse markdown content with frontmatter
 */
export function parseMarkdown(rawContent: string): ParsedContent {
  const { data, content } = matter(rawContent);

  return {
    content,
    frontmatter: data as Frontmatter,
  };
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Generate a title from filename if not provided in frontmatter
 */
export function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/^\d+-/, '') // Remove leading numbers like "01-"
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
