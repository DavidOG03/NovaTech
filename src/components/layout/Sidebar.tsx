import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { CloseSquare } from "react-iconly";
import { useProductContext } from "@/context/ProductContext";
import {
  HomeActiveIcon,
  HomeIcon,
  CartActiveIcon,
  CartIcon,
  OrdersActiveIcon,
  OrdersIcon,
  ProfileActiveIcon,
  ProfileIcon,
  SupportActiveIcon,
  SupportIcon,
  LogoutIcon,
} from "@/constants/icons";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [active, setActive] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { getCartCount, getCartTotal, orders } = useProductContext();
  const cartCount = getCartCount();
  const totalCount = getCartTotal();
  const totalOrder = orders.length > 0;

  // Initialize refs array with proper length
  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, navItems.length);
  }, []);

  useEffect(() => {
    if (linkRefs.current[active]) {
      setIndicatorTop(linkRefs.current[active]!.offsetTop);
    }
  }, [active]);

  const handleLinkClick = (index: number) => {
    setActive(index);
    const targetLink = navItems[index].link;
    navigate(targetLink);

    if (window.innerWidth < 768) onClose(); // auto-close sidebar on mobile
  };

  useEffect(() => {
    if (linkRefs.current[active]) {
      setIndicatorTop(linkRefs.current[active]!.offsetTop);
    }
  }, [active]);

  // ✅ Logout function
  const handleLogout = () => {
    // Clear stored auth data (adjust to your setup)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.setItem("theme", "light");

    // Redirect to home page
    navigate("/signin");
  };

  const navItems = [
    {
      activeIcon: <HomeActiveIcon />,
      icon: <HomeIcon />,
      label: "Home",
      link: "/products",
    },
    {
      activeIcon: <CartActiveIcon />,
      icon: <CartIcon />,
      label: "Cart",
      link: "/cart",
    },
    {
      activeIcon: <OrdersActiveIcon />,
      icon: <OrdersIcon />,
      label: "Orders",
      link: "/order",
    },
    {
      activeIcon: <ProfileActiveIcon />,
      icon: <ProfileIcon />,
      label: "Profile",
      link: "/profile",
    },
    {
      activeIcon: <SupportActiveIcon />,
      icon: <SupportIcon />,
      label: "Support",
      link: "/support",
    },
  ];

  // Automatically detect active route based on location
  const activeIndex = navItems.findIndex((item) =>
    location.pathname.startsWith(item.link),
  );

  // Update indicator position whenever active link changes
  useEffect(() => {
    if (linkRefs.current[activeIndex]) {
      setIndicatorTop(linkRefs.current[activeIndex]!.offsetTop);
    }
  }, [activeIndex, location.pathname]);

  return (
    <div
      className={`fixed z-20 md:fixed left-0 md:left-4 top-0 md:top-22.5 h-full md:h-auto md:translate-none rounded-r-2xl md:rounded-3xl transition-transform duration-300 md:w-45 lg:w-57.5 pt-6 bg-linear-to-b from-accent to-accent-light md:z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="md:hidden block top-4 left-4 p-4">
        <button onClick={onClose} className="text-white cursor-pointer">
          <CloseSquare size={30} />
        </button>
      </div>

      <div className="relative px-4">
        {/* Moving indicator */}
        <div
          className="absolute left-4 w-auto md:w-39 lg:w-50 h-14 bg-white/10 rounded-[50px] transition-all duration-300"
          style={{ top: `${indicatorTop}px` }}
        />

        {navItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (linkRefs.current) {
                linkRefs.current[index] = el;
              }
            }}
            onClick={() => handleLinkClick(index)}
            className={`link relative z-10 cursor-pointer flex items-center gap-3 px-4 py-4 rounded-[50px] transition-all duration-300 ${
              active === index
                ? "text-white font-semibold"
                : "text-white/70 hover:text-white"
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleLinkClick(index);
              }
            }}
          >
            {active === index ? item.activeIcon : item.icon}
            <span className="text-white">{item.label}</span>
            {item.label === "Cart" && cartCount > 0 && (
              <span className="mr-auto bg-red-500 text-white text-xs rounded-full w-2 h-2 animate-pulse text-center"></span>
            )}
            {item.label === "Orders" && totalOrder && (
              <span className="mr-auto bg-red-500 text-white text-xs rounded-full w-2 h-2 animate-pulse text-center"></span>
            )}
          </div>
        ))}
      </div>

      <button
        className="w-full text-left flex items-center gap-4 text-white/80 hover:text-white px-8 py-4 mb-4 md:mb-6 transition-colors cursor-pointer"
        onClick={handleLogout}
      >
        <LogoutIcon className="w-6 h-6 text-white" />
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
