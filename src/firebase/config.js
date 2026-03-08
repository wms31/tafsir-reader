// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
// To connect to Firebase:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (or use existing)
// 3. Go to Project Settings > General > Your apps > Web app
// 4. Register app and copy the firebaseConfig object
// 5. Copy .env.example to .env and fill in your values
//
// For deployment:
// - Enable Firebase Hosting in console
// - Enable Firebase Storage in console
// - Enable Firestore in console (Native mode)
// ============================================================

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
