import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  User as FirebaseUser,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

// -------------------------
// Types
// -------------------------
interface UserProfile {
  uid: string;
  email: string | null;
  [key: string]: any; // allow extra profile fields from Firestore
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    extras?: Record<string, any>
  ) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOutUser: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// -------------------------
// Context
// -------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// -------------------------
// Provider
// -------------------------
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to auth changes once on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName, // ✅ add this
            photoURL: firebaseUser.photoURL,
            emailNotifications: false, // ✅ add this
            ...(userDoc.exists() ? userDoc.data() : {}),
          } as UserProfile);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // Sign up + store profile
  async function signUp(
    email: string,
    password: string,
    extras: Record<string, any> = {}
  ) {
    await setPersistence(auth, browserLocalPersistence);
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = credential.user.uid;

    await setDoc(doc(db, "users", uid), {
      email,
      createdAt: serverTimestamp(),
      ...extras,
    });

    return credential;
  }

  // Sign in
  async function signIn(email: string, password: string) {
    await setPersistence(auth, browserLocalPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  }

  // Sign out
  function signOutUser() {
    return firebaseSignOut(auth);
  }

  const value: AuthContextType = { user, loading, signUp, signIn, signOutUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
