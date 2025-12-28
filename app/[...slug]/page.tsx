import { notFound } from 'next/navigation';
import { getContentBySlug, getAllSlugs, buildFileTree } from '@/lib/content';
import { parseMarkdown, calculateReadingTime, titleFromFilename } from '@/lib/frontmatter';
import ContentPage from './ContentPage';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

// Generate static params for all content pages
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const result = getContentBySlug(slug);

  if (!result) {
    return { title: 'Not Found' };
  }

  const { frontmatter } = parseMarkdown(result.content);
  const filename = slug[slug.length - 1];
  const title = frontmatter.title || titleFromFilename(filename);

  return {
    title: `${title} | Content Viewer`,
    description: frontmatter.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const result = getContentBySlug(slug);

  if (!result) {
    notFound();
  }

  // Parse frontmatter
  const { content, frontmatter } = parseMarkdown(result.content);
  const readingTime = calculateReadingTime(content);
  const filename = slug[slug.length - 1];
  const title = frontmatter.title || titleFromFilename(filename);

  // Get file tree for sidebar
  const fileTree = buildFileTree();

  return (
    <ContentPage
      content={content}
      filePath={result.filePath}
      fileTree={fileTree}
      currentSlug={slug.join('/')}
      title={title}
      date={frontmatter.date}
      readingTime={readingTime}
      tags={frontmatter.tags}
    />
  );
}
