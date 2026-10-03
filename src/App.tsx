import { useState, useEffect, useMemo, useRef } from 'react';
import type { Task, Subject, Reminder, UserProfile, TaskStatus } from './types';
import { calculateUrgency } from './utils/urgency';
import { getTaskReminderCategory } from './utils/reminder';

// Layout Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';

// Dashboard Components
import { Greeting } from './components/dashboard/Greeting';
import { StatsCards } from './components/dashboard/StatsCards';
import { UrgentTaskCard } from './components/dashboard/UrgentTaskCard';
import { TodayTasks } from './components/dashboard/TodayTasks';
import { UpcomingTasks } from './components/dashboard/UpcomingTasks';

// Task & Calendar Components
import { TaskListView } from './components/task/TaskListView';
import { CalendarView } from './components/calendar/CalendarView';

// Modals & Popups
import { TaskDetailModal } from './components/task/TaskDetailModal';
import { TaskFormModal } from './components/task/TaskFormModal';
import { NotificationPopup } from './components/notifications/NotificationPopup';
import { NotificationPanel } from './components/notifications/NotificationPanel';
import { AuthModal } from './components/auth/AuthModal';
import { OverdueWarningModal } from './components/common/OverdueWarningModal';
import { AddSubjectModal } from './components/subject/AddSubjectModal';
import { SubjectOnboardingModal } from './components/subject/SubjectOnboardingModal';
import { Button } from './components/ui/Button';
import { Plus } from 'lucide-react';
import { authService } from './services/authService';
import { storageService } from './services/storageService';

export function App() {
  // Main State with Per-User Data Isolation
  const [user, setUser] = useState<UserProfile>(() => storageService.loadUserProfile());

  // Ref tracking which user ID's data is currently loaded in memory
  const activeDataUserIdRef = useRef<string>(user.id);

  const [tasks, setTasks] = useState<Task[]>(() => storageService.loadUserTasks(user.id));
  const [subjects, setSubjects] = useState<Subject[]>(() => storageService.loadUserSubjects(user.id));
  const [reminders, setReminders] = useState<Reminder[]>(() => storageService.loadUserReminders(user.id));

  // Sync state to LocalStorage strictly scoped to active user
  useEffect(() => {
    if (user.id && user.id === activeDataUserIdRef.current) {
      storageService.saveUserTasks(user.id, tasks);
    }
  }, [tasks, user.id]);

  useEffect(() => {
    if (user.id && user.id === activeDataUserIdRef.current) {
      storageService.saveUserSubjects(user.id, subjects);
    }
  }, [subjects, user.id]);

  useEffect(() => {
    if (user.id && user.id === activeDataUserIdRef.current) {
      storageService.saveUserReminders(user.id, reminders);
    }
  }, [reminders, user.id]);

  useEffect(() => {
    storageService.saveUserProfile(user);
  }, [user]);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        const isNewAccount = !storageService.isUserInitialized(uid);

        const authenticatedUser: UserProfile = {
          id: uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Pelajar',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || undefined,
          timezone: 'Asia/Jakarta',
          createdAt: new Date().toISOString()
        };

        setUser(authenticatedUser);

        if (activeDataUserIdRef.current !== uid) {
          activeDataUserIdRef.current = uid;
          if (isNewAccount) {
            // Akun baru: Mulai dari nol! Daftar tugas demonstrasi harus kosong
            storageService.markUserInitialized(uid);
            storageService.saveUserTasks(uid, []);
            storageService.saveUserReminders(uid, []);
            setTasks([]);
            setReminders([]);
            setSubjects(storageService.loadUserSubjects(uid));
            setIsSubjectOnboardingOpen(true);
          } else {
            // Akun lama: Kembalikan progress dan tugas yang pernah disimpan
            setTasks(storageService.loadUserTasks(uid));
            setSubjects(storageService.loadUserSubjects(uid));
            setReminders(storageService.loadUserReminders(uid));
          }
        }
      } else {
        // User is logged out / guest
        if (activeDataUserIdRef.current && !storageService.isGuestUser(activeDataUserIdRef.current)) {
          const guestUser: UserProfile = {
            id: 'usr_guest',
            name: 'Tamu',
            email: '',
            timezone: 'Asia/Jakarta',
            createdAt: new Date().toISOString()
          };
          setUser(guestUser);
          activeDataUserIdRef.current = 'usr_guest';
          setTasks(storageService.loadUserTasks('usr_guest'));
          setSubjects(storageService.loadUserSubjects('usr_guest'));
          setReminders(storageService.loadUserReminders('usr_guest'));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  // Modal & Drawer State
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<Task | null>(null);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isSubjectOnboardingOpen, setIsSubjectOnboardingOpen] = useState(false);
  const [popupReminder, setPopupReminder] = useState<Reminder | null>(null);
  const [overdueWarningTask, setOverdueWarningTask] = useState<Task | null>(null);

  const hasShownPopupRef = useRef(false);

  // Trigger prototype in-app notification popup after 1.2 seconds for eligible H-3, H-1, Hari H
  useEffect(() => {
    if (hasShownPopupRef.current) return;
    const timer = setTimeout(() => {
      const urgentReminder = reminders.find(r => !r.read) || reminders[0];
      if (urgentReminder) {
        setPopupReminder(urgentReminder);
        hasShownPopupRef.current = true;
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [reminders]);

  // Compute Statistics
  const stats = useMemo(() => {
    let activeCount = 0;
    let urgentCount = 0;
    let completedCount = 0;

    tasks.forEach((t) => {
      if (t.status === 'COMPLETED') {
        completedCount++;
      } else {
        activeCount++;
        const urgency = calculateUrgency(t.deadline, t.status);
        if (urgency === 'URGENT' || urgency === 'OVERDUE') {
          urgentCount++;
        }
      }
    });

    return { activeCount, urgentCount, completedCount };
  }, [tasks]);

  // Compute Most Urgent Task (nearest deadline)
  const urgentHeroTask = useMemo(() => {
    const uncompleted = tasks.filter(t => t.status !== 'COMPLETED');
    if (uncompleted.length === 0) return null;

    // Sort by nearest deadline
    const sorted = [...uncompleted].sort((a, b) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    return sorted[0] || null;
  }, [tasks]);

  // Today & Soon Tasks
  const todayTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        const urgency = calculateUrgency(t.deadline, t.status);
        return urgency === 'URGENT' || urgency === 'SOON' || urgency === 'OVERDUE';
      })
      .slice(0, 4);
  }, [tasks]);

  // Upcoming Tasks (excluding the urgent hero)
  const upcomingTasks = useMemo(() => {
    return tasks
      .filter(t => t.id !== urgentHeroTask?.id && t.status !== 'COMPLETED')
      .slice(0, 4);
  }, [tasks, urgentHeroTask]);

  // Handlers for Tasks
  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      userId: user.id,
      id: `task_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);

    // Item 2: Notifikasi HANYA muncul saat H-3, H-1, dan Hari H
    const category = getTaskReminderCategory(newTask.deadline, newTask.status);
    if (category) {
      const subject = subjects.find(s => s.id === newTask.subjectId);
      const newReminder: Reminder = {
        id: `rem_${Date.now()}`,
        userId: user.id,
        taskId: newTask.id,
        taskTitle: newTask.title,
        subjectName: subject?.name || 'Tugas',
        deadline: newTask.deadline,
        remindAt: new Date().toISOString(),
        type: category,
        channel: 'IN_APP',
        sent: true,
        read: false,
        createdAt: new Date().toISOString()
      };
      setReminders([newReminder, ...reminders]);
    }
  };

  const executeCompleteTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const nextStatus: TaskStatus = t.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
          return {
            ...t,
            status: nextStatus,
            completedAt: nextStatus === 'COMPLETED' ? new Date().toISOString() : undefined,
            subtasks: t.subtasks.map(st => ({
              ...st,
              completed: nextStatus === 'COMPLETED' ? true : st.completed
            }))
          };
        }
        return t;
      })
    );

    // If modal is open for this task, sync it
    if (selectedTaskForDetail?.id === taskId) {
      setSelectedTaskForDetail(prev => {
        if (!prev) return null;
        const nextStatus: TaskStatus = prev.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
        return {
          ...prev,
          status: nextStatus,
          subtasks: prev.subtasks.map(st => ({
            ...st,
            completed: nextStatus === 'COMPLETED' ? true : st.completed
          }))
        };
      });
    }
  };

  // Item 1: Tombol selesai dengan peringatan "Anda terlambat menyelesaikan tugas ini" jika melewati deadline
  const handleRequestCompleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const isOverdue = new Date(task.deadline).getTime() < Date.now();
    if (task.status !== 'COMPLETED' && isOverdue) {
      setOverdueWarningTask(task);
    } else {
      executeCompleteTask(taskId);
    }
  };

  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status, completedAt: status === 'COMPLETED' ? new Date().toISOString() : undefined } : t))
    );
    if (selectedTaskForDetail?.id === taskId) {
      setSelectedTaskForDetail(prev => (prev ? { ...prev, status } : null));
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    if (selectedTaskForDetail?.id === taskId) {
      setSelectedTaskForDetail(null);
    }
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const updatedSubtasks = t.subtasks.map(st =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          const allCompleted = updatedSubtasks.every(st => st.completed);
          const anyCompleted = updatedSubtasks.some(st => st.completed);

          const newStatus: TaskStatus = allCompleted
            ? 'COMPLETED'
            : anyCompleted
            ? 'IN_PROGRESS'
            : t.status;

          return {
            ...t,
            subtasks: updatedSubtasks,
            status: newStatus
          };
        }
        return t;
      })
    );

    // Sync selected modal task
    if (selectedTaskForDetail?.id === taskId) {
      setSelectedTaskForDetail(prev => {
        if (!prev) return null;
        const updatedSubtasks = prev.subtasks.map(st =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        return {
          ...prev,
          subtasks: updatedSubtasks
        };
      });
    }
  };

  const handleAddSubtask = (taskId: string, title: string) => {
    const newSt = {
      id: `st_${Date.now()}`,
      taskId,
      title,
      completed: false,
      order: 99
    };
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, subtasks: [...t.subtasks, newSt] } : t))
    );
    if (selectedTaskForDetail?.id === taskId) {
      setSelectedTaskForDetail(prev => (prev ? { ...prev, subtasks: [...prev.subtasks, newSt] } : null));
    }
  };

  const handleDeleteSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, subtasks: t.subtasks.filter(st => st.id !== subtaskId) } : t))
    );
    if (selectedTaskForDetail?.id === taskId) {
      setSelectedTaskForDetail(prev =>
        prev ? { ...prev, subtasks: prev.subtasks.filter(st => st.id !== subtaskId) } : null
      );
    }
  };

  // Subject Handlers (repair.txt Item 4)
  const handleAddSubject = (newSubject: Subject) => {
    setSubjects(prev => [...prev, newSubject]);
  };

  const handleCompleteSubjectOnboarding = (selectedSubjects: Subject[]) => {
    setSubjects(selectedSubjects);
    // If selected subject filter is no longer in list, reset filter
    if (selectedSubjectId && !selectedSubjects.some(s => s.id === selectedSubjectId)) {
      setSelectedSubjectId(null);
    }
  };

  const handleDeleteSubject = (subjectId: string) => {
    setSubjects(prev => prev.filter(s => s.id !== subjectId));
    if (selectedSubjectId === subjectId) {
      setSelectedSubjectId(null);
    }
  };

  // Open task detail by ID (from notification popup/panel)
  const handleOpenTaskById = (taskId: string) => {
    const t = tasks.find(item => item.id === taskId);
    if (t) {
      setSelectedTaskForDetail(t);
    }
  };

  // Notification handlers
  const handleMarkAsRead = (id: string) => {
    setReminders(prev => prev.map(r => (r.id === id ? { ...r, read: true } : r)));
  };

  const handleMarkAllAsRead = () => {
    setReminders(prev => prev.map(r => ({ ...r, read: true })));
  };

  const handleRequestBrowserPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('AMBASBIS Aktif! ✦', {
            body: 'Pengingat deadline otomatis H-3, H-1, dan Hari H akan muncul di perambanmu.',
            icon: '/favicon.svg'
          });
        }
      });
    } else {
      alert('Browser ini tidak mendukung Web Notifications API.');
    }
  };

  const unreadNotificationCount = reminders.filter(r => !r.read).length;

  return (
    <div className="app-layout">
      {/* 1. Desktop Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeTaskCount={stats.activeCount}
        onOpenAddTask={() => setIsTaskFormOpen(true)}
        selectedSubjectId={selectedSubjectId}
        onSelectSubject={setSelectedSubjectId}
        subjects={subjects}
        user={user}
        onOpenAddSubject={() => setIsAddSubjectOpen(true)}
        onOpenSubjectSetup={() => setIsSubjectOnboardingOpen(true)}
        onDeleteSubject={handleDeleteSubject}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* 2. Main Content Area */}
      <main className="main-content-area">
        {/* Header */}
        <Header
          unreadNotificationCount={unreadNotificationCount}
          onOpenNotifications={() => setIsNotificationPanelOpen(prev => !prev)}
          onOpenAddTask={() => setIsTaskFormOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          currentTab={currentTab}
          user={user}
        />

        {/* Tab 1: Dashboard */}
        {currentTab === 'dashboard' && (
          <div>
            <Greeting userName={user.name} urgentCount={stats.urgentCount} />
            <StatsCards
              activeCount={stats.activeCount}
              urgentCount={stats.urgentCount}
              completedCount={stats.completedCount}
              onFilterClick={() => setCurrentTab('tasks')}
            />

            {tasks.length === 0 ? (
              (() => {
                const isBrandNew = !storageService.hasUserEverCreatedTasks(user.id);
                return (
                  <div
                    style={{
                      background: '#FFFFFF',
                      border: 'var(--border-thick)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '36px 24px',
                      boxShadow: 'var(--shadow-neo)',
                      textAlign: 'center',
                      marginBottom: '32px'
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: isBrandNew ? 'var(--color-yellow)' : 'var(--color-green)',
                        border: 'var(--border-thick)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        boxShadow: '4px 4px 0 var(--color-black)',
                        margin: '0 auto 16px auto'
                      }}
                    >
                      {isBrandNew ? '🚀' : '🎉'}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        marginBottom: '8px'
                      }}
                    >
                      {isBrandNew ? 'Daftar Tugas Masih Kosong' : 'Semua Tugas Telah Selesai!'}
                    </h3>
                    <p
                      style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.95rem',
                        maxWidth: '460px',
                        margin: '0 auto 24px auto',
                        lineHeight: 1.5
                      }}
                    >
                      {isBrandNew ? (
                        <>
                          Selamat datang di <strong>AMBASBIS</strong>! Akun Anda baru dan bersih. Mulai catat tugas sekolah atau kuliah pertama Anda dan taklukkan deadline!
                        </>
                      ) : (
                        <>
                          Luar biasa! Tidak ada beban tugas aktif saat ini. Nikmati waktu istirahatmu atau mulai catat tugas baru jika ada tugas berikutnya.
                        </>
                      )}
                    </p>
                    <Button
                      variant={isBrandNew ? 'yellow' : 'primary'}
                      size="lg"
                      icon={<Plus size={20} strokeWidth={3} />}
                      onClick={() => setIsTaskFormOpen(true)}
                    >
                      {isBrandNew ? '+ Tambah Tugas Pertamamu' : '+ Buat Tugas Baru'}
                    </Button>
                  </div>
                );
              })()
            ) : (
              <>
                <UrgentTaskCard
                  task={urgentHeroTask}
                  subject={subjects.find(s => s.id === urgentHeroTask?.subjectId)}
                  onOpenDetail={setSelectedTaskForDetail}
                  onToggleSubtask={handleToggleSubtask}
                  onCompleteTask={handleRequestCompleteTask}
                />
                <TodayTasks
                  tasks={todayTasks}
                  subjects={subjects}
                  onOpenDetail={setSelectedTaskForDetail}
                  onToggleTaskComplete={handleRequestCompleteTask}
                />
                <UpcomingTasks
                  tasks={upcomingTasks}
                  subjects={subjects}
                  onOpenDetail={setSelectedTaskForDetail}
                  onToggleTaskComplete={handleRequestCompleteTask}
                />
              </>
            )}
          </div>
        )}

        {/* Tab 2: Tasks List */}
        {currentTab === 'tasks' && (
          <TaskListView
            tasks={tasks}
            subjects={subjects}
            onOpenDetail={setSelectedTaskForDetail}
            onOpenAddTask={() => setIsTaskFormOpen(true)}
            onToggleComplete={handleRequestCompleteTask}
            selectedSubjectId={selectedSubjectId}
            onSelectSubject={setSelectedSubjectId}
            onOpenAddSubject={() => setIsAddSubjectOpen(true)}
            isBrandNewUser={!storageService.hasUserEverCreatedTasks(user.id)}
          />
        )}

        {/* Tab 3: Calendar */}
        {currentTab === 'calendar' && (
          <CalendarView
            tasks={tasks}
            subjects={subjects}
            onOpenDetail={setSelectedTaskForDetail}
          />
        )}
      </main>

      {/* 3. Mobile Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAddTask={() => setIsTaskFormOpen(true)}
        activeTaskCount={stats.activeCount}
      />

      {/* 4. Notification Center Flyout (Item 2: Notifikasi H-3, H-1, Hari H) */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        reminders={reminders}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onOpenTask={handleOpenTaskById}
        onRequestBrowserPermission={handleRequestBrowserPermission}
      />

      {/* 5. In-App Neo-Brutalist Notification Toast */}
      <NotificationPopup
        reminder={popupReminder}
        onClose={() => setPopupReminder(null)}
        onOpenTask={handleOpenTaskById}
      />

      {/* 6. Add Task Modal */}
      <TaskFormModal
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        subjects={subjects}
        onSaveTask={handleSaveTask}
        onOpenAddSubject={() => setIsAddSubjectOpen(true)}
      />

      {/* 7. Task Detail Modal */}
      <TaskDetailModal
        task={selectedTaskForDetail}
        isOpen={!!selectedTaskForDetail}
        onClose={() => setSelectedTaskForDetail(null)}
        subject={subjects.find(s => s.id === selectedTaskForDetail?.subjectId)}
        onToggleSubtask={handleToggleSubtask}
        onAddSubtask={handleAddSubtask}
        onDeleteSubtask={handleDeleteSubtask}
        onUpdateStatus={handleUpdateTaskStatus}
        onDeleteTask={handleDeleteTask}
        onRequestComplete={handleRequestCompleteTask}
      />

      {/* 8. Overdue Warning Confirmation Modal (Item 1) */}
      <OverdueWarningModal
        task={overdueWarningTask}
        isOpen={!!overdueWarningTask}
        onClose={() => setOverdueWarningTask(null)}
        onConfirmComplete={executeCompleteTask}
      />

      {/* 9. Auth Modal (Login / Register - Step 1 with Firebase) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={user}
        onLogout={() => {
          const guestUser: UserProfile = {
            id: 'usr_guest',
            name: 'Tamu',
            email: '',
            timezone: 'Asia/Jakarta',
            createdAt: new Date().toISOString()
          };
          setUser(guestUser);
          activeDataUserIdRef.current = 'usr_guest';
          setTasks(storageService.loadUserTasks('usr_guest'));
          setSubjects(storageService.loadUserSubjects('usr_guest'));
          setReminders(storageService.loadUserReminders('usr_guest'));
        }}
        onSuccess={(name, email, avatar, userId, isNewUser) => {
          const targetId = userId || user.id;
          const updatedUser: UserProfile = {
            ...user,
            id: targetId,
            name,
            email,
            avatar: avatar || user.avatar
          };
          setUser(updatedUser);

          if (activeDataUserIdRef.current !== targetId) {
            activeDataUserIdRef.current = targetId;
            if (isNewUser || !storageService.isUserInitialized(targetId)) {
              storageService.markUserInitialized(targetId);
              storageService.saveUserTasks(targetId, []);
              storageService.saveUserReminders(targetId, []);
              setTasks([]);
              setReminders([]);
              setSubjects(storageService.loadUserSubjects(targetId));
            } else {
              setTasks(storageService.loadUserTasks(targetId));
              setSubjects(storageService.loadUserSubjects(targetId));
              setReminders(storageService.loadUserReminders(targetId));
            }
          }
          // repair.txt Item 4: nanti bila user login atau signup, akan ditanyakan apa saja mata pelajarannya.
          setIsSubjectOnboardingOpen(true);
        }}
      />

      {/* 10. Add Subject Modal (repair.txt Item 4) */}
      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        existingSubjects={subjects}
        onSaveSubject={handleAddSubject}
      />

      {/* 11. Subject Setup Onboarding Modal (repair.txt Item 4) */}
      <SubjectOnboardingModal
        isOpen={isSubjectOnboardingOpen}
        onClose={() => setIsSubjectOnboardingOpen(false)}
        userName={user.name}
        currentSubjects={subjects}
        onComplete={handleCompleteSubjectOnboarding}
      />
    </div>
  );
}

export default App;
