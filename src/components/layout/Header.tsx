import React from 'react';
import { Bell, Plus, User } from 'lucide-react';
import { Button } from '../ui/Button';

import type { UserProfile } from '../../types';

export interface HeaderProps {
  unreadNotificationCount: number;
  onOpenNotifications: () => void;
  onOpenAddTask: () => void;
  onOpenAuth: () => void;
  currentTab: string;
  user?: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  unreadNotificationCount,
  onOpenNotifications,
  onOpenAddTask,
  onOpenAuth,
  currentTab,
  user
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'COMMAND CENTER';
      case 'tasks':
        return 'DAFTAR TUGAS';
      case 'calendar':
        return 'KALENDER DEADLINE';
      default:
        return 'AMBASBIS';
    }
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '20px',
        marginBottom: '24px',
        borderBottom: 'var(--border-thick)',
        flexWrap: 'wrap',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            background: 'var(--color-black)',
            color: 'var(--color-yellow)',
            padding: '4px 10px',
            borderRadius: '6px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: '0.8rem',
            letterSpacing: '0.05em'
          }}
        >
          {getTabTitle()}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Quick Add Button */}
        <Button
          variant="yellow"
          size="sm"
          icon={<Plus size={16} strokeWidth={3} />}
          onClick={onOpenAddTask}
        >
          TAMBAH TUGAS
        </Button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          aria-label="Notifikasi"
          style={{
            position: 'relative',
            background: 'var(--color-white)',
            border: 'var(--border-thick)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '3px 3px 0 var(--color-black)',
            padding: '8px 10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.1s ease'
          }}
        >
          <Bell size={20} strokeWidth={2.5} />
          {unreadNotificationCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: 'var(--color-red)',
                color: 'var(--color-white)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '0.7rem',
                minWidth: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--color-black)',
                boxShadow: '1px 1px 0 var(--color-black)'
              }}
            >
              {unreadNotificationCount}
            </span>
          )}
        </button>

        {/* Auth / Account Profile Button */}
        <button
          onClick={onOpenAuth}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: user?.email ? 'var(--color-white)' : 'var(--color-yellow)',
            border: 'var(--border-thick)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '3px 3px 0 var(--color-black)',
            padding: '6px 12px',
            cursor: 'pointer',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.85rem'
          }}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid var(--color-black)',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: user?.email ? 'var(--color-purple)' : 'var(--color-black)',
                color: user?.email ? 'var(--color-black)' : 'var(--color-yellow)',
                border: '2px solid var(--color-black)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User size={14} strokeWidth={2.5} />
            </div>
          )}
          <span>{user?.email ? user.name.split(' ')[0].toUpperCase() : 'MASUK / DAFTAR'}</span>
        </button>
      </div>
    </header>
  );
};
