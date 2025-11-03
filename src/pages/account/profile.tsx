// src/pages/Profile.tsx
import { useAuth } from "@/context/AuthContext";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [theme, setTheme] = useState<string>("light");
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

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   if (savedTheme) {
  //     document.documentElement.classList.toggle("dark", savedTheme === "dark");
  //     setTheme(savedTheme);
  //   } else {
  //     const prefersDark = window.matchMedia(
  //       "(prefers-color-scheme: dark)"
  //     ).matches;
  //     document.documentElement.classList.toggle("dark", prefersDark);
  //     setTheme(prefersDark ? "dark" : "light");
  //     localStorage.setItem("theme", prefersDark ? "dark" : "light");
  //   }
  // }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="min-h-screen bg-grey flex justify-center py-22">
      <div className="w-full max-w-5xl bg-white rounded-2xl p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-b-grey pb-4">
          <img
            src={generateInitialsAvatar(userName)}
            alt="currentUser avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-pink"
          />
          <div>
            <h2 className="text-2xl font-semibold text-black capitalize">
              {userName}
            </h2>
            <p className="text-light-black">{userEmail}</p>
            {/* <button className="mt-2 text-sm px-4 py-1 bg-pink text-white rounded-lg hover:bg-pink/75">
              Edit Profile
            </button> */}
          </div>
        </div>

        {/* Personal Info */}
        <div>
          <h3 className="text-lg text-black font-semibold border-b border-b-grey pb-2 mb-4">
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-black">Full Name</p>
              <p className="font-medium text-light-black capitalize">
                {userName}
              </p>
            </div>
            {/* <div>
              <p className="text-black">Phone Number</p>
              <p className="font-medium text-light-black">+234 915 388 4943</p>
            </div> */}
            {/* <div>
              <p className="text-black">Address</p>
              <p className="font-medium text-light-black">Lagos, Nigeria</p>
            </div>
            <div>
              <p className="text-black">Joined</p>
              <p className="font-medium text-light-black">March 12, 2024</p>
            </div> */}
          </div>
        </div>

        {/* Account Settings */}
        <div>
          <h3 className="text-lg text-black font-semibold border-b border-b-grey pb-2 mb-4">
            Account Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-light-black">Email Notifications</p>
              <input
                type="checkbox"
                className="w-5 h-5 accent-pink"
                defaultChecked
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-light-black">Dark Mode</p>
              <button
                className=" border-0 cursor-pointer rounded-lg"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Moon color="#222" />
                ) : (
                  <Sun color="#fff" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div>
          <h3 className="text-lg text-black font-semibold border-b border-b-grey pb-2 mb-4">
            Security
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-light-black">Password</p>
              <button className="text-pink hover:underline">
                Change Password
              </button>
            </div>
            {/* <div>
              <p className="text-light-black">Two-Factor Authentication</p>
              <button className="text-pink hover:underline">Enable 2FA</button>
            </div> */}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
          <button className="mt-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
