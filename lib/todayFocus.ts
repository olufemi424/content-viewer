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

function monthSlug(monthIndex: number): string {
  const slugs = [
    '01-january',
    '02-february',
    '03-march',
    '04-april',
    '05-may',
    '06-june',
    '07-july',
    '08-august',
    '09-september',
    '10-october',
    '11-november',
    '12-december',
  ];
  return slugs[monthIndex] || '';
}

function isoWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function currentWeekPrefix(now = new Date()): string {
  const year = now.getFullYear();
  const month = monthSlug(now.getMonth());
  const week = String(isoWeek(now)).padStart(2, '0');
  return `${year}/${month}/week-${week}/`;
}

function pickNextByStage(files: FileNode[], stage: string): FileNode | null {
  const prefix = currentWeekPrefix();

  const inCurrentWeek = files
    .filter((f) => (f.metadata?.stage || 'idea') === stage && f.path.startsWith(prefix))
    .sort(sortByPublishDate);

  if (inCurrentWeek.length > 0) return inCurrentWeek[0];

  const upcoming = files
    .filter((f) => (f.metadata?.stage || 'idea') === stage)
    .sort(sortByPublishDate);

  return upcoming[0] || null;
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

  const nextToDraft = pickNextByStage(onlyPosts, 'idea');

  const nextToRecord = pickNextByStage(onlyPosts, 'drafted');

  const nextToPost = pickNextByStage(onlyPosts, 'recorded');

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
