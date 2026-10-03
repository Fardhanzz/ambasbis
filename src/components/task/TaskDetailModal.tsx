import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import type { Task, Subject, TaskStatus } from '../../types';
import { calculateProgress } from '../../utils/progress';
import { formatDeadlineDate, getRelativeDeadlineText, calculateUrgency, getUrgencyInfo } from '../../utils/urgency';
import { CheckCircle2, Trash2, Clock, AlertTriangle } from 'lucide-react';

export interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  subject?: Subject;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  onRequestComplete?: (taskId: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  subject,
  onToggleSubtask,
  onAddSubtask,
  onDeleteSubtask,
  onUpdateStatus,
  onDeleteTask,
  onRequestComplete
}) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  if (!task) return null;

  const progress = calculateProgress(task.subtasks, task.status);
  const urgency = calculateUrgency(task.deadline, task.status);
  const urgencyInfo = getUrgencyInfo(urgency);
  const isCompleted = task.status === 'COMPLETED';
  const isOverdue = new Date(task.deadline).getTime() < Date.now();
  const completedCount = task.subtasks.filter(s => s.completed).length;

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    onAddSubtask(task.id, newSubtaskTitle.trim());
    setNewSubtaskTitle('');
  };

  const handleCompleteClick = () => {
    if (isCompleted) {
      onUpdateStatus(task.id, 'IN_PROGRESS');
    } else if (onRequestComplete) {
      onRequestComplete(task.id);
    } else {
      onUpdateStatus(task.id, 'COMPLETED');
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="DETAIL TUGAS"
      badgeText={subject?.name || 'TUGAS'}
    >
      <div>
        {/* Meta badges row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {subject && (
              <span
                style={{
                  backgroundColor: subject.color,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '2px solid var(--color-black)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {subject.icon} {subject.name}
              </span>
            )}
          </div>

          <span
            style={{
              backgroundColor: urgencyInfo.bg,
              color: urgencyInfo.color,
              padding: '4px 10px',
              borderRadius: '6px',
              border: '2px solid var(--color-black)',
              fontWeight: 900,
              fontSize: '0.75rem',
              fontFamily: 'var(--font-heading)'
            }}
          >
            {urgencyInfo.badgeText}
          </span>
        </div>

        {/* Warning banner if overdue (Item 1) */}
        {isOverdue && !isCompleted && (
          <div
            style={{
              backgroundColor: '#FFE5E3',
              color: 'var(--color-red)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '10px 14px',
              borderRadius: '8px',
              border: '2px solid var(--color-black)',
              boxShadow: '3px 3px 0 var(--color-black)',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertTriangle size={18} strokeWidth={2.5} />
            <span>Anda terlambat menyelesaikan tugas ini</span>
          </div>
        )}

        {/* Task Title */}
        <h2
          style={{
            fontSize: '1.45rem',
            lineHeight: 1.25,
            marginBottom: '10px',
            textTransform: 'uppercase'
          }}
        >
          {task.title}
        </h2>

        {/* Deadline & Duration info */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--color-black)',
            borderRadius: '10px',
            padding: '12px 14px',
            boxShadow: '3px 3px 0 var(--color-black)',
            marginBottom: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 700 }}>
            <Clock size={16} strokeWidth={2.5} color="var(--color-red)" />
            <span>Deadline: {formatDeadlineDate(task.deadline)}</span>
            <span style={{ color: isOverdue && !isCompleted ? 'var(--color-red)' : 'inherit' }}>
              ({getRelativeDeadlineText(task.deadline, task.status)})
            </span>
          </div>
        </div>

        {/* Progress Tracker without percentage (Item 3) */}
        {task.subtasks.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>PROGRES SUBTASK</span>
              <span>{completedCount} DARI {task.subtasks.length} SELESAI</span>
            </div>
            <ProgressBar progress={progress} height={16} />
          </div>
        )}

        {/* Subtasks Section */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1rem', textTransform: 'uppercase' }}>
              SUBTASK ({completedCount}/{task.subtasks.length})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {task.subtasks.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                Belum ada subtask. Tambahkan langkah kecil di bawah agar tugas lebih mudah diselesaikan.
              </p>
            ) : (
              task.subtasks.map((st) => (
                <div
                  key={st.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--color-black)',
                    backgroundColor: st.completed ? '#F4F9EE' : '#FFFFFF',
                    gap: '10px'
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      flex: 1,
                      userSelect: 'none'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={st.completed}
                      onChange={() => onToggleSubtask(task.id, st.id)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-green)', cursor: 'pointer' }}
                    />
                    <span
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textDecoration: st.completed ? 'line-through' : 'none',
                        color: st.completed ? 'var(--color-text-muted)' : 'var(--color-black)'
                      }}
                    >
                      {st.title}
                    </span>
                  </label>

                  <button
                    onClick={() => onDeleteSubtask(task.id, st.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#A09690',
                      padding: '4px'
                    }}
                    aria-label="Hapus subtask"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add Subtask input inline */}
          <form onSubmit={handleAddSubtask} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="+ Tambah subtask baru..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              className="neo-input"
              style={{ padding: '8px 12px', fontSize: '0.88rem' }}
            />
            <Button variant="yellow" size="sm" type="submit">
              TAMBAH
            </Button>
          </form>
        </div>

        {/* Description Section */}
        {task.description && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '6px' }}>
              DESKRIPSI & CATATAN
            </h3>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid var(--color-black)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.9rem',
                lineHeight: 1.45,
                color: '#2A2422'
              }}
            >
              {task.description}
            </div>
          </div>
        )}

        {/* Modal Action Buttons Footer (Item 1: Tombol Selesai tetap ada saat melebihi deadline) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid var(--color-black)',
            paddingTop: '18px',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <Button
            variant="white"
            size="sm"
            icon={<Trash2 size={16} strokeWidth={2.5} color="var(--color-red)" />}
            onClick={() => {
              if (confirm('Yakin ingin menghapus tugas ini?')) {
                onDeleteTask(task.id);
                onClose();
              }
            }}
          >
            HAPUS
          </Button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant={isCompleted ? 'yellow' : 'green'}
              icon={<CheckCircle2 size={16} strokeWidth={3} />}
              onClick={handleCompleteClick}
            >
              {isCompleted ? 'BATALKAN SELESAI' : 'TANDAI SELESAI'}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
