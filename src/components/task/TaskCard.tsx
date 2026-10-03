import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import type { Task, Subject } from '../../types';
import { calculateProgress } from '../../utils/progress';
import { formatDeadlineDate, getRelativeDeadlineText, calculateUrgency, getUrgencyInfo } from '../../utils/urgency';
import { CheckCircle2, Clock, AlertTriangle, ChevronRight } from 'lucide-react';

export interface TaskCardProps {
  task: Task;
  subject?: Subject;
  onOpenDetail: (task: Task) => void;
  onToggleComplete: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  subject,
  onOpenDetail,
  onToggleComplete
}) => {
  const progress = calculateProgress(task.subtasks, task.status);
  const urgency = calculateUrgency(task.deadline, task.status);
  const urgencyInfo = getUrgencyInfo(urgency);
  const isCompleted = task.status === 'COMPLETED';
  const isOverdue = new Date(task.deadline).getTime() < Date.now();
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;

  return (
    <Card
      interactive
      style={{
        padding: '18px',
        backgroundColor: isCompleted ? '#F9F8F6' : '#FFFFFF',
        opacity: isCompleted ? 0.8 : 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer'
      }}
      onClick={() => onOpenDetail(task)}
    >
      <div>
        {/* Top meta tags */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {subject && (
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
            )}
          </div>

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

        {/* Warning label if overdue (Item 1) */}
        {isOverdue && !isCompleted && (
          <div
            style={{
              backgroundColor: '#FFE5E3',
              color: 'var(--color-red)',
              fontSize: '0.74rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1.5px solid var(--color-black)',
              marginBottom: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <AlertTriangle size={13} strokeWidth={2.5} />
            <span>Anda terlambat menyelesaikan tugas ini</span>
          </div>
        )}

        {/* Task Title with quick toggle */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(task.id);
            }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              border: '2px solid var(--color-black)',
              backgroundColor: isCompleted ? 'var(--color-green)' : '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              marginTop: '2px',
              boxShadow: '1.5px 1.5px 0 var(--color-black)'
            }}
            aria-label={isCompleted ? 'Batalkan selesai' : 'Selesaikan'}
          >
            {isCompleted && <CheckCircle2 size={16} strokeWidth={3} color="#FFFFFF" />}
          </button>

          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              lineHeight: 1.35,
              textDecoration: isCompleted ? 'line-through' : 'none',
              color: isCompleted ? 'var(--color-text-muted)' : 'var(--color-black)'
            }}
          >
            {task.title}
          </h3>
        </div>

        {/* Description snippet */}
        {task.description && (
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)',
              marginBottom: '12px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.35
            }}
          >
            {task.description}
          </p>
        )}

        {/* Deadline line */}
        <div
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: isOverdue && !isCompleted ? 'var(--color-red)' : 'var(--color-text-muted)',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Clock size={14} strokeWidth={2.5} />
          <span>{formatDeadlineDate(task.deadline)}</span>
          <span style={{ fontWeight: 800, color: 'var(--color-black)' }}>
            ({getRelativeDeadlineText(task.deadline, task.status)})
          </span>
        </div>
      </div>

      {/* Subtask count without percentage and Action Buttons */}
      <div>
        {task.subtasks.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontWeight: 800, marginBottom: '4px' }}>
              <span>Langkah Subtask</span>
              <span>{completedSubtasks}/{task.subtasks.length} Selesai</span>
            </div>
            <ProgressBar progress={progress} height={10} />
          </div>
        )}

        {/* Action Buttons: Tombol Selesai (Item 1) & Detail */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
          <Button
            variant={isCompleted ? 'white' : 'green'}
            size="sm"
            icon={<CheckCircle2 size={14} strokeWidth={3} />}
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(task.id);
            }}
          >
            {isCompleted ? 'BATAL' : 'SELESAI'}
          </Button>

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
};
