// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from "firebase/app-check";
import { getAnalytics, Analytics } from "firebase/analytics";

/**
 * Firebase Configuration
 * Updated to match your exact Firebase Console settings.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "growshare-capital.firebaseapp.com",
  projectId: "growshare-capital",
  storageBucket: "growshare-capital.firebasestorage.app",
  messagingSenderId: "655144442348",
  appId: "1:655144442348:web:7f6f658c4139777fb548c9",
  measurementId: "G-GWP7H9EE1P"
};

// Singleton instances
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;
let appCheck: AppCheck | null = null;

/**
 * Initialization Logic
 * Handles SSR safety and App Check for Cloud Workstations
 */
if (typeof window === 'undefined') {
    // SERVER-SIDE (Build Phase): Export empty objects to prevent build crashes
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
    storage = {} as FirebaseStorage;
} else {
    // CLIENT-SIDE (Browser)
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    try {
        analytics = getAnalytics(app);
    } catch (e) {
        console.warn("Analytics failed to initialize:", e);
    }
    
    // Initialize App Check
    const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (reCaptchaKey) {
        // Set the debug token for localhost development
        if (process.env.NODE_ENV === 'development') {
            // @ts-ignore
            self.FIREBASE_APPCHECK_DEBUG_TOKEN = "a087796d-3465-4f36-9769-952467575191";
        }
        
        try {
            appCheck = initializeAppCheck(app, {
                provider: new ReCaptchaV3Provider(reCaptchaKey),
                isTokenAutoRefreshEnabled: true
            });
             console.log("App Check initialized successfully.");
        } catch(e) {
            console.error("App Check initialization error:", e)
        }
    } else {
        console.warn("ReCaptcha site key not found. App Check is not enabled.");
    }
}

export { app, auth, db, storage, appCheck, analytics };
