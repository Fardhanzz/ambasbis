import React, { useState, useMemo } from 'react';
import type { Task, Subject } from '../../types';
import { TaskCard } from './TaskCard';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { calculateUrgency } from '../../utils/urgency';
import { Search, Plus, ArrowUpDown, X } from 'lucide-react';

export interface TaskListViewProps {
  tasks: Task[];
  subjects: Subject[];
  onOpenDetail: (task: Task) => void;
  onOpenAddTask: () => void;
  onToggleComplete: (taskId: string) => void;
  selectedSubjectId: string | null;
  onSelectSubject: (id: string | null) => void;
  onOpenAddSubject?: () => void;
  isBrandNewUser?: boolean;
}

export const TaskListView: React.FC<TaskListViewProps> = ({
  tasks,
  subjects,
  onOpenDetail,
  onOpenAddTask,
  onToggleComplete,
  selectedSubjectId,
  onSelectSubject,
  onOpenAddSubject,
  isBrandNewUser = false
}) => {
  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('DEADLINE_NEAREST');

  // Filtered & Sorted Tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = task.description?.toLowerCase().includes(q);
          const subjName = subjects.find(s => s.id === task.subjectId)?.name.toLowerCase();
          const matchSubj = subjName?.includes(q);
          if (!matchTitle && !matchDesc && !matchSubj) return false;
        }

        // Subject filter
        if (selectedSubjectId && task.subjectId !== selectedSubjectId) {
          return false;
        }

        // Status filter
        if (statusFilter !== 'ALL' && task.status !== statusFilter) {
          return false;
        }

        // Urgency filter
        if (urgencyFilter !== 'ALL') {
          const urgency = calculateUrgency(task.deadline, task.status);
          if (urgency !== urgencyFilter) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'DEADLINE_NEAREST') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        if (sortBy === 'DEADLINE_FARTHEST') {
          return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
        }
        if (sortBy === 'NEWEST') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'OLDEST') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return 0;
      });
  }, [tasks, subjects, searchQuery, selectedSubjectId, statusFilter, urgencyFilter, sortBy]);

  const hasActiveFilters =
    searchQuery ||
    selectedSubjectId ||
    statusFilter !== 'ALL' ||
    urgencyFilter !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    onSelectSubject(null);
    setStatusFilter('ALL');
    setUrgencyFilter('ALL');
  };

  return (
    <div>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase' }}>
            MANAJEMEN TUGAS
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            Semua tugas akademik dan deadline dalam satu tempat.
          </p>
        </div>

        <Button variant="primary" icon={<Plus size={18} strokeWidth={3} />} onClick={onOpenAddTask}>
          TAMBAH TUGAS
        </Button>
      </div>

      {/* Search and Filters Controls Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: 'var(--border-thick)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        {/* Search bar */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-black)'
            }}
          >
            <Search size={18} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            placeholder="Cari tugas berdasarkan judul, catatan, atau mata pelajaran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="neo-input"
            style={{ paddingLeft: '40px', fontSize: '0.9rem' }}
          />
        </div>

        {/* Filter Pills row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          {/* Status Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              STATUS:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="neo-select"
              style={{ padding: '6px 10px', fontSize: '0.82rem', width: 'auto' }}
            >
              <option value="ALL">Semua Status</option>
              <option value="TODO">Belum Mulai</option>
              <option value="IN_PROGRESS">Sedang Dikerjakan</option>
              <option value="COMPLETED">Selesai</option>
            </select>
          </div>

          {/* Urgency Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              URGENSI:
            </span>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="neo-select"
              style={{ padding: '6px 10px', fontSize: '0.82rem', width: 'auto' }}
            >
              <option value="ALL">Semua Urgensi</option>
              <option value="URGENT">🔥 Mendesak (≤24 jam)</option>
              <option value="SOON">⚡ Segera (≤3 hari)</option>
              <option value="UPCOMING">🗓 Mendatang</option>
              <option value="OVERDUE">⚠️ Terlewat</option>
            </select>
          </div>

          {/* Sort Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
            <ArrowUpDown size={15} strokeWidth={2.5} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="neo-select"
              style={{ padding: '6px 10px', fontSize: '0.82rem', width: 'auto' }}
            >
              <option value="DEADLINE_NEAREST">Deadline Terdekat</option>
              <option value="DEADLINE_FARTHEST">Deadline Terjauh</option>
              <option value="NEWEST">Terbaru Ditambahkan</option>
              <option value="OLDEST">Terlama</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: '#FFE5E3',
                border: '1.5px solid var(--color-black)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--color-red)',
                cursor: 'pointer'
              }}
            >
              <X size={13} strokeWidth={3} />
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Subject Filter Pills Bar (repair.txt Item 4) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '20px'
        }}
      >
        <button
          onClick={() => onSelectSubject(null)}
          style={{
            whiteSpace: 'nowrap',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: selectedSubjectId === null ? '2.5px solid var(--color-black)' : '2px solid var(--color-black)',
            backgroundColor: selectedSubjectId === null ? 'var(--color-black)' : '#FFFFFF',
            color: selectedSubjectId === null ? 'var(--color-yellow)' : 'var(--color-black)',
            boxShadow: selectedSubjectId === null ? '3px 3px 0 var(--color-black)' : '2px 2px 0 var(--color-black)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: '0.8rem',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          SEMUA MAPEL ({tasks.length})
        </button>

        {subjects.map((sub) => {
          const isSelected = selectedSubjectId === sub.id;
          const count = tasks.filter(t => t.subjectId === sub.id).length;
          return (
            <button
              key={sub.id}
              onClick={() => onSelectSubject(isSelected ? null : sub.id)}
              style={{
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '9999px',
                border: '2px solid var(--color-black)',
                backgroundColor: isSelected ? sub.color : '#FFFFFF',
                boxShadow: isSelected ? '3px 3px 0 var(--color-black)' : '2px 2px 0 var(--color-black)',
                transform: isSelected ? 'translate(-1px, -1px)' : 'none',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.8rem',
                color: 'var(--color-black)',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.12s ease'
              }}
            >
              <span>{sub.icon || '📚'}</span>
              <span>{sub.name}</span>
              <span
                style={{
                  backgroundColor: isSelected ? 'var(--color-black)' : '#EFE8DE',
                  color: isSelected ? '#FFFFFF' : 'var(--color-black)',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  border: '1px solid var(--color-black)'
                }}
              >
                {count}
              </span>
            </button>
          );
        })}

        {onOpenAddSubject && (
          <button
            onClick={onOpenAddSubject}
            className="neo-btn neo-btn-white"
            style={{
              padding: '6px 12px',
              fontSize: '0.8rem',
              borderRadius: '9999px',
              flexShrink: 0,
              gap: '4px'
            }}
          >
            <Plus size={14} strokeWidth={3} />
            <span>+ MAPEL BARU</span>
          </button>
        )}
      </div>

      {/* Task Grid or Empty State */}
      {filteredTasks.length === 0 ? (
        <Card
          variant="white"
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {tasks.length === 0 ? (
            <>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: isBrandNewUser ? 'var(--color-yellow)' : 'var(--color-green)',
                  border: 'var(--border-thick)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  boxShadow: '4px 4px 0 var(--color-black)',
                  marginBottom: '16px'
                }}
              >
                {isBrandNewUser ? '📋' : '🎉'}
              </div>
              <h2 style={{ fontSize: '1.5rem', textTransform: 'uppercase', marginBottom: '8px' }}>
                {isBrandNewUser ? 'TUGASMU MASIH KOSONG' : 'SEMUA TUGAS BERES!'}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '420px', marginBottom: '24px' }}>
                {isBrandNewUser
                  ? 'Nikmati ketenangan sejenak, atau mulai catat tugas barumu agar tidak ada deadline yang terlewat.'
                  : 'Luar biasa! Tidak ada tugas yang perlu dikerjakan saat ini. Istirahat sejenak atau buat tugas baru.'}
              </p>
              <Button variant="primary" icon={<Plus size={18} strokeWidth={3} />} onClick={onOpenAddTask}>
                {isBrandNewUser ? '+ TAMBAH TUGAS PERTAMA' : '+ BUAT TUGAS BARU'}
              </Button>
            </>
          ) : (
            <>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: 'var(--color-yellow)',
                  border: 'var(--border-thick)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  boxShadow: '4px 4px 0 var(--color-black)',
                  marginBottom: '16px'
                }}
              >
                🔍
              </div>
              <h2 style={{ fontSize: '1.5rem', textTransform: 'uppercase', marginBottom: '8px' }}>
                TIDAK ADA TUGAS YANG COCOK
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '420px', marginBottom: '24px' }}>
                Tidak ditemukan tugas yang sesuai dengan filter atau kata kunci pencarian tersebut.
              </p>
              <Button
                variant="white"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('ALL');
                  setUrgencyFilter('ALL');
                  onSelectSubject(null);
                }}
              >
                Reset Semua Filter
              </Button>
            </>
          )}
        </Card>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '18px'
          }}
        >
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              subject={subjects.find(s => s.id === task.subjectId)}
              onOpenDetail={onOpenDetail}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
