import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CloseSquare } from "react-iconly";
import { useProductContext } from "@/context/ProductContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [active, setActive] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { getCartCount } = useProductContext();
  const cartCount = getCartCount();

  // Initialize refs array with proper length
  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, navItems.length);
  }, []);
  const navigate = useNavigate();

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

  const navItems = [
    {
      activeIcon: "/images/home_active.svg",
      icon: "/images/home.svg",
      label: "Home",
      link: "/products",
    },
    {
      activeIcon: "/images/cart_active.svg",
      icon: "/images/cart.svg",
      label: "Cart",
      link: "/cart",
    },
    {
      activeIcon: "/images/order.svg",
      icon: "/images/order.svg",
      label: "Orders",
      link: "/order",
    },
    {
      activeIcon: "/images/profile.svg",
      icon: "/images/profile.svg",
      label: "Profile",
      link: "/profile",
    },
    {
      activeIcon: "/images/headphones.svg",
      icon: "/images/headphones.svg",
      label: "Support",
      link: "/support",
    },
  ];

  return (
    <div
      className={`fixed z-20 md:fixed left-0 md:left-4 top-0 md:top-[90px] h-full md:h-auto md:translate-none rounded-r-2xl md:rounded-3xl transition-transform duration-300 md:w-[180px] lg:w-[230px] pt-6 bg-background md:z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className=" md:hidden block top-4 left-4 p-4">
        <button onClick={onClose} className="text-white cursor-pointer">
          <CloseSquare size={30} />
        </button>
      </div>

      <div className="relative px-4">
        {/* Moving indicator */}
        <div
          className="absolute left-4 w-auto md:w-39 lg:w-50 h-14 bg-[#FFFFFF10] rounded-[50px] transition-all duration-300"
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
              active === index ? "text-white font-semibold" : "text-grey"
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleLinkClick(index);
              }
            }}
          >
            <img
              src={active === index ? item.activeIcon : item.icon}
              alt={item.label}
              className="w-6 h-6"
            />
            <span>{item.label}</span>
            {item.label === "Cart" && cartCount > 0 && (
              <span className="mr-auto bg-grey/15 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </div>
        ))}
      </div>

      <button className="w-full text-left flex items-center gap-4 text-white px-8 py-4 mb-4 md:mb-6 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path
            fill="none"
            stroke="#d0cace"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m12 15l3-3m0 0l-3-3m3 3H4m5-4.751V7.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C10.52 4 11.08 4 12.2 4h4.6c1.12 0 1.68 0 2.107.218c.377.192.683.497.875.874c.218.427.218.987.218 2.105v9.607c0 1.118 0 1.677-.218 2.104a2 2 0 0 1-.875.874c-.427.218-.986.218-2.104.218h-4.606c-1.118 0-1.678 0-2.105-.218a2 2 0 0 1-.874-.874C9 18.48 9 17.92 9 16.8v-.05"
          ></path>
        </svg>
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
