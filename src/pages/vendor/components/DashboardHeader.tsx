import React from "react";
import { LayoutDashboard, Bell, Settings, Search } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";

interface DashboardHeaderProps {
  userName: string;
  onSwitchToBuyer: () => void;
  generateInitialsAvatar: (name: string) => string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  onSwitchToBuyer,
  generateInitialsAvatar,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/images/novatech.svg"
              alt="NovaTech Logo"
              className="h-8"
            />
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink to-background p-2 rounded-3xl">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Seller Dashboard
                </h1>
                <p className="text-sm text-light-black">
                  Welcome back, {userName}!
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, orders..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-3xl hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-3xl hover:bg-gray-100 transition-colors">
              <Settings className="w-6 h-6 text-gray-600" />
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

            {/* Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
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
