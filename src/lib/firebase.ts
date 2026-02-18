import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from "firebase/app-check";
import { getAnalytics, Analytics } from "firebase/analytics";

/**
 * Firebase Configuration
 * Reads from .env.local variables
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // Use the one from env or fallback to your hardcoded ID
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-RDG7V9Z3K6" 
};

// Singleton instances
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;
let appCheck: AppCheck | null = null;

if (typeof window === 'undefined') {
    // SERVER-SIDE (Next.js Build/Server)
    // Return empty objects to prevent crashes during build
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
    storage = {} as FirebaseStorage;
} else {
    // CLIENT-SIDE (Browser)
    // Initialize Firebase only if it hasn't been initialized yet
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Initialize Analytics (Safe Mode)
    if (firebaseConfig.measurementId) {
        try {
            analytics = getAnalytics(app);
        } catch (e) {
            console.warn("Analytics failed to initialize (likely blocked by browser):", e);
        }
    }
    
    // Initialize App Check
    const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (reCaptchaKey) {
        // Set the debug token for localhost development
        if (process.env.NODE_ENV === 'development') {
            // @ts-ignore
            self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NEXT_PUBLIC_APP_CHECK_DEBUG_TOKEN;
        }
        
        try {
            appCheck = initializeAppCheck(app, {
                provider: new ReCaptchaV3Provider(reCaptchaKey),
                isTokenAutoRefreshEnabled: true
            });
            console.log("App Check initialized successfully.");
        } catch(e) {
            console.error("App Check initialization error:", e);
        }
    } else {
        console.warn("ReCaptcha site key not found in .env. App Check is disabled.");
    }
}

export { app, auth, db, storage, appCheck, analytics };