import React, { useEffect, useRef, useState } from "react";
import Button from "../components/button";
import Card from "../components/card";
import { gsap } from "gsap";

// 1. Data shapes
interface Category {
  img: string;
  alt: string;
  text: string;
}

interface Deal {
  image: string;
  name: string;
  price: string;
  lastPrice: string;
  category: string;
}

// 2. Component props
interface DashboardProps {
  filterEnabled: boolean;
  searchQuery?: string;
}

// 3. Component
const Dashboard: React.FC<DashboardProps> = ({
  filterEnabled,
  searchQuery = "",
}) => {
  // 4. Typed refs and state
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [activeCategories, setActiveCategories] = useState<number[]>([]);

  // 5. GSAP on mount
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

  // 6. Your data
  const categories: Category[] = [
    { img: "/images/phones.png", alt: "phones", text: "Phones" },
    { img: "/images/laptop.png", alt: "laptops", text: "Laptops" },
    { img: "/images/tablets.png", alt: "tablets", text: "Tablets" },
    { img: "/images/consoles.png", alt: "console", text: "Consoles" },
    { img: "/images/watch.png", alt: "watch", text: "Accessories" },
  ];

  const deals: Deal[] = [
    { image: "/images/iphone.png", name: "Iphone 16 Pro", price: "N1,400,050", lastPrice: "N1,600,050", category: "Phones" },
    { image: "/images/oraimo_pods.png", name: "Oraimo Pods", price: "N18,000", lastPrice: "N26,000", category: "Accessories" },
    { image: "/images/ps5_portable.png", name: "PS5 Portable", price: "N480,000", lastPrice: "N550,000", category: "Consoles" },
    { image: "/images/tablet.png", name: "Samsung Tablet", price: "N480,000", lastPrice: "N550,000", category: "Tablets" },
  ];

  const picks: Deal[] = [
    { image: "/images/iphone.png", name: "Iphone 16 Pro", price: "N1,400,050", lastPrice: "N1,600,050", category: "Phones" },
    { image: "/images/oraimo_pods.png", name: "Oraimo Pods", price: "N18,000", lastPrice: "N26,000", category: "Accessories" },
    { image: "/images/headphone.webp", name: "Sony Headphones", price: "N480,000", lastPrice: "N550,000", category: "Accessories" },
    { image: "/images/ps5_portable.png", name: "PS5 Portable", price: "N480,000", lastPrice: "N550,000", category: "Consoles" },
    { image: "/images/tablet.png", name: "Samsung Tablet", price: "N480,000", lastPrice: "N550,000", category: "Tablets" },
  ];

  // 7. Filter logic
  const selectedCategoryNames = activeCategories
    .map((i) => categories[i]?.text)
    .filter((t): t is string => Boolean(t));

  const filterList = (items: Deal[]): Deal[] =>
    items.filter((item) => {
      const byCategory =
        selectedCategoryNames.length === 0 ||
        selectedCategoryNames.includes(item.category);
      const bySearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return byCategory && bySearch;
    });

  const filteredDeals = filterList(deals);
  const filteredPicks = filterList(picks);

  // 8. Render
  return (
    <div className="h-full w-full pb-8 min-h-dvh">
      {/* Categories */}
      <section
        className={`category w-full justify-start items-center gap-4 pb-2 mb-4 scroll-p-4 snap-x snap-start lg:snap-none overflow-auto ${
          filterEnabled ? "hidden" : "flex"
        }`}
      >
        {categories.map((cat, idx) => (
          <Button
            key={idx}
            img={cat.img}
            altText={cat.alt}
            text={cat.text}
            isActive={activeCategories.includes(idx)}
            onClick={() =>
              setActiveCategories((prev) =>
                prev.includes(idx)
                  ? prev.filter((i) => i !== idx)
                  : [...prev, idx]
              )
            }
          />
        ))}
      </section>

      {/* Deals & Picks */}
      <div className="items-container overflow-x-auto overscroll-auto scrollbar-thin scrollbar-thumb-(--grey) scrollbar-track-(--grey) pb-4 max-h-[100vh] rounded-2xl">
        {/* Hot Deals */}
        <section className="hot-deals p-4 md:p-[30px] bg-white rounded-2xl mb-[1.25rem] overflow-hidden">
          <div className="header flex justify-between items-center mb-[2rem]">
            <h1 className="text-base md:text-[1.5rem] font-semibold">
              Hot Deals
            </h1>
            <span className="more flex justify-end items-center gap-4 text-[#515151] cursor-pointer">
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <path fill="#515151" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" />
              </svg>
            </span>
          </div>
          <div className="deal-card grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2">
            {filteredDeals.map((deal, idx) => (
              <div
                key={idx}
                className="flex-auto max-w-[220px]"
                ref={(el: HTMLDivElement | null) => {
                  cardsRef.current[idx] = el;
                }}
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

        {/* Top Picks */}
        <section className="top-picks-section p-4 md:p-[30px] bg-white rounded-2xl mt-[40px]">
          <div className="header flex justify-between items-center mb-[2rem]">
            <h1 className="text-base md:text-[1.5rem] font-semibold">
              Top Picks
            </h1>
            <span className="more flex justify-end items-center gap-4 text-(--light-black) cursor-pointer">
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <path fill="#515151" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" />
              </svg>
            </span>
          </div>
          <div className="top-picks grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {filteredPicks.map((pick, idx) => (
              <div
                key={idx}
                className="flex-auto max-w-[220px]"
                ref={(el: HTMLDivElement | null) => {
                  cardsRef.current[idx] = el;
                }}
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
