import React from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import type { Task } from '../../types';
import { formatDeadlineDate } from '../../utils/urgency';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export interface OverdueWarningModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmComplete: (taskId: string) => void;
}

export const OverdueWarningModal: React.FC<OverdueWarningModalProps> = ({
  task,
  isOpen,
  onClose,
  onConfirmComplete
}) => {
  if (!task) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="PERINGATAN DEADLINE"
      badgeText="TERLAMBAT"
      maxWidth="500px"
    >
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <div
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'var(--color-red)',
            color: '#FFFFFF',
            borderRadius: '50%',
            border: 'var(--border-thick)',
            boxShadow: '4px 4px 0 var(--color-black)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
        >
          <AlertTriangle size={32} strokeWidth={2.5} />
        </div>

        <h3
          style={{
            fontSize: '1.35rem',
            color: 'var(--color-red)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            marginBottom: '10px'
          }}
        >
          Anda terlambat menyelesaikan tugas ini
        </h3>

        <div
          style={{
            backgroundColor: '#FFE5E3',
            border: '2px solid var(--color-black)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            textAlign: 'left'
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '4px' }}>
            {task.title}
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
            Deadline semula: <span style={{ color: 'var(--color-red)', fontWeight: 800 }}>{formatDeadlineDate(task.deadline)}</span>
          </div>
        </div>

        <p
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--color-black)',
            marginBottom: '24px',
            lineHeight: 1.4
          }}
        >
          Tugas ini telah melewati batas tenggat waktu. Apakah Anda tetap ingin menandai tugas ini sebagai selesai sekarang?
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <Button variant="white" onClick={onClose}>
            BATAL
          </Button>
          <Button
            variant="green"
            icon={<CheckCircle2 size={16} strokeWidth={3} />}
            onClick={() => {
              onConfirmComplete(task.id);
              onClose();
            }}
          >
            TETAP TANDAI SELESAI →
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
