import type { Task, Reminder, ReminderType, Subject } from '../types';

export function getTaskReminderCategory(deadlineIso: string, status: string): ReminderType | null {
  if (status === 'COMPLETED') return null;

  const now = new Date();
  const deadline = new Date(deadlineIso);

  // Normalize to date-only without time (midnight)
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const deadlineMidnight = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate()).getTime();

  const diffDays = Math.round((deadlineMidnight - todayMidnight) / (1000 * 60 * 60 * 24));

  // Only H-3, H-1, and Hari H (0)
  if (diffDays === 3) {
    return 'DEADLINE_H_MIN_3';
  }
  if (diffDays === 1) {
    return 'DEADLINE_H_MIN_1';
  }
  if (diffDays === 0) {
    // If it's today and deadline has not passed yet or is today
    return 'DEADLINE_HARI_H';
  }

  return null;
}

export function getReminderInfo(type: ReminderType): {
  tag: string;
  title: string;
  badgeBg: string;
  badgeColor: string;
} {
  switch (type) {
    case 'DEADLINE_H_MIN_3':
      return {
        tag: 'H-3 DEADLINE',
        title: 'Pengingat H-3: Deadline dalam 3 Hari',
        badgeBg: 'var(--color-blue)',
        badgeColor: 'var(--color-black)'
      };
    case 'DEADLINE_H_MIN_1':
      return {
        tag: 'H-1 DEADLINE',
        title: 'Pengingat H-1: Deadline Besok!',
        badgeBg: 'var(--color-yellow)',
        badgeColor: 'var(--color-black)'
      };
    case 'DEADLINE_HARI_H':
      return {
        tag: 'HARI H DEADLINE',
        title: 'Pengingat Hari H: Deadline Hari Ini!',
        badgeBg: 'var(--color-red)',
        badgeColor: '#FFFFFF'
      };
  }
}

export function generateRemindersFromTasks(tasks: Task[], subjects: Subject[], userId: string): Reminder[] {
  const reminders: Reminder[] = [];

  for (const task of tasks) {
    const category = getTaskReminderCategory(task.deadline, task.status);
    if (!category) continue;

    const subject = subjects.find(s => s.id === task.subjectId);
    reminders.push({
      id: `rem_${task.id}_${category}`,
      userId,
      taskId: task.id,
      taskTitle: task.title,
      subjectName: subject?.name || 'Tugas',
      deadline: task.deadline,
      remindAt: new Date().toISOString(),
      type: category,
      channel: 'IN_APP',
      sent: true,
      read: false,
      createdAt: new Date().toISOString()
    });
  }

  return reminders;
}
