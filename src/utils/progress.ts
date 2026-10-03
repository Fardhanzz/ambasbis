import type { Subtask, TaskStatus } from '../types';

export function calculateProgress(subtasks: Subtask[] = [], status: TaskStatus = 'TODO'): number {
  if (status === 'COMPLETED') return 100;

  if (subtasks && subtasks.length > 0) {
    const completedCount = subtasks.filter(st => st.completed).length;
    return Math.round((completedCount / subtasks.length) * 100);
  }

  if (status === 'IN_PROGRESS') return 50;
  return 0;
}
