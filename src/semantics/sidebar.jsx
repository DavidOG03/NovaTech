import React, { useRef, useState, useEffect } from 'react';
import { Router, useNavigate } from 'react-router';

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const linkRefs = useRef([]);
  const navigate = useNavigate()

  const handleClick = (index) => {
    setActive(index);
     const targetLink = navItems[index].link;
     navigate(targetLink)
  };

  useEffect(() => {
    if (linkRefs.current[active]) {
      setIndicatorTop(linkRefs.current[active].offsetTop);
    }
  }, [active]);

  const navItems = [
    { activeIcon:"/images/home_active.svg", icon: "/images/home.svg", label: "Home", link:"/" },
    { activeIcon:"/images/cart_active.svg", icon: "/images/cart.svg", label: "Cart", link:"/cart" },
    { activeIcon:"/images/order.svg", icon: "/images/order.svg", label: "Orders", link:"/order" },
    { activeIcon:"/images/profile.svg", icon: "/images/profile.svg", label: "Profile",link:"/" },
    { activeIcon:"/images/headphones.svg", icon: "/images/headphones.svg", label: "Support", link:"/" },
  ];

  return (
    <aside className="sidebar relative flex flex-col justify-between items-start gap-4 w-full h-screen max-h-screen max-w-[270px] rounded-3xl bg-(--bg-color) py-[40px] px-[33px]">
      <ul className="w-full relative space-y-2">
        {/* Moving indicator */}
        <span
          className="absolute left-0 w-full bg-[#ffffff10] rounded-[50px] transition-all duration-300 z-0"
          style={{
            top: `${indicatorTop}px`,
            height: "60px", // match li height
          }}
        />
        {navItems.map((item, index) => (
          <li
            key={index}
            ref={(el) => (linkRefs.current[index] = el)}
            onClick={() => handleClick(index)}
            className={`link relative z-10 cursor-pointer flex items-center gap-3 px-4 py-4 rounded-[50px] transition-all duration-300 ${
              active === index ? 'text-white font-semibold' : 'text-gray-300'
            }`}
            role="nav-link"
          >
            <img src={active === index ? item.activeIcon : item.icon } alt={`${item.label} icon`} className="w-5 h-5" />
            {item.label}
          </li>
        ))}
      </ul>

      <span className="text-white px-4 cursor-pointer flex justify-start items-center gap-2"><img src='/images/logout.svg' alt='logout icon'/> Log out</span>
    </aside>
  );
};

export default Sidebar;
