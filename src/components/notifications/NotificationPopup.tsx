import React from 'react';
import type { Reminder } from '../../types';
import { Button } from '../ui/Button';
import { getReminderInfo } from '../../utils/reminder';
import { Bell, X, ArrowRight } from 'lucide-react';

export interface NotificationPopupProps {
  reminder: Reminder | null;
  onClose: () => void;
  onOpenTask: (taskId: string) => void;
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  reminder,
  onClose,
  onOpenTask
}) => {
  if (!reminder) return null;

  const info = getReminderInfo(reminder.type);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 500,
        maxWidth: '360px',
        width: 'calc(100% - 48px)',
        backgroundColor: info.badgeBg,
        border: '3.5px solid var(--color-black)',
        borderRadius: '16px',
        boxShadow: '7px 7px 0px var(--color-black)',
        padding: '16px 18px',
        animation: 'slideUp 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              color: 'var(--color-black)',
              borderRadius: '6px',
              border: '2px solid var(--color-black)',
              padding: '2px 6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Bell size={13} strokeWidth={3} />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: info.badgeColor
            }}
          >
            {info.tag}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Tutup notifikasi"
          style={{
            background: '#FFFFFF',
            border: '1.5px solid var(--color-black)',
            borderRadius: '6px',
            padding: '3px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '1.5px 1.5px 0 var(--color-black)'
          }}
        >
          <X size={15} strokeWidth={3} />
        </button>
      </div>

      <h4
        style={{
          fontSize: '1.05rem',
          fontWeight: 900,
          lineHeight: 1.3,
          marginBottom: '4px',
          textTransform: 'uppercase',
          color: info.badgeColor
        }}
      >
        {reminder.taskTitle}
      </h4>

      <p
        style={{
          fontSize: '0.82rem',
          fontWeight: 700,
          color: info.badgeColor,
          marginBottom: '14px',
          opacity: 0.95
        }}
      >
        Mata Pelajaran: {reminder.subjectName}
      </p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <Button
          variant={reminder.type === 'DEADLINE_HARI_H' ? 'yellow' : 'primary'}
          size="sm"
          icon={<ArrowRight size={14} strokeWidth={3} />}
          onClick={() => {
            onOpenTask(reminder.taskId);
            onClose();
          }}
        >
          BUKA TUGAS →
        </Button>
      </div>
    </div>
  );
};
