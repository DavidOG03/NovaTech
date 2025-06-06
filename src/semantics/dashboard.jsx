import React, { useEffect, useRef, useState } from "react";
import Button from "../components/button";
import Card from "../components/card";
import { gsap } from "gsap";

const Dashboard = () => {
  const cardsRef = useRef([]);
  const [activeCategory, setActiveCategory] = useState(null); // index of the active button

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", stagger: 0.125 }
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
    },
    {
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      lastPrice: "N26,000",
    },
    {
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N550,000",
    },
    {
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N550,000",
    },
    {
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      lastPrice: "N550,000",
    },
  ];

  const picks = [
    {
      image: "/images/iphone.png",
      name: "Iphone 16 Pro",
      price: "N1,400,050",
      lastPrice: "N1,600,050",
    },
    {
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      lastPrice: "N26,000",
    },
    {
      image: "/images/headphone_pic.png",
      name: "Sony Headphones",
      price: "N480,000",
      lastPrice: "N550,000",
    },
    {
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N550,000",
    },
    {
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      lastPrice: "N550,000",
    },
  ];

  return (
    <main className="h-full w-full overflow-y-scroll ">
      <section className="category w-full flex justify-start items-center gap-4">
        {categories.map((cat, index) => (
          <Button
            key={index}
            img={cat.img}
            altText={cat.alt}
            text={cat.text}
            isActive={activeCategory === index}
            onClick={() => setActiveCategory(index)}
          />
        ))}
      </section>
      <section className="hot-deals p-[30px] bg-white rounded-2xl mt-[40px] mb-[1.25rem] overflow-hidden">
        <div className="header flex justify-between items-center mb-[2rem]">
          <h1 className="text-[1.5rem]">Hot Deals</h1>
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
        <div className="deal-card flex justify-between items-center flex-wrap gap-[10px]">
          {deals.map((deal, index) => (
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
      <section className="top-picks-section p-[30px] bg-white rounded-2xl mt-[40px]">
        <div className="header flex justify-between items-center mb-[2rem]">
          <h1 className="text-[1.5rem]">Top Picks</h1>
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
        <div className="top-picks flex justify-between items-center flex-wrap gap-[10px]">
          {picks.map((pick, index) => (
            <div
              ref={(el) => (cardsRef.current[index + deals.length] = el)}
              key={index}
              className="flex-auto max-w-[220px]"
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
    </main>
  );
};

export default Dashboard;
