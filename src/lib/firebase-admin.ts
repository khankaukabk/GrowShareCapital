import "server-only";
import * as admin from "firebase-admin"; 
import { getFirestore } from "firebase-admin/firestore";

declare global {
  var firebaseAdminApp: admin.app.App | undefined;
}

let app: admin.app.App;

// 1. Initialize the App (Singleton Pattern)
if (!global.firebaseAdminApp) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  try {
    if (serviceAccountKey) {
      // A. Use provided Service Account String (Deployment / Env Var)
      const cleanKey = serviceAccountKey.replace(/\\n/g, '\n');
      const serviceAccount = JSON.parse(cleanKey);
      
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id 
      }, "ADMIN_INSTANCE");
      
      console.log("✅ [Server] Admin SDK initialized with Key Env Var.");
    } else {
      // B. Use Default Credentials (ADC) but FORCE the project ID
      app = admin.initializeApp({
        // 🛑 CRITICAL FIX: Explicitly set the Project ID to the correct one
        projectId: "studio-1704117883-ed97d" 
      }, "ADMIN_INSTANCE");

      console.log("⚠️ [Server] Using Default Credentials (ADC) with explicit Project ID.");
    }
  } catch (e) {
    console.error("❌ [Server] Firebase Admin Init Error:", e);
    // Fallback preventing crash
    app = admin.initializeApp({ projectId: "studio-1704117883-ed97d" }, "ADMIN_INSTANCE_FALLBACK");
  }

  global.firebaseAdminApp = app;
} else {
  app = global.firebaseAdminApp;
}

const dbAdmin = getFirestore(app);

try {
   dbAdmin.settings({ ignoreUndefinedProperties: true });
} catch (error) {
   // Ignore if already set
}

export { dbAdmin };