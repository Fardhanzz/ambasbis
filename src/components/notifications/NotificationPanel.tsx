import React from 'react';
import type { Reminder } from '../../types';
import { formatDeadlineDate } from '../../utils/urgency';
import { Bell, X } from 'lucide-react';

export interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  reminders: Reminder[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onOpenTask: (taskId: string) => void;
  onRequestBrowserPermission: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  reminders,
  onMarkAsRead,
  onMarkAllAsRead,
  onOpenTask,
  onRequestBrowserPermission
}) => {
  if (!isOpen) return null;

  const unreadCount = reminders.filter(r => !r.read).length;

  return (
    <div
      style={{
        position: 'fixed',
        top: '75px',
        right: '24px',
        width: '360px',
        maxWidth: 'calc(100vw - 48px)',
        backgroundColor: '#FFFFFF',
        border: 'var(--border-thick)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-dialog)',
        zIndex: 600,
        overflow: 'hidden',
        animation: 'scaleUp 0.15s ease-out'
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          backgroundColor: 'var(--color-cream)',
          borderBottom: 'var(--border-thick)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} strokeWidth={2.5} />
          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase' }}>
            NOTIFIKASI ({unreadCount})
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: 'var(--color-red)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Tandai Dibaca
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Tutup panel"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid var(--color-black)',
              borderRadius: '6px',
              padding: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Browser Notification Banner */}
      <div
        style={{
          padding: '10px 14px',
          backgroundColor: '#FFF9E6',
          borderBottom: '2px solid var(--color-black)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}
      >
        <div style={{ fontSize: '0.78rem', fontWeight: 700, lineHeight: 1.3 }}>
          🔔 Aktifkan pengingat browser agar tidak lupa tugas!
        </div>
        <button
          onClick={onRequestBrowserPermission}
          className="neo-btn neo-btn-sm neo-btn-yellow"
          style={{ padding: '4px 8px', fontSize: '0.72rem' }}
        >
          IZINKAN
        </button>
      </div>

      {/* Reminder List */}
      <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '12px' }}>
        {reminders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 12px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9rem' }}>
              Belum ada notifikasi
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
              Kamu akan menerima peringatan saat deadline tugas semakin dekat.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {reminders.map((rem) => (
              <div
                key={rem.id}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--color-black)',
                  backgroundColor: rem.read ? '#FDFBF9' : '#FFF2E8',
                  boxShadow: rem.read ? 'none' : '2px 2px 0 var(--color-black)',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  onMarkAsRead(rem.id);
                  onOpenTask(rem.taskId);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      backgroundColor: rem.type === 'DEADLINE_HARI_H' ? 'var(--color-red)' : rem.type === 'DEADLINE_H_MIN_1' ? 'var(--color-yellow)' : 'var(--color-blue)',
                      color: rem.type === 'DEADLINE_HARI_H' ? '#FFFFFF' : 'var(--color-black)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid var(--color-black)',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {rem.type === 'DEADLINE_HARI_H' ? 'HARI H' : rem.type === 'DEADLINE_H_MIN_1' ? 'H-1' : 'H-3'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    {formatDeadlineDate(rem.deadline)}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: '2px' }}>
                  {rem.taskTitle}
                </h4>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  Mapel: {rem.subjectName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
