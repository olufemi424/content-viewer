import { FileNode } from '@/types';

export interface WeekDashboardSummary {
  weekPath: string | null;
  total: number;
  idea: number;
  drafted: number;
  recorded: number;
  posted: number;
  analyzed: number;
  completionRate: number;
  dueThisWeek: FileNode[];
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // monday start
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekEnd(date: Date): Date {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

function inCurrentWeek(dateStr?: string): boolean {
  if (!dateStr) return false;
  const date = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const start = getWeekStart(now);
  const end = getWeekEnd(now);
  return date >= start && date <= end;
}

function getWeekPathFromFilePath(path: string): string | null {
  const idx = path.indexOf('/week-');
  if (idx === -1) return null;
  return path.slice(0, path.indexOf('/', idx + 1) > -1 ? path.indexOf('/', idx + 1) : path.length);
}

export function getWeekDashboard(files: FileNode[], selectedFolder: string | null): WeekDashboardSummary {
  const allFiles = files.filter((f) => f.type === 'file');

  const selectedWeekPath = selectedFolder && selectedFolder.includes('week-') ? selectedFolder : null;

  let weekPath = selectedWeekPath;
  if (!weekPath) {
    const byDate = [...allFiles]
      .filter((f) => f.metadata?.publish_date)
      .sort((a, b) => (a.metadata?.publish_date || '').localeCompare(b.metadata?.publish_date || ''));
    const first = byDate[0];
    weekPath = first ? getWeekPathFromFilePath(first.path) : null;
  }

  const weekFiles = weekPath
    ? allFiles.filter((f) => f.path.startsWith(`${weekPath}/`) || f.path === weekPath)
    : allFiles;

  const count = (stage: string) => weekFiles.filter((f) => (f.metadata?.stage || 'idea') === stage).length;

  const total = weekFiles.length;
  const analyzed = count('analyzed');
  const completionRate = total ? Math.round((analyzed / total) * 100) : 0;

  const dueThisWeek = weekFiles
    .filter((f) => inCurrentWeek(f.metadata?.publish_date) && (f.metadata?.stage || 'idea') !== 'analyzed')
    .sort((a, b) => (a.metadata?.publish_date || '').localeCompare(b.metadata?.publish_date || ''));

  return {
    weekPath,
    total,
    idea: count('idea'),
    drafted: count('drafted'),
    recorded: count('recorded'),
    posted: count('posted'),
    analyzed,
    completionRate,
    dueThisWeek,
  };
}
