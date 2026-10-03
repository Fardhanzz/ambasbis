import React from 'react';
import { Button } from '../ui/Button';
import { UserPlus, Plus, Bell, Calendar, Sparkles } from 'lucide-react';

export interface GuestEmptyStateProps {
  onOpenAuth: () => void;
  onOpenAddTask: () => void;
}

export const GuestEmptyState: React.FC<GuestEmptyStateProps> = ({
  onOpenAuth,
  onOpenAddTask
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        marginBottom: '32px'
      }}
    >
      {/* Main Welcome Hero Card */}
      <div
        className="neo-card"
        style={{
          backgroundColor: '#FFFFFF',
          padding: '36px 28px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top Tag */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          <span
            style={{
              backgroundColor: 'var(--color-yellow)',
              border: '2px solid var(--color-black)',
              borderRadius: '9999px',
              padding: '4px 14px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '0.8rem',
              boxShadow: '2px 2px 0 var(--color-black)',
              letterSpacing: '0.04em'
            }}
          >
            👋 SELAMAT DATANG DI AMBASBIS
          </span>
        </div>

        {/* Neo-brutalist Empty State Vector Graphic */}
        <div
          style={{
            margin: '0 auto 20px auto',
            maxWidth: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg
            viewBox="0 0 200 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: 'auto', filter: 'drop-shadow(4px 4px 0px #171313)' }}
          >
            {/* Background Accent Card */}
            <rect x="25" y="25" width="130" height="115" rx="12" fill="#B59AFF" stroke="#171313" strokeWidth="4" />
            <rect x="40" y="40" width="40" height="8" rx="4" fill="#171313" />
            <rect x="40" y="55" width="60" height="6" rx="3" fill="#FFFFFF" stroke="#171313" strokeWidth="2" />
            <rect x="40" y="68" width="75" height="6" rx="3" fill="#FFFFFF" stroke="#171313" strokeWidth="2" />

            {/* Front Card (Task Board / Notebook) */}
            <rect x="45" y="15" width="135" height="125" rx="12" fill="#FFF7F2" stroke="#171313" strokeWidth="4" />
            <rect x="45" y="15" width="135" height="28" rx="12" fill="#FFD447" stroke="#171313" strokeWidth="4" />
            
            {/* Binder rings */}
            <circle cx="70" cy="15" r="5" fill="#FFFFFF" stroke="#171313" strokeWidth="3" />
            <circle cx="112" cy="15" r="5" fill="#FFFFFF" stroke="#171313" strokeWidth="3" />
            <circle cx="154" cy="15" r="5" fill="#FFFFFF" stroke="#171313" strokeWidth="3" />

            {/* Checklist items */}
            {/* Item 1 */}
            <rect x="62" y="56" width="14" height="14" rx="4" fill="#A8E063" stroke="#171313" strokeWidth="2.5" />
            <path d="M65 63L68 66L73 60" stroke="#171313" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="84" y="60" width="78" height="7" rx="3.5" fill="#171313" />

            {/* Item 2 */}
            <rect x="62" y="80" width="14" height="14" rx="4" fill="#FFFFFF" stroke="#171313" strokeWidth="2.5" />
            <rect x="84" y="84" width="62" height="7" rx="3.5" fill="#D8CCC4" />

            {/* Item 3 */}
            <rect x="62" y="104" width="14" height="14" rx="4" fill="#FFFFFF" stroke="#171313" strokeWidth="2.5" />
            <rect x="84" y="108" width="70" height="7" rx="3.5" fill="#D8CCC4" />

            {/* Floating Sparkle / Badge */}
            <g transform="translate(145, 100)">
              <circle cx="16" cy="16" r="16" fill="#E94B43" stroke="#171313" strokeWidth="3" />
              <path d="M16 8V24M8 16H24" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            marginBottom: '10px',
            color: 'var(--color-black)'
          }}
        >
          Daftar Tugas Masih Bersih & Kosong
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            maxWidth: '520px',
            margin: '0 auto 24px auto',
            lineHeight: 1.55
          }}
        >
          Belum ada akun yang masuk di peramban ini. Buat akun baru atau masuk untuk menyimpan tugasmu ke cloud, atau kamu bisa mencoba membuat tugas langsung sebagai tamu!
        </p>

        {/* Primary Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <Button
            variant="yellow"
            size="lg"
            icon={<UserPlus size={18} strokeWidth={2.5} />}
            onClick={onOpenAuth}
            style={{ minWidth: '220px' }}
          >
            DAFTAR / MASUK AKUN
          </Button>

          <Button
            variant="white"
            size="lg"
            icon={<Plus size={18} strokeWidth={3} />}
            onClick={onOpenAddTask}
            style={{ minWidth: '220px' }}
          >
            COBA BUAT TUGAS TAMU
          </Button>
        </div>
      </div>

      {/* Feature Highlight Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}
      >
        <div
          className="neo-card"
          style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-yellow)',
              border: '2px solid var(--color-black)',
              borderRadius: '10px',
              padding: '10px',
              boxShadow: '2px 2px 0 var(--color-black)',
              flexShrink: 0
            }}
          >
            <Bell size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                marginBottom: '4px'
              }}
            >
              Pengingat H-3, H-1, Hari H
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.45, fontWeight: 600 }}>
              Sistem pengingat cerdas otomatis menghitung sisa waktu tugas sekolahmu agar tidak ada deadline yang terlewat.
            </p>
          </div>
        </div>

        <div
          className="neo-card"
          style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-blue)',
              border: '2px solid var(--color-black)',
              borderRadius: '10px',
              padding: '10px',
              boxShadow: '2px 2px 0 var(--color-black)',
              flexShrink: 0
            }}
          >
            <Calendar size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                marginBottom: '4px'
              }}
            >
              Kalender Visual Interaktif
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.45, fontWeight: 600 }}>
              Pantau jadwal tenggat waktu dalam kalender bulanan responsif yang nyaman dilihat baik di HP maupun komputer.
            </p>
          </div>
        </div>

        <div
          className="neo-card"
          style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-purple)',
              border: '2px solid var(--color-black)',
              borderRadius: '10px',
              padding: '10px',
              boxShadow: '2px 2px 0 var(--color-black)',
              flexShrink: 0
            }}
          >
            <Sparkles size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                marginBottom: '4px'
              }}
            >
              Kategori & Subtask Rapi
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.45, fontWeight: 600 }}>
              Pecah tugas besar menjadi langkah-langkah kecil yang dapat dicentang satu per satu hingga selesai tuntas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
