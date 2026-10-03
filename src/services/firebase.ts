import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || '';
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '';
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || '';
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '';
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '';
const appId = import.meta.env.VITE_FIREBASE_APP_ID || '';

export const isFirebaseConfigured = Boolean(
  apiKey &&
  apiKey !== 'your_api_key_here' &&
  !apiKey.includes('placeholder') &&
  projectId &&
  projectId !== 'your_project_id'
);

export const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.error('Gagal menginisialisasi Firebase:', error);
  }
}

export const googleProvider = new GoogleAuthProvider();
// Request email and profile
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({ prompt: 'select_account' });

export { app, auth };


