import type { TaskStatus, UrgencyLevel } from '../types';

export function calculateUrgency(deadlineIso: string, status: TaskStatus): UrgencyLevel {
  if (status === 'COMPLETED') {
    return 'COMPLETED';
  }

  const now = new Date().getTime();
  const deadline = new Date(deadlineIso).getTime();
  const diffHours = (deadline - now) / (1000 * 60 * 60);

  if (diffHours < 0) {
    return 'OVERDUE';
  }
  if (diffHours <= 24) {
    return 'URGENT';
  }
  if (diffHours <= 72) {
    return 'SOON';
  }
  return 'UPCOMING';
}

export function getUrgencyInfo(urgency: UrgencyLevel): {
  label: string;
  bg: string;
  color: string;
  border: string;
  badgeText: string;
} {
  switch (urgency) {
    case 'OVERDUE':
      return {
        label: 'Terlewat',
        bg: 'var(--color-red)',
        color: '#FFFFFF',
        border: 'var(--color-black)',
        badgeText: '⚠️ TERLEWAT'
      };
    case 'URGENT':
      return {
        label: 'Mendesak (≤24 jam)',
        bg: 'var(--color-red)',
        color: '#FFFFFF',
        border: 'var(--color-black)',
        badgeText: '🔥 MENDESAK'
      };
    case 'SOON':
      return {
        label: 'Segera (≤3 hari)',
        bg: 'var(--color-yellow)',
        color: 'var(--color-black)',
        border: 'var(--color-black)',
        badgeText: '⚡ SEGERA'
      };
    case 'UPCOMING':
      return {
        label: 'Mendatang',
        bg: 'var(--color-blue)',
        color: 'var(--color-black)',
        border: 'var(--color-black)',
        badgeText: '🗓 MENDATANG'
      };
    case 'COMPLETED':
      return {
        label: 'Selesai',
        bg: 'var(--color-green)',
        color: 'var(--color-black)',
        border: 'var(--color-black)',
        badgeText: '✓ SELESAI'
      };
  }
}

export function formatDeadlineDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function getRelativeDeadlineText(dateStr: string, status?: TaskStatus): string {
  if (status === 'COMPLETED') return 'Sudah Selesai';

  const now = new Date();
  const target = new Date(dateStr);
  const diffMs = target.getTime() - now.getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffHours / 24);

  if (diffMs < 0) {
    const overdueHours = Math.abs(diffHours);
    if (overdueHours < 24) return `Terlambat ${overdueHours} jam`;
    return `Terlambat ${Math.abs(diffDays)} hari`;
  }

  if (diffHours <= 1) {
    const diffMins = Math.max(1, Math.round(diffMs / (1000 * 60)));
    return `${diffMins} menit lagi!`;
  }

  if (diffHours < 24) {
    return `${diffHours} jam lagi`;
  }

  if (diffDays === 1) {
    return 'Besok';
  }

  if (diffDays === 2) {
    return 'Lusa';
  }

  return `${diffDays} hari lagi`;
}
