import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Subject, Task } from '../../types';
import { Sparkles, Trash2, Plus } from 'lucide-react';

export interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  onSaveTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onOpenAddSubject?: () => void;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  subjects,
  onSaveTask,
  onOpenAddSubject
}) => {
  // Form State
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [deadlineDate, setDeadlineDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [deadlineTime, setDeadlineTime] = useState('23:59');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState<{ id: string; title: string; completed: boolean }[]>([
    { id: 'st_init_1', title: 'Cari materi & referensi', completed: false }
  ]);
  const [newSubtaskInput, setNewSubtaskInput] = useState('');

  // Derive valid subjectId cleanly without effect setState
  const activeSubjectId = subjects.some(s => s.id === subjectId) 
    ? subjectId 
    : (subjects[subjects.length - 1]?.id || subjects[0]?.id || '');

  // Quick Add state
  const [quickAddText, setQuickAddText] = useState('');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  // Quick Add parser
  const handleApplyQuickAdd = () => {
    if (!quickAddText.trim()) return;
    const lower = quickAddText.toLowerCase();

    // Match subject if mentioned
    const matchedSubject = subjects.find(s => lower.includes(s.name.toLowerCase()));
    if (matchedSubject) setSubjectId(matchedSubject.id);

    // Set title
    let parsedTitle = quickAddText;
    if (lower.includes('besok')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDeadlineDate(tomorrow.toISOString().split('T')[0]);
      parsedTitle = parsedTitle.replace(/besok/gi, '').trim();
    } else if (lower.includes('lusa')) {
      const lusa = new Date();
      lusa.setDate(lusa.getDate() + 2);
      setDeadlineDate(lusa.toISOString().split('T')[0]);
      parsedTitle = parsedTitle.replace(/lusa/gi, '').trim();
    }

    if (lower.includes('malam') || lower.includes('23:59') || lower.includes('jam 8') || lower.includes('20:00')) {
      setDeadlineTime('20:00');
    }

    setTitle(parsedTitle.replace(/-\s*/, '').trim());
    setIsQuickAddOpen(false);
  };

  const handleAddSubtask = () => {
    if (!newSubtaskInput.trim()) return;
    setSubtasks([
      ...subtasks,
      { id: `st_${Date.now()}`, title: newSubtaskInput.trim(), completed: false }
    ]);
    setNewSubtaskInput('');
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !activeSubjectId) return;

    const fullDeadline = `${deadlineDate}T${deadlineTime}:00`;

    onSaveTask({
      userId: 'usr_fardhan_01',
      subjectId: activeSubjectId,
      title: title.trim(),
      description: description.trim() || undefined,
      status: 'TODO',
      deadline: fullDeadline,
      subtasks: subtasks.map((st, index) => ({
        id: st.id,
        taskId: '',
        title: st.title,
        completed: false,
        order: index + 1
      }))
    });

    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="TAMBAH TUGAS BARU"
      badgeText="BUAT TUGAS"
    >
      <div>
        {/* Quick Add Toggle Banner */}
        <div
          style={{
            backgroundColor: '#FFF9E6',
            border: '2px solid var(--color-black)',
            borderRadius: '10px',
            padding: '12px 14px',
            boxShadow: '3px 3px 0 var(--color-black)',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800 }}>
              <Sparkles size={16} color="var(--color-red)" />
              <span>Punya format cepat? Gunakan Quick Add</span>
            </div>
            <button
              type="button"
              onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 900,
                color: 'var(--color-red)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isQuickAddOpen ? 'Tutup Quick Add' : 'Coba Quick Add'}
            </button>
          </div>

          {isQuickAddOpen && (
            <div style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Contoh: Laporan kimia - besok jam 8 malam"
                  value={quickAddText}
                  onChange={(e) => setQuickAddText(e.target.value)}
                  className="neo-input"
                  style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                />
                <Button variant="yellow" size="sm" type="button" onClick={handleApplyQuickAdd}>
                  PARSING
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title */}
          <Input
            label="APA TUGASNYA? *"
            placeholder="Contoh: Laporan Praktikum Kimia Asam Basa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Subject Field */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px'
              }}
            >
              <label
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                MATA PELAJARAN *
              </label>
              {onOpenAddSubject && (
                <button
                  type="button"
                  onClick={onOpenAddSubject}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    color: 'var(--color-red)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  <Plus size={11} strokeWidth={3} />
                  <span>+ Mapel Baru</span>
                </button>
              )}
            </div>
            <select
              value={activeSubjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="neo-select"
              required
              style={{ width: '100%' }}
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.icon} {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px' }}>
            <Input
              type="date"
              label="TANGGAL DEADLINE *"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              required
            />
            <Input
              type="time"
              label="JAM *"
              value={deadlineTime}
              onChange={(e) => setDeadlineTime(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.88rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '6px'
              }}
            >
              DESKRIPSI (OPSIONAL)
            </label>
            <textarea
              className="neo-textarea"
              rows={3}
              placeholder="Catatan pengerjaan atau instruksi dari guru/dosen..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Subtasks Builder */}
          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.88rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '6px'
              }}
            >
              SUBTASKS (PECAH TUGAS MENJADI LANGKAH KECIL)
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
              {subtasks.map((st) => (
                <div
                  key={st.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid var(--color-black)'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>☐ {st.title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(st.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-red)' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Tambah subtask..."
                value={newSubtaskInput}
                onChange={(e) => setNewSubtaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask();
                  }
                }}
                className="neo-input"
                style={{ padding: '8px 12px', fontSize: '0.88rem' }}
              />
              <Button variant="white" size="sm" type="button" onClick={handleAddSubtask}>
                + SUBTASK
              </Button>
            </div>
          </div>

          {/* Submit Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <Button variant="white" type="button" onClick={onClose}>
              BATAL
            </Button>
            <Button variant="primary" type="submit">
              SIMPAN TUGAS →
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
