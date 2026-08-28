import { useAuth } from "@/context/AuthContext";
import { useProductContext } from "@/context/ProductContext";
import { useSearch } from "@/context/SearchContext";
import { Bell } from "lucide-react";
import { CartIcon, MenuGridIcon } from "@/constants/icons";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  onMenuClick: () => void;
  handleFilterToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, handleFilterToggle }) => {
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const theme = useTheme();
  const navigate = useNavigate();

  const { currentUser, userProfile, activeRole, switchRole } = useAuth();

  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    const name =
      userProfile?.name ||
      currentUser?.displayName ||
      currentUser?.email?.split("@")[0] ||
      "John Doe";
    setUserName(name);
  }, [currentUser, userProfile]);

  function generateInitialsAvatar(name: string): string {
    const initials = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
  }

  const { getCartCount } = useProductContext();
  const cartCount = getCartCount();
  const canSwitchToVendor =
    userProfile?.role === "vendor" || userProfile?.role === "both";

  const showBecomeSellerButton =
    !!currentUser && !canSwitchToVendor && activeRole === "buyer";

  const showSwitchToVendorButton =
    !!currentUser && canSwitchToVendor && activeRole === "buyer";

  const handleSwitchToVendor = async () => {
    try {
      await switchRole("vendor");
      navigate("/seller-dashboard");
    } catch (error) {
      console.error("Error switching to vendor:", error);
    }
  };

  return (
    <header className="w-full flex justify-between items-center gap-4 p-4 md:px-[1.95rem] md:py-3 transition duration-50 fixed top-0 left-0 z-5 bg-color">
      {/* Left: Logo and Mobile Menu */}
      <Link to={"/products"} className="flex items-center gap-4">
        <img
          src={
            theme === "dark"
              ? "/images/novatech-light.webp"
              : "/images/novatech.svg"
          }
          alt="Novatech logo"
          className="h-6"
        />
      </Link>

      {/* Middle: Search */}
      <div className="middle flex flex-1/2 justify-end items-center gap-2">
        <div className="input-group flex justify-end items-center gap-[1.125rem] w-full">
          <div className="w-full max-w-[526px] relative flex justify-end items-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Gadget"
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="w-full max-w-131.5 py-2 pl-8 md:pl-12 rounded-full bg-card text-accent-secondary border border-accent-light/25 focus:border-2 focus:border-accent-light focus:ring-0 transition duration-200"
            />
            <span className="search absolute top-1/2 left-2 md:left-6 -translate-y-1/2">
              <img
                src="/images/search.svg"
                alt="search icon"
                className="w-4 h-4"
              />
            </span>
            <button className="hidden md:block bg-linear-to-br from-accent-light to-accent transition-all duration-200 hover:opacity-85 text-white rounded-[3rem] py-1.5 px-4 cursor-pointer absolute top-1/2 right-1 -translate-y-1/2">
              Search
            </button>
          </div>
        </div>

        <Link
          className="bg-accent relative py-2 px-2 rounded-full content-hover:opacity-85light transition-colors duration-200 grid md:hidden"
          to="/cart"
        >
          <CartIcon className="text-white w-6 h-6" />
          {cartCount > 0 && (
            <span className="bg-red-500 w-2 h-2 rounded-full absolute top-0 right-0"></span>
          )}
        </Link>
      </div>

      {/* Right: Notification and Profile */}
      <div className="hug hidden md:flex justify-end items-center gap-4">
        {showBecomeSellerButton && (
          <Link
            to="/vendor/signup"
            className="bg-linear-to-br from-accent-light to-accent text-white rounded-[3rem] py-2 px-4 transition-all duration-200 hover:opacity-85"
          >
            Become a seller
          </Link>
        )}

        {showSwitchToVendorButton && (
          <button
            type="button"
            onClick={handleSwitchToVendor}
            className="bg-linear-to-br from-accent-light to-accent text-white rounded-[3rem] py-2 px-4 transition-all duration-200 hover:opacity-85 cursor-pointer"
          >
            Switch to vendor
          </button>
        )}

        <ThemeToggle />
        <button className="notification-bell bg-linear-to-br from-accent-light to-accent p-2 rounded-full grid content-center cursor-pointer hover:opacity-85 transition-colors duration-200">
          <Bell className="w-6 h-6 text-white" />
        </button>
        <div className="profile grid grid-cols-[auto_1fr] gap-1 ">
          <img
            src={generateInitialsAvatar(userName)}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full"
          />
          {/* <div className="flex flex-col justify-center items-start gap-1">
            <span className="user text-base text-dim capitalize">
              {userName}
            </span>
            <span className="greeting text-[10px] text-dim">
              Welcome
            </span>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu */}
      <button
        className="block md:hidden cursor-pointer text-accent"
        onClick={onMenuClick}
      >
        <MenuGridIcon className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;
