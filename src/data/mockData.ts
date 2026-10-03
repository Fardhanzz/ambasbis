import type { Subject, Task, Reminder, UserProfile } from '../types';

export const mockUser: UserProfile = {
  id: 'usr_guest',
  name: 'Tamu',
  email: '',
  timezone: 'Asia/Jakarta',
  createdAt: '2026-10-01T00:00:00Z'
};

export const mockSubjects: Subject[] = [
  { id: 'subj_kimia', name: 'Kimia', color: '#72C7ED', icon: '🧪' },
  { id: 'subj_matematika', name: 'Matematika', color: '#FFD447', icon: '📐' },
  { id: 'subj_fisika', name: 'Fisika', color: '#B59AFF', icon: '⚡' },
  { id: 'subj_biologi', name: 'Biologi', color: '#A8E063', icon: '🌱' },
  { id: 'subj_informatika', name: 'Informatika', color: '#72C7ED', icon: '💻' },
  { id: 'subj_indo', name: 'B. Indonesia', color: '#FFA45B', icon: '📚' }
];

export const initialMockTasks: Task[] = [];

export const mockReminders: Reminder[] = [];
