import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Plus } from 'lucide-react';

export interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAddTask: () => void;
  activeTaskCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenAddTask,
  activeTaskCount
}) => {
  return (
    <nav className="bottom-nav-mobile">
      <button
        onClick={() => onSelectTab('dashboard')}
        aria-label="Dashboard"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: currentTab === 'dashboard' ? 'var(--color-red)' : 'var(--color-black)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '0.7rem'
        }}
      >
        <LayoutDashboard size={22} strokeWidth={currentTab === 'dashboard' ? 3 : 2} />
        <span>Beranda</span>
      </button>

      <button
        onClick={() => onSelectTab('tasks')}
        aria-label="Tugas"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: currentTab === 'tasks' ? 'var(--color-red)' : 'var(--color-black)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '0.7rem',
          position: 'relative'
        }}
      >
        <CheckSquare size={22} strokeWidth={currentTab === 'tasks' ? 3 : 2} />
        <span>Tugas</span>
        {activeTaskCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-3px',
              right: '2px',
              background: 'var(--color-yellow)',
              border: '1.5px solid var(--color-black)',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              fontSize: '0.62rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900
            }}
          >
            {activeTaskCount}
          </span>
        )}
      </button>

      {/* Big Prominent Center Plus Button */}
      <button
        onClick={onOpenAddTask}
        aria-label="Tambah Tugas"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-red)',
          border: 'var(--border-thick)',
          boxShadow: '3px 3px 0 var(--color-black)',
          color: 'var(--color-white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transform: 'translateY(-14px)',
          transition: 'transform 0.1s ease'
        }}
      >
        <Plus size={28} strokeWidth={3.5} />
      </button>

      <button
        onClick={() => onSelectTab('calendar')}
        aria-label="Kalender"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: currentTab === 'calendar' ? 'var(--color-red)' : 'var(--color-black)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '0.7rem'
        }}
      >
        <Calendar size={22} strokeWidth={currentTab === 'calendar' ? 3 : 2} />
        <span>Kalender</span>
      </button>
    </nav>
  );
};
