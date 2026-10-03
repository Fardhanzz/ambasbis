import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import type { Task, Subject } from '../../types';
import { calculateProgress } from '../../utils/progress';
import { formatDeadlineDate, getRelativeDeadlineText } from '../../utils/urgency';
import { CheckCircle2, ChevronRight, Flame, Layers, AlertTriangle } from 'lucide-react';

export interface UrgentTaskCardProps {
  task: Task | null;
  subject?: Subject;
  onOpenDetail: (task: Task) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export const UrgentTaskCard: React.FC<UrgentTaskCardProps> = ({
  task,
  subject,
  onOpenDetail,
  onToggleSubtask,
  onCompleteTask
}) => {
  if (!task) {
    return (
      <Card variant="white" style={{ padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem' }}>
          🎉 TIDAK ADA TUGAS MENDESAK!
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Semua tugas dalam kontrol aman. Nikmati waktumu atau mulai cicil tugas berikutnya.
        </p>
      </Card>
    );
  }

  const progress = calculateProgress(task.subtasks, task.status);
  const deadlineRelative = getRelativeDeadlineText(task.deadline);
  const deadlineFull = formatDeadlineDate(task.deadline);
  const isOverdue = new Date(task.deadline).getTime() < Date.now();
  const completedSubtasksCount = task.subtasks.filter(s => s.completed).length;

  return (
    <Card
      variant="cream"
      hasStar={true}
      style={{
        padding: '24px',
        marginBottom: '32px',
        border: '3.5px solid var(--color-black)'
      }}
    >
      {/* Top Banner Tag */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              backgroundColor: 'var(--color-red)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '0.82rem',
              letterSpacing: '0.04em',
              padding: '4px 12px',
              borderRadius: '9999px',
              border: '2px solid var(--color-black)',
              boxShadow: '2px 2px 0 var(--color-black)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Flame size={15} fill="#FFFFFF" />
            YANG HARUS DIKERJAKAN
          </span>

          {subject && (
            <span
              style={{
                backgroundColor: subject.color,
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.78rem',
                padding: '4px 10px',
                borderRadius: '8px',
                border: '2px solid var(--color-black)',
                boxShadow: '2px 2px 0 var(--color-black)'
              }}
            >
              {subject.icon} {subject.name}
            </span>
          )}
        </div>

        {/* Deadline Alert Pill */}
        <div
          style={{
            backgroundColor: isOverdue ? '#FFE5E3' : '#FFFFFF',
            border: '2px solid var(--color-black)',
            borderRadius: '8px',
            padding: '4px 12px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.8rem',
            boxShadow: '2px 2px 0 var(--color-black)',
            color: 'var(--color-red)'
          }}
        >
          DEADLINE: {deadlineRelative.toUpperCase()} ({deadlineFull})
        </div>
      </div>

      {/* Task Title & Description */}
      <div style={{ marginBottom: '18px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            marginBottom: '6px'
          }}
        >
          {task.title}
        </h2>
        {task.description && (
          <p
            style={{
              fontSize: '0.92rem',
              color: '#423B38',
              lineHeight: 1.45,
              maxWidth: '750px'
            }}
          >
            {task.description}
          </p>
        )}
      </div>

      {/* Overdue Warning Alert Box (Item 1) */}
      {isOverdue && task.status !== 'COMPLETED' && (
        <div
          style={{
            backgroundColor: '#FFE5E3',
            border: '2.5px solid var(--color-black)',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--color-red)',
            fontWeight: 800,
            fontSize: '0.88rem',
            boxShadow: '3px 3px 0 var(--color-black)'
          }}
        >
          <AlertTriangle size={20} strokeWidth={2.5} />
          <span>⚠️ Anda terlambat menyelesaikan tugas ini</span>
        </div>
      )}

      {/* Subtasks section without percentage (Item 3) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: 'var(--border-thick)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          boxShadow: '4px 4px 0 var(--color-black)',
          marginBottom: '20px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} strokeWidth={2.5} />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.88rem' }}>
              LANGKAH SUBTASK
            </span>
          </div>
          {task.subtasks.length > 0 && (
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '0.88rem',
                backgroundColor: completedSubtasksCount === task.subtasks.length ? 'var(--color-green)' : 'var(--color-yellow)',
                padding: '3px 10px',
                borderRadius: '6px',
                border: '2px solid var(--color-black)'
              }}
            >
              {completedSubtasksCount} DARI {task.subtasks.length} SELESAI
            </span>
          )}
        </div>

        <ProgressBar progress={progress} height={16} />

        {/* Subtask interactive checklist */}
        {task.subtasks.length > 0 && (
          <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {task.subtasks.map((st) => (
              <label
                key={st.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  backgroundColor: st.completed ? '#F4F9EE' : '#FDFBF9',
                  border: '1.5px solid var(--color-black)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'background 0.1s ease'
                }}
              >
                <input
                  type="checkbox"
                  checked={st.completed}
                  onChange={() => onToggleSubtask(task.id, st.id)}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--color-green)',
                    cursor: 'pointer'
                  }}
                />
                <span
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    textDecoration: st.completed ? 'line-through' : 'none',
                    color: st.completed ? 'var(--color-text-muted)' : 'var(--color-black)'
                  }}
                >
                  {st.title}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer (Item 1: Tombol Selesai tetap ada saat melebihi deadline) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          {isOverdue && task.status !== 'COMPLETED' && (
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-red)' }}>
              ⚠️ Melebihi batas deadline
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant={task.status === 'COMPLETED' ? 'yellow' : 'green'}
            size="sm"
            icon={<CheckCircle2 size={16} strokeWidth={3} />}
            onClick={() => onCompleteTask(task.id)}
          >
            {task.status === 'COMPLETED' ? 'BATALKAN SELESAI' : 'TANDAI SELESAI'}
          </Button>

          <Button
            variant="primary"
            icon={<ChevronRight size={18} strokeWidth={3} />}
            onClick={() => onOpenDetail(task)}
          >
            LANJUTKAN KERJA →
          </Button>
        </div>
      </div>
    </Card>
  );
};
