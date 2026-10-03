import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Subject } from '../../types';
import { NEO_SUBJECT_COLORS, SUBJECT_EMOJI_PRESETS } from '../../data/subjectPresets';
import { Sparkles, Palette, AlertCircle } from 'lucide-react';

export interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingSubjects: Subject[];
  onSaveSubject: (newSubject: Subject) => void;
}

export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  isOpen,
  onClose,
  existingSubjects,
  onSaveSubject
}) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(NEO_SUBJECT_COLORS[0].hex);
  const [icon, setIcon] = useState('📚');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Nama mata pelajaran wajib diisi.');
      return;
    }

    const isDuplicate = existingSubjects.some(
      s => s.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      setError(`Mata pelajaran "${trimmedName}" sudah ada dalam daftar.`);
      return;
    }

    const newSubject: Subject = {
      id: `subj_${Date.now()}_${trimmedName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name: trimmedName,
      color,
      icon: icon.trim() || '📚'
    };

    onSaveSubject(newSubject);
    setName('');
    setError(null);
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="TAMBAH MATA PELAJARAN"
      badgeText="MAPEL BARU"
      maxWidth="480px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {error && (
          <div
            style={{
              backgroundColor: '#FFE5E3',
              border: '2px solid var(--color-black)',
              borderRadius: '8px',
              padding: '10px 14px',
              boxShadow: '3px 3px 0 var(--color-black)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: 'var(--color-red)'
            }}
          >
            <AlertCircle size={18} strokeWidth={2.5} />
            <span>{error}</span>
          </div>
        )}

        {/* Input Nama Mapel */}
        <Input
          label="NAMA MATA PELAJARAN *"
          placeholder="Contoh: Sejarah Indonesia, Seni Musik, PKWU..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          required
        />

        {/* Pemilihan Warna Tema Neo-Brutalist */}
        <div>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.85rem',
              marginBottom: '8px'
            }}
          >
            <Palette size={16} />
            <span>PILIH WARNA TEMA</span>
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '8px'
            }}
          >
            {NEO_SUBJECT_COLORS.map((item) => {
              const isSelected = color === item.hex;
              return (
                <button
                  key={item.hex}
                  type="button"
                  title={item.label}
                  onClick={() => setColor(item.hex)}
                  style={{
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: item.hex,
                    border: isSelected ? '3px solid var(--color-black)' : '2px solid var(--color-black)',
                    boxShadow: isSelected ? '2px 2px 0 var(--color-black)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isSelected && (
                    <span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#000000' }}>
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pemilihan Emoji / Ikon */}
        <div>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.85rem',
              marginBottom: '8px'
            }}
          >
            <Sparkles size={16} />
            <span>PILIH IKON / EMOJI</span>
          </label>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '8px',
              maxHeight: '110px',
              overflowY: 'auto',
              padding: '4px',
              border: '2px dashed var(--color-black)',
              borderRadius: '8px',
              backgroundColor: '#FAF5EE'
            }}
          >
            {SUBJECT_EMOJI_PRESETS.map((emoji) => {
              const isSelected = icon === emoji;
              return (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    backgroundColor: isSelected ? 'var(--color-yellow)' : 'var(--color-white)',
                    border: isSelected ? '2px solid var(--color-black)' : '1px solid #CCC',
                    boxShadow: isSelected ? '2px 2px 0 var(--color-black)' : 'none',
                    cursor: 'pointer',
                    fontSize: '1.15rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.1s'
                  }}
                >
                  {emoji}
                </button>
              );
            })}
          </div>

          {/* Atau input emoji kustom */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
              Atau ketik emoji kustom:
            </span>
            <input
              type="text"
              maxLength={4}
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="neo-input"
              style={{ width: '60px', textAlign: 'center', padding: '4px 6px', fontSize: '1rem' }}
            />
          </div>
        </div>

        {/* Live Preview Neo-Brutalist Badge */}
        <div
          style={{
            backgroundColor: '#FAF7EE',
            border: '2px solid var(--color-black)',
            borderRadius: '8px',
            padding: '12px',
            marginTop: '4px'
          }}
        >
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text-muted)',
              marginBottom: '6px'
            }}
          >
            PREVIEW TAMPILAN MAPEL:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: color,
                border: '2px solid var(--color-black)',
                borderRadius: '8px',
                padding: '6px 14px',
                boxShadow: '3px 3px 0 var(--color-black)',
                fontWeight: 900,
                fontSize: '0.9rem',
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-black)'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{icon || '📚'}</span>
              <span>{name.trim() || 'Nama Mata Pelajaran'}</span>
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              ← Tampil di card & filter
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <Button
            type="button"
            variant="white"
            onClick={onClose}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            BATAL
          </Button>
          <Button
            type="submit"
            variant="primary"
            style={{ flex: 2, justifyContent: 'center' }}
          >
            + SIMPAN MATA PELAJARAN
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
