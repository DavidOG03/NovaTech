import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null | { uid, email, ...profile }
  const [loading, setLoading] = useState(true);

  // Subscribe to auth changes once on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Optionally fetch profile from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...(userDoc.exists() ? userDoc.data() : {}),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signUp(email, password, extras = {}) {
    // Optionally ensure persistence before sign-up/login:
    await setPersistence(auth, browserLocalPersistence);
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = credential.user.uid;
    // Create user profile doc
    await setDoc(doc(db, "users", uid), {
      email,
      createdAt: serverTimestamp(),
      ...extras,
    });
    return credential;
  }

  async function signIn(email, password) {
    await setPersistence(auth, browserLocalPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  }

  function signOutUser() {
    return firebaseSignOut(auth);
  }

  const value = { user, loading, signUp, signIn, signOutUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
