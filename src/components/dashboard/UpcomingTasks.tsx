import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import type { Task, Subject } from '../../types';
import { formatDeadlineDate, getRelativeDeadlineText, calculateUrgency, getUrgencyInfo } from '../../utils/urgency';
import { calculateProgress } from '../../utils/progress';
import { Calendar, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export interface UpcomingTasksProps {
  tasks: Task[];
  subjects: Subject[];
  onOpenDetail: (task: Task) => void;
  onToggleTaskComplete?: (taskId: string) => void;
}

export const UpcomingTasks: React.FC<UpcomingTasksProps> = ({
  tasks,
  subjects,
  onOpenDetail,
  onToggleTaskComplete
}) => {
  const getSubject = (id: string) => subjects.find(s => s.id === id);

  return (
    <div style={{ marginBottom: '36px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              backgroundColor: 'var(--color-blue)',
              border: '2px solid var(--color-black)',
              borderRadius: '8px',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Calendar size={16} strokeWidth={3} />
          </span>
          <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase' }}>
            TUGAS MENDATANG LAINNYA
          </h2>
        </div>
      </div>

      {tasks.length === 0 ? (
        <Card variant="white" style={{ padding: '24px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
            Tidak ada tugas mendatang. Santai atau tambahkan tugas baru!
          </p>
        </Card>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px'
          }}
        >
          {tasks.map((task) => {
            const subject = getSubject(task.subjectId);
            const progress = calculateProgress(task.subtasks, task.status);
            const urgency = calculateUrgency(task.deadline, task.status);
            const urgencyInfo = getUrgencyInfo(urgency);
            const isCompleted = task.status === 'COMPLETED';
            const isOverdue = new Date(task.deadline).getTime() < Date.now();
            const completedCount = task.subtasks.filter(s => s.completed).length;

            return (
              <Card
                key={task.id}
                interactive
                style={{
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onClick={() => onOpenDetail(task)}
              >
                <div>
                  {/* Subject & Urgency row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    {subject ? (
                      <span
                        style={{
                          backgroundColor: subject.color,
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          fontFamily: 'var(--font-heading)',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1.5px solid var(--color-black)',
                          boxShadow: '1.5px 1.5px 0 var(--color-black)'
                        }}
                      >
                        {subject.icon} {subject.name}
                      </span>
                    ) : <span />}

                    <span
                      style={{
                        backgroundColor: urgencyInfo.bg,
                        color: urgencyInfo.color,
                        fontSize: '0.68rem',
                        fontWeight: 900,
                        fontFamily: 'var(--font-heading)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: '1.5px solid var(--color-black)'
                      }}
                    >
                      {urgencyInfo.badgeText}
                    </span>
                  </div>

                  {/* Overdue Warning Tag if applicable */}
                  {isOverdue && !isCompleted && (
                    <div
                      style={{
                        backgroundColor: '#FFE5E3',
                        color: 'var(--color-red)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '1px solid var(--color-black)',
                        marginBottom: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <AlertTriangle size={12} strokeWidth={2.5} />
                      Anda terlambat menyelesaikan tugas ini
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      marginBottom: '8px',
                      lineHeight: 1.3
                    }}
                  >
                    {task.title}
                  </h3>

                  {/* Deadline info */}
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: isOverdue && !isCompleted ? 'var(--color-red)' : 'var(--color-text-muted)',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>🗓</span>
                    <span>{formatDeadlineDate(task.deadline)}</span>
                    <span style={{ color: 'var(--color-black)', fontWeight: 800 }}>
                      ({getRelativeDeadlineText(task.deadline)})
                    </span>
                  </div>
                </div>

                {/* Subtask count and action buttons */}
                <div>
                  {task.subtasks.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px' }}>
                        <span>Langkah Subtask</span>
                        <span>{completedCount}/{task.subtasks.length} Selesai</span>
                      </div>
                      <ProgressBar progress={progress} height={10} />
                    </div>
                  )}

                  {/* Buttons: Tombol Selesai & Detail */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                    {onToggleTaskComplete && (
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
                    )}

                    <Button
                      variant="white"
                      size="sm"
                      icon={<ChevronRight size={14} strokeWidth={3} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetail(task);
                      }}
                    >
                      DETAIL
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
