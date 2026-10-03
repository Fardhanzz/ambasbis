import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import type { Subject } from '../../types';
import { CURATED_SUBJECT_PRESETS, JURUSAN_PRESETS, NEO_SUBJECT_COLORS, SUBJECT_EMOJI_PRESETS } from '../../data/subjectPresets';
import { Check, Plus, BookOpen, GraduationCap } from 'lucide-react';

export interface SubjectOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  currentSubjects: Subject[];
  onComplete: (selectedSubjects: Subject[]) => void;
}

export const SubjectOnboardingModal: React.FC<SubjectOnboardingModalProps> = ({
  isOpen,
  onClose,
  userName,
  currentSubjects,
  onComplete
}) => {
  // Pool of all available subjects (presets + current custom subjects)
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>(() => {
    const map = new Map<string, Subject>();
    // Put curated presets first
    CURATED_SUBJECT_PRESETS.forEach(s => map.set(s.id, s));
    // Add existing current subjects (which may include custom ones)
    currentSubjects.forEach(s => map.set(s.id, s));
    return Array.from(map.values());
  });

  // Selected subject IDs
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    // Default to the user's current subjects or top 6 curated
    if (currentSubjects.length > 0) {
      currentSubjects.forEach(s => initial.add(s.id));
    } else {
      CURATED_SUBJECT_PRESETS.slice(0, 6).forEach(s => initial.add(s.id));
    }
    return initial;
  });

  // Quick custom subject input
  const [customSubjectName, setCustomSubjectName] = useState('');

  // Toggle selection
  const handleToggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Preset package applicator (IPA / IPS / Teknik)
  const applyPresetPackage = (presetIds: string[]) => {
    setSelectedIds(new Set(presetIds));
  };

  // Add custom subject directly
  const handleAddCustomSubject = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customSubjectName.trim();
    if (!trimmed) return;

    // Check if already in pool
    const existing = availableSubjects.find(
      s => s.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (existing) {
      setSelectedIds(prev => new Set(prev).add(existing.id));
      setCustomSubjectName('');
      return;
    }

    const randomColor = NEO_SUBJECT_COLORS[availableSubjects.length % NEO_SUBJECT_COLORS.length].hex;
    const randomEmoji = SUBJECT_EMOJI_PRESETS[availableSubjects.length % SUBJECT_EMOJI_PRESETS.length];
    const newSubj: Subject = {
      id: `subj_custom_${Date.now()}`,
      name: trimmed,
      color: randomColor,
      icon: randomEmoji
    };

    setAvailableSubjects(prev => [...prev, newSubj]);
    setSelectedIds(prev => new Set(prev).add(newSubj.id));
    setCustomSubjectName('');
  };

  const handleSaveAndContinue = () => {
    const finalSubjects = availableSubjects.filter(s => selectedIds.has(s.id));
    // If none selected, keep at least the first 3
    if (finalSubjects.length === 0) {
      onComplete(availableSubjects.slice(0, 3));
    } else {
      onComplete(finalSubjects);
    }
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="PILIH MATA PELAJARAN KAMU"
      badgeText="SETUP AKUN PELAJAR"
      maxWidth="620px"
    >
      <div>
        {/* Personalized Welcome Header */}
        <div
          style={{
            backgroundColor: 'var(--color-yellow)',
            border: '2px solid var(--color-black)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            boxShadow: '3px 3px 0 var(--color-black)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-yellow)',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <GraduationCap size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1rem',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}
            >
              HALO {userName || 'PELAJAR'}! 🎉
            </h4>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-black)', lineHeight: 1.35 }}>
              Mata pelajaran apa saja yang kamu pelajari semester ini? Pilih mapel di bawah atau tambahkan sendiri agar AMBASBIS dapat mengelompokkan tugasmu dengan rapi!
            </p>
          </div>
        </div>

        {/* Quick Presets / Shortcut Pills */}
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px'
            }}
          >
            <span
              style={{
                fontSize: '0.74rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em'
              }}
            >
              PILIH CEPAT BERDASARKAN JURUSAN:
            </span>
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
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
              Hapus Pilihan
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              type="button"
              onClick={() => applyPresetPackage(JURUSAN_PRESETS.IPA)}
              className="neo-btn neo-btn-white"
              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
            >
              🔬 Paket IPA / MIPA
            </button>
            <button
              type="button"
              onClick={() => applyPresetPackage(JURUSAN_PRESETS.IPS)}
              className="neo-btn neo-btn-white"
              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
            >
              📊 Paket IPS / Sosial
            </button>
            <button
              type="button"
              onClick={() => applyPresetPackage(JURUSAN_PRESETS.TEKNIK_IT)}
              className="neo-btn neo-btn-white"
              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
            >
              💻 Paket SMK / Informatika
            </button>
          </div>
        </div>

        {/* Add custom subject inline */}
        <form
          onSubmit={handleAddCustomSubject}
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px'
          }}
        >
          <input
            type="text"
            placeholder="Ketik mapel lain (misal: Robotika, Sejarah Peminatan, Seni Tari)..."
            value={customSubjectName}
            onChange={(e) => setCustomSubjectName(e.target.value)}
            className="neo-input"
            style={{ fontSize: '0.85rem', flex: 1, padding: '8px 12px' }}
          />
          <button
            type="submit"
            className="neo-btn neo-btn-primary"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            <Plus size={16} strokeWidth={3} />
            <span>+ TAMBAH</span>
          </button>
        </form>

        {/* Subject Cards Grid */}
        <div style={{ marginBottom: '18px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900
              }}
            >
              DAFTAR MATA PELAJARAN ({availableSubjects.length} PILIHAN):
            </span>
            <span
              style={{
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-yellow)',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 900,
                fontFamily: 'var(--font-heading)'
              }}
            >
              {selectedIds.size} TERPILIH
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '8px',
              maxHeight: '260px',
              overflowY: 'auto',
              padding: '6px',
              backgroundColor: '#FAF5EE',
              border: '2px solid var(--color-black)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            {availableSubjects.map((sub) => {
              const isSelected = selectedIds.has(sub.id);
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleToggle(sub.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: isSelected ? '2.5px solid var(--color-black)' : '2px dashed #999',
                    backgroundColor: isSelected ? sub.color : '#FFFFFF',
                    boxShadow: isSelected ? '2px 2px 0 var(--color-black)' : 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    color: 'var(--color-black)',
                    transform: isSelected ? 'translate(-1px, -1px)' : 'none',
                    transition: 'all 0.12s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{sub.icon || '📚'}</span>
                    <span
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {sub.name}
                    </span>
                  </div>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: '1.5px solid var(--color-black)',
                      backgroundColor: isSelected ? 'var(--color-black)' : '#FFF',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginLeft: '4px'
                    }}
                  >
                    {isSelected && <Check size={12} strokeWidth={4} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info & Action button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button
            variant="yellow"
            onClick={handleSaveAndContinue}
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem', padding: '12px' }}
          >
            <BookOpen size={18} strokeWidth={2.5} />
            <span>SIMPAN & LANJUT KE DASHBOARD ({selectedIds.size} MAPEL) →</span>
          </Button>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-muted)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Lewati untuk sekarang (Gunakan pilihan saat ini)
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
