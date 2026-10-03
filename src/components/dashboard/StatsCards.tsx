import React from 'react';
import { Card } from '../ui/Card';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export interface StatsCardsProps {
  activeCount: number;
  urgentCount: number;
  completedCount: number;
  onFilterClick?: (type: 'active' | 'urgent' | 'completed') => void;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  activeCount,
  urgentCount,
  completedCount,
  onFilterClick
}) => {
  const padZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}
    >
      {/* 1. Tugas Aktif - Yellow */}
      <Card
        variant="yellow"
        interactive={!!onFilterClick}
        onClick={() => onFilterClick && onFilterClick('active')}
        style={{ padding: '18px 20px', cursor: onFilterClick ? 'pointer' : 'default' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.82rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            TUGAS AKTIF
          </span>
          <div
            style={{
              background: '#FFFFFF',
              border: '2px solid var(--color-black)',
              borderRadius: '6px',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Clock size={16} strokeWidth={2.5} />
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            fontWeight: 900,
            lineHeight: 1,
            color: 'var(--color-black)'
          }}
        >
          {padZero(activeCount)}
        </div>
        <p style={{ fontSize: '0.78rem', fontWeight: 700, marginTop: '6px', opacity: 0.85 }}>
          Sedang dalam proses pengerjaan
        </p>
      </Card>

      {/* 2. Mendesak - Red */}
      <Card
        variant="white"
        interactive={!!onFilterClick}
        hasStar={urgentCount > 0}
        onClick={() => onFilterClick && onFilterClick('urgent')}
        style={{
          padding: '18px 20px',
          borderLeft: '10px solid var(--color-red)',
          cursor: onFilterClick ? 'pointer' : 'default'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.82rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-red)'
            }}
          >
            🔥 MENDESAK
          </span>
          <div
            style={{
              background: 'var(--color-red)',
              color: '#FFFFFF',
              border: '2px solid var(--color-black)',
              borderRadius: '6px',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <AlertCircle size={16} strokeWidth={2.5} />
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            fontWeight: 900,
            lineHeight: 1,
            color: 'var(--color-red)'
          }}
        >
          {padZero(urgentCount)}
        </div>
        <p style={{ fontSize: '0.78rem', fontWeight: 700, marginTop: '6px', color: 'var(--color-text-muted)' }}>
          Deadline dalam 24 jam ke depan
        </p>
      </Card>

      {/* 3. Selesai - Green */}
      <Card
        variant="green"
        interactive={!!onFilterClick}
        onClick={() => onFilterClick && onFilterClick('completed')}
        style={{ padding: '18px 20px', cursor: onFilterClick ? 'pointer' : 'default' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.82rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            SELESAI
          </span>
          <div
            style={{
              background: '#FFFFFF',
              border: '2px solid var(--color-black)',
              borderRadius: '6px',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CheckCircle2 size={16} strokeWidth={2.5} />
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            fontWeight: 900,
            lineHeight: 1,
            color: 'var(--color-black)'
          }}
        >
          {padZero(completedCount)}
        </div>
        <p style={{ fontSize: '0.78rem', fontWeight: 700, marginTop: '6px', opacity: 0.85 }}>
          Tugas sukses diselesaikan
        </p>
      </Card>
    </div>
  );
};
