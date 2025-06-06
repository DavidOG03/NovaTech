import React, { useEffect, useState } from 'react'

const Header = () => {
    // const [isActive, setIsActive] = useState(false)

    // useEffect(() => {
    //    const handleScroll = () => {
    //   if (window.scrollY > 5) {
    //     setIsActive(true);
    //   } else {
    //     setIsActive(false);
    //   }
    // };

    // window.addEventListener('scroll', handleScroll);

    
    // }, [])
  return (
    // ${ isActive ? " bg-[#f7f7f7] fixed top-0 left-0 shadow-md z-10" : ""}
    <header className={`w-full flex justify-between items-center gap-[1.95rem] p-[1.95rem] transition duration-50 `}>
            <nav>
              {/* <a href="/"> */}
              <img src="/images/novatech.svg" alt="Novatech logo" className="h-6" />
              {/* </a>  */}
            </nav>
            <div className="middle flex flex-1/2 justify-end items-center gap-4">
              <div className="input-group flex justify-end items-center gap-[1.125rem] w-full">
                <div className="w-full max-w-[526px] relative flex justify-end items-center">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search Gadget"
                    className="w-full max-w-[526px] py-[12px] pl-[3rem] rounded-[200px] bg-white outline-0 focus:outline-1 focus:outline-(--bg-color)"
                  />
                  <span className="search absolute top-[50%] left-6 -translate-y-[50%] -translate-x-0">
                    <img src="/images/search.svg" alt="search icon" className="" />
                  </span>
                </div>
    
                <button
                  type="submit"
                  className="bg-linear-to-br from-(--bg-pink) to-(--bg-color) transition-all duration-150 hover:bg-linear-to-br hover:from-white hover:to-white cursor-pointer hover:text-black border-0 text-white rounded-[3rem] py-[12px] px-8"
                >
                  Search
                </button>
              </div>
              <button className="filter bg-white p-[10px] rounded-full grid content-center">
                <img src="/images/filter.svg" alt="filter icon" />
              </button>
            </div>
            <div className="hug flex justify-end items-center gap-4">
              <button className="notification-bell bg-white p-[10px] rounded-full grid content-center">
                <img src="/images/bell.svg" alt="notification bell" />
              </button>
              <div className="profile grid grid-cols-2 gap-2">
                <img src="/images/profile_pic.png" alt="Profile Picture" />
                <div className="flex flex-col justify-center items-start gap-1">
                  <span className="user text-base ">Rufus</span>
                  <span className="greeting text-[10px]">Welcome</span>
                </div>
              </div>
            </div>
          </header>
  )
}

export default Header
