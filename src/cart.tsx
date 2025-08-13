import React, { useEffect, useRef } from "react";
import Card from "./components/card.js";
import Item from "./components/item.js";
import { gsap } from "gsap";

interface CartProps {
  numberOfItems: number;
  count: number;
}

const Cart: React.FC<CartProps> = ({ numberOfItems, count }) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Filter out null values before animating
    const validCards = cardsRef.current.filter((card) => card !== null);

    gsap.fromTo(
      validCards,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", stagger: 0.125 }
    );
  }, []);

  const similarProducts = [
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
      image: "/images/headphone.webp",
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
    <div className="cart-container gap-5 h-full w-full pt-[90px] pb-8 ">
      <div className="header flex flex-col xl:flex-row justify-center gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 md:px-[1.5rem] md:py-[1.825rem] flex-auto min-w-[520px]">
          <div className="flex justify-between items-center pb-4 border border-[transparent] border-b-[#EFEFEF] ">
            <div className="flex justify-start items-center gap-1">
              Cart <span>({numberOfItems})</span>
            </div>
            <button className="flex justify-end items-center gap-1">
              <img src="/images/delete.svg" alt="delete icon" /> Delete
            </button>
          </div>
          <div className="flex justify-center items-center flex-col gap-12 py-[1.9rem]">
            <Item
              image="/images/iphone.png"
              name="Iphone 16 pro"
              price="N1,400,500"
              count={1}
            />
          </div>
        </div>
        <div className="order-summary flex-auto flex flex-col justify-center items-stretch gap-8 bg-white rounded-2xl p-4 md:px-[1.5rem] md:py-[1.825rem]">
          <div className="border border-[transparent] border-b-[#EFEFEF] pb-4 ">
            Order Summary
          </div>
          <div className="item-price flex justify-between items-center">
            <span className="text-[1.125rem]">Item total ({count}) </span>
            <span className="text-[1.125rem]">({count})</span>
          </div>
          <div className="delivery-fee flex justify-between items-center border border-[transparent] border-b-[#EFEFEF] pb-8 ">
            <span className="text-[1.125rem]">Delivery Free</span>
            <span className="text-[1.125rem]">({count})</span>
          </div>
          <div className="total flex justify-between items-center">
            <span className="text-[1.25rem]">Total</span>
            <span className="text-[1.25rem]">({count})</span>
          </div>
          <button className="bg-[var(--bg-color)] w-full py-5 px-16 rounded-[50px] text-[18px] mt-[18px] text-white">
            Proceed to checkout
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default Cart;
