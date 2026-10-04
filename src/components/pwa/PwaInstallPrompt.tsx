import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Share, PlusSquare } from 'lucide-react';
import { Button } from '../ui/Button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  });
  const [isIos] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  });
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    return localStorage.getItem('ambasbis_pwa_dismissed') === 'true';
  });

  useEffect(() => {
    // Listen for Chrome / Android beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('ambasbis_pwa_dismissed', 'true');
  };

  // If already installed, or user dismissed, or not ready to prompt
  if (isInstalled || isDismissed) {
    return null;
  }

  // Only show if we have an install prompt (Android/Desktop) or on iOS Safari
  if (!deferredPrompt && !isIos) {
    return null;
  }

  return (
    <>
      <div
        className="pwa-install-banner"
        style={{
          background: 'var(--color-yellow)',
          border: 'var(--border-thick)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          marginBottom: '20px',
          boxShadow: '4px 4px 0 var(--color-black)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 280px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--color-red)',
              borderRadius: '10px',
              border: '2px solid var(--color-black)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-white)',
              boxShadow: '2px 2px 0 var(--color-black)',
              flexShrink: 0
            }}
          >
            <Smartphone size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                marginBottom: '2px'
              }}
            >
              Pasang AMBASBIS di Layar Ponsel
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-black)', fontWeight: 600 }}>
              Gunakan seperti aplikasi native di HP, akses instan tanpa peramban & offline ready!
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            variant="primary"
            size="sm"
            icon={<Download size={16} strokeWidth={3} />}
            onClick={handleInstallClick}
          >
            {isIos ? 'CARA PASANG' : 'PASANG SEKARANG'}
          </Button>
          <button
            onClick={handleDismiss}
            aria-label="Tutup Banner PWA"
            style={{
              background: 'var(--color-white)',
              border: '2px solid var(--color-black)',
              borderRadius: '6px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '2px 2px 0 var(--color-black)'
            }}
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Modal panduan khusus iOS */}
      {showIosGuide && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(23, 19, 19, 0.7)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setShowIosGuide(false)}
        >
          <div
            style={{
              background: 'var(--color-bg)',
              border: 'var(--border-thick)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '380px',
              width: '100%',
              padding: '24px',
              boxShadow: 'var(--shadow-dialog)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 900 }}>
                📲 Pasang di iPhone/iPad
              </h3>
              <button
                onClick={() => setShowIosGuide(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            <ol
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                paddingLeft: '20px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-black)'
              }}
            >
              <li>
                Buka situs ini di peramban <strong>Safari</strong> ponsel Anda.
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Share size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Ketuk tombol <strong>Bagikan (Share)</strong> di bilah bawah peramban Safari.
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <PlusSquare size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Geser ke bawah dan pilih <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong>.
                </span>
              </li>
              <li>
                Ketuk <strong>Tambah</strong> di pojok kanan atas. Ikon AMBASBIS akan langsung terpasang di menu ponselmu!
              </li>
            </ol>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <Button variant="yellow" size="sm" onClick={() => setShowIosGuide(false)}>
                MENGERTI
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
