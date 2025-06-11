import React, { useEffect, useRef, useState } from "react";
import Button from "../components/button";
import Card from "../components/card";
import { gsap } from "gsap";

const Dashboard = ({ filterEnabled, searchQuery = "" }) => {
  const cardsRef = useRef([]);
  const [activeCategories, setActiveCategories] = useState([]); // index of the active button

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 0, scale: 0.75 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.15,
        ease: "power2.out",
        stagger: 0.125,
      }
    );
  }, []);

  const categories = [
    { img: "/images/phones.png", alt: "phones", text: "Phones" },
    { img: "/images/laptop.png", alt: "laptops", text: "Laptops" },
    { img: "/images/tablets.png", alt: "tablets", text: "Tablets" },
    { img: "/images/consoles.png", alt: "console", text: "Consoles" },
    { img: "/images/watch.png", alt: "watch", text: "Accessories" },
  ];
  const deals = [
    {
      image: "/images/iphone.png",
      name: "Iphone 16 Pro",
      price: "N1,400,050",
      lastPrice: "N1,600,050",
      category: "Phones",
    },
    {
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      lastPrice: "N26,000",
      category: "Accessories",
    },
    {
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N550,000",
      category: "Consoles",
    },
    {
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N550,000",
      category: "Consoles",
    },
    {
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      lastPrice: "N550,000",
      category: "Tablets",
    },
  ];

  const picks = [
    {
      image: "/images/iphone.png",
      name: "Iphone 16 Pro",
      price: "N1,400,050",
      lastPrice: "N1,600,050",
      category: "Phones",
    },
    {
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      lastPrice: "N26,000",
      category: "Accessories",
    },
    {
      image: "/images/headphone.webp",
      name: "Sony Headphones",
      price: "N480,000",
      lastPrice: "N550,000",
      category: "Accessories",
    },
    {
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N550,000",
      category: "Consoles",
    },
    {
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      lastPrice: "N550,000",
      category: "Tablets",
    },
  ];

  const selectedCategoryNames = activeCategories.map((i) => categories[i].text);

  const filterList = (items) =>
    items.filter((item) => {
      // Always filter by selected categories:
      // if none selected → show all, else show only matching ones
      const byCategory =
        selectedCategoryNames.length === 0 ||
        selectedCategoryNames.includes(item.category);

      // Always filter by search term
      const bySearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return byCategory && bySearch;
    });

  const filteredDeals = filterList(deals);
  const filteredPicks = filterList(picks);

  return (
    <div className="h-full w-full pb-8 min-h-dvh">
      <section
        className={`category w-full justify-start items-center gap-4 pb-2 mb-4 scroll-p-4 snap-x snap-start lg:snap-none overflow-auto ${
          filterEnabled ? "hidden" : "flex"
        }`}
      >
        {categories.map((cat, index) => (
          <Button
            key={index}
            img={cat.img}
            altText={cat.alt}
            text={cat.text}
            isActive={activeCategories.includes(index)}
            onClick={() =>
              setActiveCategories((prev) =>
                prev.includes(index)
                  ? prev.filter((i) => i !== index)
                  : [...prev, index]
              )
            }
          />
        ))}
      </section>
      <div className="items-container overflow-x-auto overscroll-auto scrollbar-thin scrollbar-thumb-(--grey) scrollbar-track-(--grey) pb-4 max-h-[100vh] rounded-2xl">
        <section className="hot-deals p-4 md:p-[30px] bg-white rounded-2xl mb-[1.25rem] overflow-hidden">
          <div className="header flex justify-between items-center mb-[2rem]">
            <h1 className="text-base md:text-[1.5rem] font-semibold">
              Hot Deals
            </h1>
            <span className="more flex justify-end items-center gap-4 text-[#515151]">
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#515151"
                  d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                ></path>
              </svg>
            </span>
          </div>
          <div className="deal-card grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2">
            {filteredDeals.map((deal, index) => (
              <div
                className="flex-auto max-w-[220px]"
                ref={(el) => (cardsRef.current[index] = el)}
                key={index}
              >
                <Card
                  image={deal.image}
                  name={deal.name}
                  price={deal.price}
                  lastPrice={deal.lastPrice}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="top-picks-section p-4 md:p-[30px] bg-white rounded-2xl mt-[40px]">
          <div className="header flex justify-between items-center mb-[2rem]">
            <h1 className="text-base md:text-[1.5rem] font-semibold">
              Top Picks
            </h1>
            <span className="more flex justify-end items-center gap-4 text-(--light-black)">
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#515151"
                  d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                ></path>
              </svg>
            </span>
          </div>
          <div className="top-picks grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {filteredPicks.map((pick, index) => (
              <div
                className="flex-auto max-w-[220px]"
                ref={(el) => (cardsRef.current[index] = el)}
                key={index}
              >
                <Card
                  image={pick.image}
                  name={pick.name}
                  price={pick.price}
                  lastPrice={pick.lastPrice}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
