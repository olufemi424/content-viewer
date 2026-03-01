import { FileNode } from '@/types';

export interface TodayFocusSummary {
  total: number;
  drafted: number;
  recorded: number;
  posted: number;
  analyzed: number;
  dueToday: FileNode[];
  nextToDraft: FileNode | null;
  nextToRecord: FileNode | null;
  nextToPost: FileNode | null;
}

function isToday(dateStr?: string): boolean {
  if (!dateStr) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dateStr === today;
}

function sortByPublishDate(a: FileNode, b: FileNode): number {
  const da = a.metadata?.publish_date || '9999-12-31';
  const db = b.metadata?.publish_date || '9999-12-31';
  return da.localeCompare(db);
}

export function getTodayFocus(files: FileNode[]): TodayFocusSummary {
  const onlyPosts = files.filter((f) => f.type === 'file');
  const drafted = onlyPosts.filter((f) => f.metadata?.stage === 'drafted').length;
  const recorded = onlyPosts.filter((f) => f.metadata?.stage === 'recorded').length;
  const posted = onlyPosts.filter((f) => f.metadata?.stage === 'posted').length;
  const analyzed = onlyPosts.filter((f) => f.metadata?.stage === 'analyzed').length;

  const dueToday = onlyPosts
    .filter((f) => isToday(f.metadata?.publish_date) && f.metadata?.stage !== 'analyzed')
    .sort(sortByPublishDate);

  const nextToDraft = onlyPosts
    .filter((f) => (f.metadata?.stage || 'idea') === 'idea')
    .sort(sortByPublishDate)[0] || null;

  const nextToRecord = onlyPosts
    .filter((f) => f.metadata?.stage === 'drafted')
    .sort(sortByPublishDate)[0] || null;

  const nextToPost = onlyPosts
    .filter((f) => f.metadata?.stage === 'recorded')
    .sort(sortByPublishDate)[0] || null;

  return {
    total: onlyPosts.length,
    drafted,
    recorded,
    posted,
    analyzed,
    dueToday,
    nextToDraft,
    nextToRecord,
    nextToPost,
  };
}
