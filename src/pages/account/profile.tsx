// src/pages/Profile.tsx
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import ThemeToggle from "@/components/shared/ThemeToggle";

const Profile: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Fetch currentUser name and email from localStorage or API
    const storedName = currentUser?.displayName || "John Doe";
    const storedEmail = currentUser?.email || "Not Available";

    setUserName(storedName);
    setUserEmail(storedEmail);
  }, [currentUser]);

  function generateInitialsAvatar(name: string): string {
    const initials = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
  }

  return (
    <div className="min-h-screen bg-color flex justify-center py-22">
      <div className="w-full max-w-5xl bg-color rounded-2xl p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-b-dim/25 pb-4">
          <img
            src={generateInitialsAvatar(userName)}
            alt="currentUser avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-accent-light"
          />
          <div>
            <h2 className="text-2xl font-semibold text-accent-secondary capitalize">
              {userName}
            </h2>
            <p className="text-dim">{userEmail}</p>
            {/* <button className="mt-2 text-sm px-4 py-1 bg-accent-light text-color rounded-lg hover:bg-accent-light/75">
              Edit Profile
            </button> */}
          </div>
        </div>

        {/* Account Settings */}
        <div className="border-b border-b-dim/25 pb-4">
          <h3 className="text-lg text-accent-secondary font-semibold pb-2 mb-4">
            Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-dim">Dark Mode</p>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Security */}
        {/* <div className="border-b border-b-dim/25 pb-4">
          <h3 className="text-lg text-accent-secondary font-semibold pb-2 mb-4">
            Security
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-dim">Password</p>
              <button className="text-accent-light hover:underline">
                Change Password
              </button>
            </div>
            {/* <div>
              <p className="text-dim">Two-Factor Authentication</p>
              <button className="text-accent-light hover:underline">Enable 2FA</button>
            </div> 
          </div>
        </div> */}

        {/* Danger Zone */}
        <div className="pt-6 ">
          <h3 className="text-lg font-semibold text-important">Danger Zone</h3>
          <button className="mt-2 px-4 py-2 border border-important text-important rounded-lg hover:bg-red-50">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
