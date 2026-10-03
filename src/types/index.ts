export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export type UrgencyLevel = 'COMPLETED' | 'OVERDUE' | 'URGENT' | 'SOON' | 'UPCOMING';

export interface Subtask {
  id: string;
  taskId: string;
  title: string;
  completed: boolean;
  order: number;
}

export interface Subject {
  id: string;
  name: string;
  color: string; // e.g. '#FFD447', '#72C7ED', '#B59AFF', '#A8E063'
  icon?: string;
}

export interface Task {
  id: string;
  userId: string;
  subjectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: Priority;
  deadline: string; // ISO string or YYYY-MM-DDTHH:mm
  estimatedMinutes?: number;
  subtasks: Subtask[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export type ReminderType = 
  | 'DEADLINE_H_MIN_3' 
  | 'DEADLINE_H_MIN_1' 
  | 'DEADLINE_HARI_H';

export interface Reminder {
  id: string;
  userId: string;
  taskId: string;
  taskTitle: string;
  subjectName: string;
  deadline: string;
  remindAt: string;
  type: ReminderType;
  channel: 'IN_APP' | 'BROWSER';
  sent: boolean;
  read: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  timezone: string;
  createdAt: string;
}

export interface DashboardStats {
  activeCount: number;
  urgentCount: number;
  completedCount: number;
}
