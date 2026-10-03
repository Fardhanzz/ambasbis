import React from 'react';
import { Calendar as CalendarIcon, Flame } from 'lucide-react';

export interface GreetingProps {
  userName: string;
  urgentCount: number;
}

export const Greeting: React.FC<GreetingProps> = ({ userName, urgentCount }) => {
  const now = React.useMemo(() => new Date(), []);

  const getGreetingTime = () => {
    const hour = now.getHours();
    if (hour >= 4 && hour < 11) return 'Selamat pagi';
    if (hour >= 11 && hour < 15) return 'Selamat siang';
    if (hour >= 15 && hour < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  const todayFormatted = React.useMemo(() => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(now);
  }, [now]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span
            style={{
              backgroundColor: 'var(--color-yellow)',
              border: '2px solid var(--color-black)',
              borderRadius: '9999px',
              padding: '2px 10px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.75rem',
              boxShadow: '2px 2px 0 var(--color-black)'
            }}
          >
            {getGreetingTime()} ☕
          </span>
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em'
          }}
        >
          HEY, {userName}! 👋
        </h1>
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            marginTop: '6px'
          }}
        >
          Mari bereskan tugasmu. Taklukkan deadline hari ini.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--color-white)',
            border: 'var(--border-thick)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 14px',
            boxShadow: '3px 3px 0 var(--color-black)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.85rem'
          }}
        >
          <CalendarIcon size={16} strokeWidth={2.5} />
          <span>{todayFormatted}</span>
        </div>

        {urgentCount > 0 && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--color-red)',
              color: 'var(--color-white)',
              border: '2px solid var(--color-black)',
              borderRadius: '9999px',
              padding: '4px 12px',
              boxShadow: '2px 2px 0 var(--color-black)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.75rem'
            }}
          >
            <Flame size={14} fill="#FFFFFF" />
            <span>{urgentCount} TUGAS MENDESAK</span>
          </div>
        )}
      </div>
    </div>
  );
};
