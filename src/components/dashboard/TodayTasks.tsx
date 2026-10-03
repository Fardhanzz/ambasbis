import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Task, Subject } from '../../types';
import { getRelativeDeadlineText } from '../../utils/urgency';
import { CheckCircle2, ChevronRight, Clock, AlertTriangle } from 'lucide-react';

export interface TodayTasksProps {
  tasks: Task[];
  subjects: Subject[];
  onOpenDetail: (task: Task) => void;
  onToggleTaskComplete: (taskId: string) => void;
}

export const TodayTasks: React.FC<TodayTasksProps> = ({
  tasks,
  subjects,
  onOpenDetail,
  onToggleTaskComplete
}) => {
  const getSubject = (id: string) => subjects.find(s => s.id === id);

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              backgroundColor: 'var(--color-yellow)',
              border: '2px solid var(--color-black)',
              borderRadius: '8px',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Clock size={16} strokeWidth={3} />
          </span>
          <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase' }}>
            TUGAS HARI INI & SEGERA
          </h2>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.8rem',
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--color-black)',
            padding: '2px 8px',
            borderRadius: '9999px',
            boxShadow: '2px 2px 0 var(--color-black)'
          }}
        >
          {tasks.length} TUGAS
        </span>
      </div>

      {tasks.length === 0 ? (
        <Card variant="white" style={{ padding: '24px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
            Tidak ada tugas yang jatuh tempo hari ini.
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tasks.map((task) => {
            const subject = getSubject(task.subjectId);
            const isCompleted = task.status === 'COMPLETED';
            const isOverdue = new Date(task.deadline).getTime() < Date.now();
            const completedSubtasks = task.subtasks.filter(s => s.completed).length;

            return (
              <div
                key={task.id}
                className="neo-card neo-card-interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  backgroundColor: isCompleted ? '#F7F7F7' : '#FFFFFF',
                  opacity: isCompleted ? 0.75 : 1,
                  gap: '12px',
                  cursor: 'pointer',
                  flexWrap: 'wrap'
                }}
                onClick={() => onOpenDetail(task)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTaskComplete(task.id);
                    }}
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '6px',
                      border: '2px solid var(--color-black)',
                      backgroundColor: isCompleted ? 'var(--color-green)' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: '1.5px 1.5px 0 var(--color-black)'
                    }}
                    aria-label={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}
                  >
                    {isCompleted && <CheckCircle2 size={16} strokeWidth={3} color="#FFFFFF" />}
                  </button>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      {subject && (
                        <span
                          style={{
                            backgroundColor: subject.color,
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            fontFamily: 'var(--font-heading)',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            border: '1.5px solid var(--color-black)'
                          }}
                        >
                          {subject.name}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: isOverdue && !isCompleted ? 'var(--color-red)' : 'var(--color-black)'
                        }}
                      >
                        ⏳ {getRelativeDeadlineText(task.deadline, task.status)}
                      </span>

                      {/* Overdue Warning badge (Item 1) */}
                      {isOverdue && !isCompleted && (
                        <span
                          style={{
                            backgroundColor: '#FFE5E3',
                            color: 'var(--color-red)',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            border: '1px solid var(--color-black)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <AlertTriangle size={12} strokeWidth={2.5} />
                          Anda terlambat menyelesaikan tugas ini
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {task.title}
                    </h3>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  {/* Subtask count without percentage (Item 3) */}
                  {task.subtasks.length > 0 && (
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        background: 'var(--color-cream)',
                        border: '1.5px solid var(--color-black)',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {completedSubtasks}/{task.subtasks.length} Subtask
                    </span>
                  )}

                  {/* Tombol Selesai (Item 1) */}
                  <Button
                    variant={isCompleted ? 'white' : 'green'}
                    size="sm"
                    icon={<CheckCircle2 size={14} strokeWidth={3} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTaskComplete(task.id);
                    }}
                  >
                    {isCompleted ? 'BATAL' : 'SELESAI'}
                  </Button>

                  <ChevronRight size={18} strokeWidth={3} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
