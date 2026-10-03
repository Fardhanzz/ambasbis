import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Sparkles, CheckCircle2, AlertTriangle, LogOut, Info, Loader2 } from 'lucide-react';
import { authService, formatAuthError } from '../../services/authService';
import type { UserProfile } from '../../types';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string, email: string, avatar?: string, userId?: string, isNewUser?: boolean) => void;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentUser,
  onLogout
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isConfigured = authService.isConfigured();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setNotice(null);

    if (!email || !password) {
      setErrorMessage('Harap isi email dan password.');
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password minimal 6 karakter.');
      return;
    }

    setIsLoading(true);

    try {
      if (isConfigured) {
        if (isRegister) {
          const user = await authService.registerWithEmail(name, email, password);
          setNotice(`Selamat datang, ${user.name}! Akun Firebase berhasil dibuat.`);
          setTimeout(() => {
            onSuccess(user.name, user.email, user.avatar, user.id, true);
            setIsLoading(false);
            onClose();
          }, 800);
        } else {
          const user = await authService.loginWithEmail(email, password);
          setNotice(`Selamat datang kembali, ${user.name}!`);
          setTimeout(() => {
            onSuccess(user.name, user.email, user.avatar, user.id, false);
            setIsLoading(false);
            onClose();
          }, 800);
        }
      } else {
        // Fallback demo mode when Firebase keys are not yet configured in .env
        setNotice('Mode Demo: Berhasil masuk tanpa Firebase!');
        setTimeout(() => {
          onSuccess(name || email.split('@')[0] || 'Pelajar', email, undefined, 'usr_guest', false);
          setIsLoading(false);
          onClose();
        }, 800);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(formatAuthError(err));
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage(null);
    setNotice(null);
    setIsLoading(true);

    try {
      if (isConfigured) {
        const user = await authService.loginWithGoogle();
        setNotice(`Berhasil masuk via Google! Halo, ${user.name}! 🎉`);
        setTimeout(() => {
          onSuccess(user.name, user.email, user.avatar, user.id, false);
          setIsLoading(false);
          onClose();
        }, 800);
      } else {
        // Fallback demo when .env has no API keys
        setErrorMessage(
          'Firebase belum dihubungkan dengan API Key asli di file .env. Anda dapat mengonfigurasinya atau menggunakan Mode Demo di bawah.'
        );
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(formatAuthError(err));
    }
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setErrorMessage(null);
    setNotice('Masuk dalam Mode Demo Pelajar...');
    setTimeout(() => {
      onSuccess('Fardhan (Demo Pelajar)', 'fardhan.student@ambasbis.edu', undefined, 'usr_guest', false);
      setIsLoading(false);
      onClose();
    }, 600);
  };

  const handleUserLogout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      if (onLogout) {
        onLogout();
      }
      setNotice('Berhasil keluar dari akun.');
      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 500);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(formatAuthError(err));
    }
  };

  // If user is already logged in, show user profile card with Logout option
  const isLoggedIn = Boolean(currentUser && currentUser.email && currentUser.email !== '');

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={
        isLoggedIn
          ? 'PROFIL PENGGUNA'
          : isRegister
          ? 'BUAT AKUN BARU'
          : 'MASUK KE AMBASBIS'
      }
      badgeText={isLoggedIn ? 'SESI AKTIF' : 'GOOGLE FIREBASE'}
      maxWidth="480px"
    >
      <div>
        {/* Header slogan */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-yellow)',
              border: '2px solid var(--color-black)',
              borderRadius: '9999px',
              padding: '2px 10px',
              fontSize: '0.75rem',
              fontWeight: 900,
              fontFamily: 'var(--font-heading)',
              boxShadow: '2px 2px 0 var(--color-black)',
              marginBottom: '6px'
            }}
          >
            <Sparkles size={14} />
            <span>STUDENT COMMAND CENTER</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            {isLoggedIn ? 'KELOLA AKUN ANDA' : 'ATUR TUGASMU. TAKLUKKAN DEADLINE.'}
          </h3>
        </div>

        {/* Success Alert */}
        {notice && (
          <div
            style={{
              backgroundColor: 'var(--color-green)',
              border: '2px solid var(--color-black)',
              borderRadius: '8px',
              padding: '10px 14px',
              boxShadow: '3px 3px 0 var(--color-black)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 800,
              fontSize: '0.88rem'
            }}
          >
            <CheckCircle2 size={18} strokeWidth={3} />
            <span>{notice}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              backgroundColor: '#FFE5E5',
              border: '2px solid var(--color-red)',
              borderRadius: '8px',
              padding: '10px 14px',
              boxShadow: '3px 3px 0 var(--color-black)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: 'var(--color-black)'
            }}
          >
            <AlertTriangle size={18} color="var(--color-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Firebase Config Status Alert when not configured */}
        {!isConfigured && !isLoggedIn && (
          <div
            style={{
              backgroundColor: '#FFF2D9',
              border: '2px solid var(--color-black)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              boxShadow: '3px 3px 0 var(--color-black)',
              fontSize: '0.8rem',
              lineHeight: 1.4
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, marginBottom: '4px' }}>
              <Info size={16} />
              <span>STATUS FIREBASE AUTH: BELUM TERHUBUNG</span>
            </div>
            <p style={{ margin: 0, fontWeight: 600 }}>
              Konfigurasi Firebase di file <code>.env</code> masih kosong. Anda dapat mengisi kredensial Firebase Console untuk login asli, atau gunakan <strong>Mode Demo</strong> untuk pengujian langsung.
            </p>
          </div>
        )}

        {/* IF USER IS CURRENTLY LOGGED IN */}
        {isLoggedIn ? (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                backgroundColor: 'var(--color-bg)',
                border: '2px solid var(--color-black)',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '3px 3px 0 var(--color-black)',
                marginBottom: '18px'
              }}
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '8px',
                    border: '2px solid var(--color-black)',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-purple)',
                    border: '2px solid var(--color-black)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1.4rem'
                  }}
                >
                  {currentUser?.name?.charAt(0).toUpperCase() || 'P'}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
                    {currentUser?.name}
                  </h4>
                  <span
                    style={{
                      backgroundColor: 'var(--color-green)',
                      fontSize: '0.65rem',
                      fontWeight: 900,
                      padding: '2px 6px',
                      borderRadius: '999px',
                      border: '1px solid var(--color-black)'
                    }}
                  >
                    ONLINE
                  </span>
                </div>
                <p
                  style={{
                    margin: '3px 0 0 0',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    wordBreak: 'break-all'
                  }}
                >
                  {currentUser?.email}
                </p>
                <p
                  style={{
                    margin: '2px 0 0 0',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--color-black)'
                  }}
                >
                  Zona Waktu: {currentUser?.timezone || 'Asia/Jakarta'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button
                variant="primary"
                onClick={handleUserLogout}
                disabled={isLoading}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-red)',
                  color: 'var(--color-white)',
                  border: 'var(--border-thick)'
                }}
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <LogOut size={16} />
                    <span>KELUAR DARI AKUN (LOGOUT)</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          /* IF USER IS NOT LOGGED IN */
          <div>
            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="neo-btn neo-btn-white"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '0.95rem',
                backgroundColor: 'var(--color-white)',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Loader2 size={18} className="animate-spin" />
                  <span>MEMPROSES KE GOOGLE...</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.72-2.1-6.66-4.92H1.34v3.13C3.34 21.36 7.36 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.34 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.59H1.34C.49 8.28 0 10.1 0 12s.49 3.72 1.34 5.41l4-3.13z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.34 2.64 1.34 6.59l4 3.13c.94-2.82 3.56-4.97 6.66-4.97z"
                    />
                  </svg>
                  <span>LANJUTKAN DENGAN GOOGLE</span>
                </div>
              )}
            </button>

            {/* OR Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '16px 0',
                gap: '10px',
                fontWeight: 800,
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-heading)'
              }}
            >
              <div style={{ flex: 1, height: '2px', backgroundColor: 'var(--color-black)' }} />
              <span>ATAU DENGAN EMAIL</span>
              <div style={{ flex: 1, height: '2px', backgroundColor: 'var(--color-black)' }} />
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {isRegister && (
                <Input
                  label="NAMA LENGKAP"
                  placeholder="Contoh: Fardhan Pratama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              )}

              <Input
                type="email"
                label="EMAIL PELAJAR / PRIBADI"
                placeholder="kamu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />

              <Input
                type="password"
                label="PASSWORD"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />

              {isRegister && (
                <Input
                  type="password"
                  label="KONFIRMASI PASSWORD"
                  placeholder="Ketik ulang password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              )}

              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : isRegister ? (
                  'BUAT AKUN DENGAN EMAIL →'
                ) : (
                  'MASUK DENGAN EMAIL →'
                )}
              </Button>
            </form>

            {/* Demo Option Button if not configured */}
            {!isConfigured && (
              <div style={{ marginTop: '12px' }}>
                <Button
                  variant="white"
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-cream)',
                    fontSize: '0.8rem'
                  }}
                >
                  ✦ MASUK MODE DEMO (OFFLINE / TANPA API KEY)
                </Button>
              </div>
            )}

            {/* Switch Login / Register Footer */}
            <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.85rem', fontWeight: 700 }}>
              {isRegister ? (
                <span>
                  Sudah punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(false);
                      setErrorMessage(null);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-red)',
                      fontWeight: 900,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    MASUK DI SINI
                  </button>
                </span>
              ) : (
                <span>
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(true);
                      setErrorMessage(null);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-red)',
                      fontWeight: 900,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    DAFTAR SEKARANG
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};
