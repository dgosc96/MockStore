import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  signOut as _signOut,
  validatePassword as _validatePassword,
  updateCurrentUser as _updateCurrentUser,
  type User,
  type NextOrObserver,
} from 'firebase/auth';

export type { User as firebaseUser } from 'firebase/auth';

const fbApp = initializeApp({
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
});

export const auth = getAuth(fbApp);

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
) {
  console.log('FIREBASE: signInWithEmailAndPassword');
  return _signInWithEmailAndPassword(auth, email, password);
}

export async function createUserWithEmailAndPassword(
  email: string,
  password: string,
) {
  console.log('FIREBASE: createUserWithEmailAndPassword');
  return _createUserWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  _signOut(auth);
}

export function onIdTokenChanged(nextOrObserver: NextOrObserver<User>) {
  return _onIdTokenChanged(auth, nextOrObserver);
}

export function onAuthStateChanged(nextOrObserver: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, nextOrObserver);
}

export async function validatePassword(password: string) {
  return _validatePassword(auth, password);
}

export async function updateCurrentUser() {
  return _updateCurrentUser(auth, auth.currentUser);
}
