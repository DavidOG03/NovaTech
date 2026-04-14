import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import {
  getFirestore,
  Firestore,
  collection,
  getDocs,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string; // optional
}
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as
    | string
    | undefined,
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export interface FirebaseAuthError extends Error {
  code:
    | "email-already-in-use"
    | "invalid-email"
    | "weak-password"
    | "wrong-password"
    | "user-not-found"
    | "too-many-requests"
    | string; // fallback for unknown codes
}

// Function to fetch gadgets from Firestore
export async function fetchGadgets() {
  try {
    const gadgetsCollection = collection(db, "gadgets");
    const gadgetSnapshot = await getDocs(gadgetsCollection);
    const gadgetList = gadgetSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return gadgetList;
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    throw error;
  }
}
