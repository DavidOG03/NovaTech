"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

// Define possible user roles
type UserRole = "buyer" | "vendor" | "both";
type ActiveRole = "buyer" | "vendor";

interface UserProfile {
  uid: string;
  email: string;
  name: string;
  photoURL: string;
  role: UserRole;
  activeRole: ActiveRole;
  createdAt: any;
  updatedAt: any;
  // Vendor-specific fields (optional)
  storeName?: string;
  storeDescription?: string;
  // Buyer-specific fields (optional)
  shippingAddress?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  activeRole: ActiveRole | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    role: UserRole,
    extras?: {
      name?: string;
      photoURL?: string;
      storeName?: string;
      storeDescription?: string;
    }
  ) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  switchRole: (newActiveRole: ActiveRole) => Promise<void>;
  upgradeToVendor: (vendorData?: {
    storeName?: string;
    storeDescription?: string;
  }) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [activeRole, setActiveRole] = useState<ActiveRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const profile = userDoc.data() as UserProfile;
        setUserProfile(profile);
        setUserRole(profile.role);

        // Set active role from profile or default to buyer
        const savedActiveRole = localStorage.getItem(`activeRole_${uid}`);
        let finalActiveRole: ActiveRole;

        if (
          savedActiveRole &&
          (savedActiveRole === "buyer" || savedActiveRole === "vendor")
        ) {
          // Validate that saved role is available
          if (profile.role === "both" || profile.role === savedActiveRole) {
            finalActiveRole = savedActiveRole as ActiveRole;
          } else {
            // User doesn't have access to saved role
            finalActiveRole =
              profile.role === "buyer" || profile.role === "vendor"
                ? profile.role
                : "buyer";
          }
        } else if (profile.activeRole) {
          // Use activeRole from profile
          finalActiveRole = profile.activeRole;
        } else {
          // Default based on role
          if (profile.role === "both") {
            finalActiveRole = "buyer";
          } else if (profile.role === "buyer" || profile.role === "vendor") {
            finalActiveRole = profile.role;
          } else {
            // Fallback to buyer if something unexpected
            finalActiveRole = "buyer";
          }
        }

        setActiveRole(finalActiveRole);
      } else {
        setUserProfile(null);
        setUserRole(null);
        setActiveRole(null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserProfile(null);
      setUserRole(null);
      setActiveRole(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
        setUserRole(null);
        setActiveRole(null);
      }

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // SIGN UP - Creates a unified user account
  const signUp = async (
    email: string,
    password: string,
    role: UserRole,
    extras?: {
      name?: string;
      photoURL?: string;
      storeName?: string;
      storeDescription?: string;
    }
  ) => {
    try {
      const { name, photoURL, storeName, storeDescription } = extras || {};
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: name || "",
        photoURL: photoURL || "",
      });

      // Determine default active role
      const defaultActiveRole: ActiveRole =
        role === "both" ? "buyer" : (role as ActiveRole);

      // Create unified user profile in Firestore
      const userProfileData: UserProfile = {
        uid: user.uid,
        email,
        name: name || "",
        photoURL: photoURL || "",
        role,
        activeRole: defaultActiveRole,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add vendor-specific fields if signing up as vendor or both
      if (role === "vendor" || role === "both") {
        userProfileData.storeName = storeName || "";
        userProfileData.storeDescription = storeDescription || "";
      }

      // Save to single users collection
      await setDoc(doc(db, "users", user.uid), userProfileData);

      // Update local state
      setUserProfile(userProfileData);
      setUserRole(role);
      setActiveRole(defaultActiveRole);

      // Save active role to localStorage
      localStorage.setItem(`activeRole_${user.uid}`, defaultActiveRole);

      return userCredential;
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  };

  // LOGIN
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user profile to determine role
      await fetchUserProfile(user.uid);

      return userCredential;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setCurrentUser(null);
      setUserProfile(null);
      setUserRole(null);
      setActiveRole(null);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  // SWITCH ROLE - Switch between buyer and vendor modes
  const switchRole = async (newActiveRole: ActiveRole) => {
    if (!currentUser || !userProfile) {
      throw new Error("No user logged in");
    }

    // Validate that user has access to the requested role
    if (userProfile.role !== "both" && userProfile.role !== newActiveRole) {
      throw new Error(`User does not have ${newActiveRole} access`);
    }

    try {
      // Update active role in Firestore
      await updateDoc(doc(db, "users", currentUser.uid), {
        activeRole: newActiveRole,
        updatedAt: serverTimestamp(),
      });

      // Update local state
      setActiveRole(newActiveRole);
      setUserProfile({ ...userProfile, activeRole: newActiveRole });

      // Save to localStorage for persistence
      localStorage.setItem(`activeRole_${currentUser.uid}`, newActiveRole);

      console.log(`Switched to ${newActiveRole} mode`);
    } catch (error) {
      console.error("Error switching role:", error);
      throw error;
    }
  };

  // UPGRADE TO VENDOR - Convert buyer to vendor or both
  const upgradeToVendor = async (vendorData?: {
    storeName?: string;
    storeDescription?: string;
  }) => {
    if (!currentUser || !userProfile) {
      throw new Error("No user logged in");
    }

    if (userProfile.role === "vendor" || userProfile.role === "both") {
      throw new Error("User already has vendor access");
    }

    try {
      const updatedProfile: Partial<UserProfile> = {
        role: "both",
        activeRole: "vendor", // Switch to vendor mode after upgrade
        storeName: vendorData?.storeName || "",
        storeDescription: vendorData?.storeDescription || "",
        updatedAt: serverTimestamp(),
      };

      // Update Firestore
      await updateDoc(doc(db, "users", currentUser.uid), updatedProfile);

      // Update local state
      const newProfile = {
        ...userProfile,
        ...updatedProfile,
        role: "both" as UserRole,
      };
      setUserProfile(newProfile);
      setUserRole("both");
      setActiveRole("vendor");

      // Save to localStorage
      localStorage.setItem(`activeRole_${currentUser.uid}`, "vendor");

      console.log("Upgraded to vendor account");
    } catch (error) {
      console.error("Error upgrading to vendor:", error);
      throw error;
    }
  };

  // UPDATE USER PROFILE - Generic update function
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser || !userProfile) {
      throw new Error("No user logged in");
    }

    try {
      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };

      // Update Firestore
      await updateDoc(doc(db, "users", currentUser.uid), updateData);

      // Update local state
      setUserProfile({ ...userProfile, ...updateData });

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    userRole,
    activeRole,
    loading,
    signUp,
    login,
    logout,
    switchRole,
    upgradeToVendor,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
