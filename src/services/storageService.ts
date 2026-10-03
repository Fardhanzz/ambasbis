import type { Task, Subject, Reminder, UserProfile } from '../types';
import { mockSubjects, mockUser } from '../data/mockData';

export const storageService = {
  isGuestUser(userId?: string | null): boolean {
    if (!userId) return true;
    return userId === 'usr_guest' || userId === 'guest';
  },

  isUserInitialized(userId: string): boolean {
    if (this.isGuestUser(userId)) return true;
    try {
      return Boolean(localStorage.getItem(`ambasbis_user_init_${userId}`));
    } catch {
      return false;
    }
  },

  markUserInitialized(userId: string): void {
    if (this.isGuestUser(userId)) return;
    try {
      localStorage.setItem(`ambasbis_user_init_${userId}`, 'true');
    } catch {
      // ignore
    }
  },

  hasUserEverCreatedTasks(userId: string): boolean {
    if (this.isGuestUser(userId)) {
      try {
        const guestSaved = localStorage.getItem('ambasbis_tasks_guest');
        if (guestSaved) {
          const parsed = JSON.parse(guestSaved);
          return Array.isArray(parsed) && parsed.length > 0;
        }
      } catch {
        return false;
      }
      return false;
    }
    try {
      return Boolean(localStorage.getItem(`ambasbis_user_has_tasks_${userId}`));
    } catch {
      return false;
    }
  },

  markUserHasCreatedTasks(userId: string): void {
    if (this.isGuestUser(userId)) return;
    try {
      localStorage.setItem(`ambasbis_user_has_tasks_${userId}`, 'true');
    } catch {
      // ignore
    }
  },

  /**
   * Load tasks for a specific user:
   * - If Guest: loads guest tasks from localStorage if created, or returns empty array [] (clean start).
   * - If New Account: returns empty array [] (starts from zero, no demonstration tasks).
   * - If Returning Account: loads their previously saved tasks and progress.
   */
  loadUserTasks(userId: string): Task[] {
    const isGuest = this.isGuestUser(userId);

    if (isGuest) {
      try {
        const guestSaved = localStorage.getItem('ambasbis_tasks_guest');
        if (guestSaved) {
          const parsed = JSON.parse(guestSaved);
          if (Array.isArray(parsed)) {
            // Clean up old static mock tasks that might have leaked in previous builds
            const hasOldMock = parsed.some(t => t.id === 'task_01' || t.userId === 'usr_fardhan_01');
            if (hasOldMock) {
              localStorage.removeItem('ambasbis_tasks_guest');
              return [];
            }
            return parsed;
          }
        }
      } catch {
        // ignore
      }
      return [];
    }

    // Authenticated User: Check if already initialized
    const key = `ambasbis_tasks_${userId}`;
    const isInitialized = this.isUserInitialized(userId);

    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out any legacy dummy mock task
          const filtered = parsed.filter(t => t.id !== 'task_01' || t.userId === userId);
          if (filtered.length > 0) {
            this.markUserHasCreatedTasks(userId);
          }
          return filtered;
        }
      }
    } catch (e) {
      console.warn('Gagal membaca data tugas pengguna:', e);
    }

    if (!isInitialized) {
      // Akun baru: Mulai semua dari nol!
      this.markUserInitialized(userId);
      this.saveUserTasks(userId, []);
      return [];
    }

    return [];
  },

  saveUserTasks(userId: string, tasks: Task[]): void {
    const key = this.isGuestUser(userId) ? 'ambasbis_tasks_guest' : `ambasbis_tasks_${userId}`;
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
      if (!this.isGuestUser(userId)) {
        this.markUserInitialized(userId);
        if (tasks.length > 0) {
          this.markUserHasCreatedTasks(userId);
        }
      }
    } catch (e) {
      console.warn('Gagal menyimpan tugas ke storage:', e);
    }
  },

  loadUserSubjects(userId: string): Subject[] {
    const key = this.isGuestUser(userId) ? 'ambasbis_subjects_guest' : `ambasbis_subjects_${userId}`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return mockSubjects;
  },

  saveUserSubjects(userId: string, subjects: Subject[]): void {
    const key = this.isGuestUser(userId) ? 'ambasbis_subjects_guest' : `ambasbis_subjects_${userId}`;
    try {
      localStorage.setItem(key, JSON.stringify(subjects));
    } catch (e) {
      console.warn('Gagal menyimpan mata pelajaran ke storage:', e);
    }
  },

  loadUserReminders(userId: string): Reminder[] {
    const isGuest = this.isGuestUser(userId);
    if (isGuest) {
      try {
        const guestSaved = localStorage.getItem('ambasbis_reminders_guest');
        if (guestSaved) {
          const parsed = JSON.parse(guestSaved);
          if (Array.isArray(parsed)) {
            // Remove any legacy Kimia dummy reminder
            return parsed.filter(r => r.taskId !== 'task_01' && r.subjectName !== 'Kimia');
          }
        }
      } catch {
        // ignore
      }
      return [];
    }

    const key = `ambasbis_reminders_${userId}`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(r => r.taskId !== 'task_01' && r.subjectName !== 'Kimia');
        }
      }
    } catch {
      // ignore
    }
    return [];
  },

  saveUserReminders(userId: string, reminders: Reminder[]): void {
    const key = this.isGuestUser(userId) ? 'ambasbis_reminders_guest' : `ambasbis_reminders_${userId}`;
    try {
      localStorage.setItem(key, JSON.stringify(reminders));
    } catch (e) {
      console.warn('Gagal menyimpan notifikasi ke storage:', e);
    }
  },

  loadUserProfile(): UserProfile {
    try {
      const saved = localStorage.getItem('ambasbis_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If it was the old hardcoded demo user, clear it to start cleanly as guest
        if (parsed && (parsed.id === 'usr_fardhan_01' || parsed.email === 'fardhan.student@ambasbis.edu')) {
          localStorage.removeItem('ambasbis_user');
          return mockUser;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return mockUser;
  },

  saveUserProfile(user: UserProfile): void {
    try {
      localStorage.setItem('ambasbis_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Gagal menyimpan profil pengguna:', e);
    }
  }
};
