import React, { useState } from "react";
import { LayoutDashboard, Bell, Settings, Search, Menu } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

interface DashboardHeaderProps {
  userName: string;
  onSwitchToBuyer: () => void;
  onLogout: () => void;
  generateInitialsAvatar: (name: string) => string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  onSwitchToBuyer,
  onLogout,
  generateInitialsAvatar,
}) => {
  const theme = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-color border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 md:px-6 py-4">
        <div className="flex flex-row justify-between md:items-center md:justify-between gap-4">
          {/* Left: Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-linear-to-r from-accent-light to-accent p-2 rounded-3xl">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-text">
                Seller Dashboard
              </h1>
              <p className="text-xs md:text-sm text-text/80">
                Welcome back, <span className="capitalize">{userName}</span>!
              </p>
            </div>
          </div>

          {/* Right: Actions and Profile */}
          <div className="flex ml-auto md:flex-nowrap items-center gap-2 md:gap-4 md:w-auto">
            {/* Search (hidden on mobile) */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dim" />
              <input
                type="text"
                placeholder="Search products, orders..."
                className="input pl-12"
              />
            </div>

            {/* Mobile: Hamburger menu for actions */}
            <div className="flex md:hidden items-center gap-2 relative">
              <button
                className="p-2 rounded-3xl hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-dim" />
              </button>
              {mobileMenuOpen && (
                <div className="absolute right-0 top-10 mt-2 w-44 bg-color border border-gray-200 rounded shadow-lg z-50 flex flex-col p-2 space-y-2 animate-fade-in">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSwitchToBuyer();
                    }}
                    className="w-full text-left px-4 py-2 bg-gray-200 text-gray-900 rounded-3xl hover:bg-gray-300 transition-colors text-xs font-medium"
                  >
                    Switch to Buyer
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2 bg-accent-light text-color rounded-3xl hover:bg-accent transition-colors text-xs font-medium text-center"
                  >
                    Logout
                  </button>
                  <div className="w-full flex justify-center">
                    <ThemeToggle />
                  </div>
                </div>
              )}
            </div>

            {/* Desktop: Actions */}
            <button className="relative p-2 rounded-3xl hover:bg-dim/50 transition-colors hidden md:inline-flex cursor-pointer">
              <Bell className="w-6 h-6 text-text" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-important rounded-full"></span>
            </button>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              onClick={onSwitchToBuyer}
              className="hidden md:inline-flex px-4 py-2 bg-accent-light  text-white rounded-3xl hover:bg-dim/50 cursor-pointer transition-colors text-sm font-medium"
            >
              Switch to Buyer
            </button>
            <button
              onClick={onLogout}
              className="hidden md:inline-flex px-4 py-2 bg-accent-light text-white rounded-3xl hover:bg-accent transition-colors text-sm font-medium"
            >
              Logout
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-2 md:space-x-3 pl-2 md:pl-4 border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-muted">{userName}</p>
                <p className="text-xs text-dim">Vendor Account</p>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 bg-linear-to-r from-accent-light to-accent rounded-full flex items-center justify-center text-color font-semibold">
                <img
                  src={generateInitialsAvatar(userName)}
                  alt="profile picture"
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
