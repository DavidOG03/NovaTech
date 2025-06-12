import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CloseSquare } from "react-iconly";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [active, setActive] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize refs array with proper length
  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, navItems.length);
  }, []);
  const navigate = useNavigate();

  const handleClick = (index: number) => {
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
      link: "/",
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
      link: "/",
    },
    {
      activeIcon: "/images/headphones.svg",
      icon: "/images/headphones.svg",
      label: "Support",
      link: "/",
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full md:static rounded-r-2xl md:rounded-3xl w-[270px] pt-8 bg-(--bg-color) transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className=" md:hidden flex justify-start p-4">
        <button onClick={onClose} className="text-white cursor-pointer">
          <CloseSquare size={30} />
        </button>
      </div>

      <div className="relative px-4">
        {/* Moving indicator */}
        <div
          className="absolute left-4 w-56 h-14 bg-[#FFFFFF10] rounded-[50px] transition-all duration-300"
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
            onClick={() => handleClick(index)}
            className={`link relative z-10 cursor-pointer flex items-center gap-3 px-4 py-4 rounded-[50px] transition-all duration-300 ${
              active === index ? "text-white font-semibold" : "text-(--grey)"
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick(index);
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
              <span className="ml-auto bg-(--grey) text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <button className="w-full text-left text-white px-4 py-4 hover:text-white transition-colors">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;