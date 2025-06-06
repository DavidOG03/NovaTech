import React, { useEffect, useRef } from "react";
import Card from "./components/card";
import Item from "./components/item";
import {gsap} from "gsap";

const Cart = ({ numberOfItems, count }) => {
  const cardsRef = useRef([]);
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
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
    <div className="cart-container flex justify-between items-start gap-5 flex-wrap">
      <div className="bg-white rounded-2xl px-[1.5rem] py-[1.825rem] flex-auto min-w-[520px] max-w-[700px]">
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
      <div className="order-summary flex-auto flex flex-col justify-center items-stretch gap-8 bg-white rounded-2xl px-[1.5rem] py-[1.825rem]">
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
      </div>

      <div className="similar-products flex flex-auto flex-col justify-start items-start flex-wrap gap-[10px] p-[30px] bg-white rounded-2xl  overflow-hidden">
        <div className="header w-full flex flex-auto justify-between items-center mb-[2rem]">
          <h1 className="text-[1.5rem]">Similar Products you may like</h1>
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
        <div className="similar-product-card flex justify-start items-center flex-wrap gap-[10px]">
          {similarProducts.map((product, index) => (
            <div
              ref={(el) =>
                (cardsRef.current[index + similarProducts.length] = el)
              }
              key={index}
              className="flex-auto "
            >
              <Card
                image={product.image}
                name={product.name}
                price={product.price}
                lastPrice={product.lastPrice}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
