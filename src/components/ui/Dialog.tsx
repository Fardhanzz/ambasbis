import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badgeText?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  badgeText,
  children,
  maxWidth = '580px'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="neo-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="neo-dialog-content"
        style={{ maxWidth }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: 'var(--border-thick)',
            backgroundColor: '#FFFFFF'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {badgeText && (
              <span
                style={{
                  background: 'var(--color-yellow)',
                  border: 'var(--border-medium)',
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 8px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900
                }}
              >
                {badgeText}
              </span>
            )}
            <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase' }}>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            style={{
              background: '#FFFFFF',
              border: 'var(--border-medium)',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '2px 2px 0px var(--color-black)'
            }}
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
