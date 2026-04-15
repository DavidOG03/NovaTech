import React from "react";
import { LayoutDashboard, Bell, Settings, Search } from "lucide-react";
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

  return (
    <header className="bg-grey border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink to-background p-2 rounded-3xl">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-light-black">
                  Seller Dashboard
                </h1>
                <p className="text-sm text-light-black">
                  Welcome back, <span className="capitalize">{userName}</span>!
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-black" />
              <input
                type="text"
                placeholder="Search products, orders..."
                className="pl-10 pr-4 py-2 w-64 border border-light-black/25 placeholder:text-light-black rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-3xl hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6 text-light-black" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-3xl hover:bg-gray-100 transition-colors">
              <Settings className="w-6 h-6 text-light-black" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Switch to Buyer */}
            <button
              onClick={onSwitchToBuyer}
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-3xl hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Switch to Buyer
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-pink text-white rounded-3xl hover:bg-background transition-colors text-sm font-medium"
            >
              Logout
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-light-black">
                  {userName}
                </p>
                <p className="text-xs text-light-black">Vendor Account</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-pink to-background rounded-full flex items-center justify-center text-white font-semibold">
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
