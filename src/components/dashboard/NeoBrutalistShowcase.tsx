import React from 'react';
import { Check, AlertTriangle, Star } from 'lucide-react';

export const NeoBrutalistShowcase: React.FC = () => {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Top Banner Tag matching visual-reference.png */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              backgroundColor: 'var(--color-red)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '2.5px solid var(--color-black)',
              boxShadow: '2.5px 2.5px 0 var(--color-black)'
            }}
          >
            02 NEOBRUTALISM
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.85rem',
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--color-black)',
            padding: '3px 10px',
            borderRadius: '9999px',
            boxShadow: '2px 2px 0 var(--color-black)'
          }}
        >
          REF / V2
        </span>
      </div>

      {/* Main Title & Description matching visual reference */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'var(--color-red)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '8px'
          }}
        >
          Berani & mentah
        </h1>
        <p
          style={{
            fontSize: '1.05rem',
            fontWeight: 600,
            color: 'var(--color-black)',
            lineHeight: 1.4
          }}
        >
          Garis tebal hitam, warna mencolok, bayangan keras. Tampil percaya diri dan tidak malu-malu.
        </p>
      </div>

      {/* Hero Visual Card matching the illustration in visual-reference.png */}
      <div
        style={{
          backgroundColor: '#FDEFE4',
          border: 'var(--border-thick)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          padding: '36px 24px',
          marginBottom: '28px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {/* The Card Component from visual-reference.png */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '3.5px solid #171313',
            borderRadius: '16px',
            boxShadow: '8px 8px 0px #171313',
            width: '100%',
            maxWidth: '440px',
            padding: '24px',
            position: 'relative'
          }}
        >
          {/* Top-Right Red 5-pointed Star Sticker */}
          <div
            style={{
              position: 'absolute',
              top: '-16px',
              right: '-16px',
              width: '42px',
              height: '42px',
              backgroundColor: 'var(--color-red)',
              border: '3px solid #171313',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(12deg)',
              boxShadow: '3px 3px 0 #171313'
            }}
          >
            <Star size={24} fill="#FFD447" stroke="#171313" strokeWidth={2.5} />
          </div>

          {/* User profile header box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#FAF5FF',
                border: '3px solid #171313',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#171313'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  height: '14px',
                  backgroundColor: '#171313',
                  borderRadius: '4px',
                  width: '65%',
                  marginBottom: '6px'
                }}
              />
              <div
                style={{
                  height: '10px',
                  backgroundColor: 'var(--color-purple)',
                  borderRadius: '3px',
                  width: '40%'
                }}
              />
            </div>
          </div>

          {/* Yellow Primary Stat Box (1.265 LANGKAH HARI INI) */}
          <div
            style={{
              backgroundColor: 'var(--color-yellow)',
              border: '3px solid #171313',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '14px',
              boxShadow: '4px 4px 0 #171313'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.4rem',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                marginBottom: '4px'
              }}
            >
              1.265
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.78rem',
                letterSpacing: '0.04em'
              }}
            >
              LANGKAH HARI INI
            </div>
          </div>

          {/* Green & Blue Sub-stats row (61 kkal & 8.5 jam) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div
              style={{
                backgroundColor: 'var(--color-green)',
                border: '3px solid #171313',
                borderRadius: '10px',
                padding: '12px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.25rem',
                boxShadow: '3px 3px 0 #171313',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              61 kkal
            </div>
            <div
              style={{
                backgroundColor: 'var(--color-blue)',
                border: '3px solid #171313',
                borderRadius: '10px',
                padding: '12px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.25rem',
                boxShadow: '3px 3px 0 #171313',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              8.5 jam
            </div>
          </div>

          {/* Red Action Button (LIHAT DETAIL) */}
          <button
            className="neo-btn neo-btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center' }}
          >
            LIHAT DETAIL
          </button>
        </div>
      </div>

      {/* 3 Pill Badges matching visual-reference.png */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '28px'
        }}
      >
        <span
          className="neo-badge"
          style={{ fontSize: '0.9rem', padding: '8px 18px', backgroundColor: '#FFFFFF' }}
        >
          <span style={{ fontSize: '1.1rem' }}>☐</span>
          <span>Border tebal</span>
        </span>

        <span
          className="neo-badge"
          style={{ fontSize: '0.9rem', padding: '8px 18px', backgroundColor: '#FFFFFF' }}
        >
          <span style={{ fontSize: '1.1rem' }}>❑</span>
          <span>Bayangan keras</span>
        </span>

        <span
          className="neo-badge"
          style={{ fontSize: '0.9rem', padding: '8px 18px', backgroundColor: '#FFFFFF' }}
        >
          <span style={{ fontSize: '1.1rem' }}>⁖</span>
          <span>Warna mencolok</span>
        </span>
      </div>

      {/* Callout section matching visual reference */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        {/* COCOK UNTUK */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2.5px solid var(--color-black)',
            borderRadius: '14px',
            padding: '18px',
            boxShadow: '4px 4px 0 var(--color-black)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '0.85rem',
              color: '#2B823D',
              marginBottom: '6px'
            }}
          >
            <Check size={18} strokeWidth={3} />
            <span>COCOK UNTUK</span>
          </div>
          <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-black)', lineHeight: 1.4 }}>
            Brand muda, produk playful, portfolio, dan landing page yang ingin diingat.
          </p>
        </div>

        {/* PERHATIKAN */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2.5px solid var(--color-black)',
            borderRadius: '14px',
            padding: '18px',
            boxShadow: '4px 4px 0 var(--color-black)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '0.85rem',
              color: '#D97706',
              marginBottom: '6px'
            }}
          >
            <AlertTriangle size={18} strokeWidth={3} />
            <span>PERHATIKAN</span>
          </div>
          <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-black)', lineHeight: 1.4 }}>
            Bisa terasa ramai. Batasi jumlah warna agar tidak melelahkan mata.
          </p>
        </div>
      </div>
    </div>
  );
};
