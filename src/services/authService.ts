import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './firebase';

export interface AuthUserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export function formatAuthError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Terjadi kesalahan pada autentikasi.';
  }

  const err = error as { code?: string; message?: string };
  const code = err.code || '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Email atau password yang Anda masukkan salah.';
    case 'auth/user-not-found':
      return 'Akun dengan email ini belum terdaftar. Silakan buat akun baru.';
    case 'auth/email-already-in-use':
      return 'Email ini sudah terdaftar. Silakan masuk menggunakan kata sandi Anda.';
    case 'auth/invalid-email':
      return 'Format alamat email tidak valid.';
    case 'auth/weak-password':
      return 'Kata sandi terlalu pendek. Gunakan minimal 6 karakter.';
    case 'auth/popup-closed-by-user':
      return 'Jendela masuk Google ditutup sebelum proses selesai.';
    case 'auth/popup-blocked':
      return 'Jendela pop-up masuk diblokir oleh peramban. Harap izinkan pop-up.';
    case 'auth/operation-not-allowed':
      return 'Metode login ini belum diaktifkan di Firebase Console (Authentication > Sign-in method).';
    case 'auth/unauthorized-domain':
      return 'Domain ini belum diizinkan di Firebase Console. Tambahkan localhost di Authentication > Settings > Authorized domains.';
    case 'auth/network-request-failed':
      return 'Koneksi jaringan terputus. Periksa sambungan internet Anda.';
    default:
      return err.message || 'Terjadi kendala saat menghubungi server autentikasi.';
  }
}

export const authService = {
  isConfigured(): boolean {
    return isFirebaseConfigured && auth !== null;
  },

  async loginWithGoogle(): Promise<AuthUserInfo> {
    if (!auth) {
      throw new Error('Firebase belum dikonfigurasi. Harap masukkan API key di file .env.');
    }
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      id: user.uid,
      name: user.displayName || 'Pengguna Google',
      email: user.email || '',
      avatar: user.photoURL || undefined
    };
  },

  async loginWithEmail(email: string, pass: string): Promise<AuthUserInfo> {
    if (!auth) {
      throw new Error('Firebase belum dikonfigurasi. Harap masukkan API key di file .env.');
    }
    const result = await signInWithEmailAndPassword(auth, email, pass);
    const user = result.user;
    return {
      id: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Pelajar',
      email: user.email || '',
      avatar: user.photoURL || undefined
    };
  },

  async registerWithEmail(name: string, email: string, pass: string): Promise<AuthUserInfo> {
    if (!auth) {
      throw new Error('Firebase belum dikonfigurasi. Harap masukkan API key di file .env.');
    }
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    if (name) {
      try {
        await updateProfile(result.user, { displayName: name });
      } catch {
        // ignore name update error if any
      }
    }
    return {
      id: result.user.uid,
      name: name || result.user.email?.split('@')[0] || 'Pelajar',
      email: result.user.email || '',
      avatar: result.user.photoURL || undefined
    };
  },

  async logout(): Promise<void> {
    if (auth) {
      await signOut(auth);
    }
  },

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    if (!auth) {
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  }
};
