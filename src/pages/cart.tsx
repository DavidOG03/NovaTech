import React, { useEffect, useRef } from "react";
import Card from "../components/card.js";
import Item from "../components/item.js";
import { useProductContext } from "@/context/ProductContext.js";

interface CartProps {
  numberOfItems: number;
  count: number;
}

const Cart: React.FC<CartProps> = ({ numberOfItems, count }) => {
  const {
    cart,
    removeFromCart,
    updateCartItemCount,
    getCartTotal,
    getCartCount,
    clearCart,
  } = useProductContext();

  const cartCount = getCartCount();
  const totalCount = getCartTotal();

  const deliveryFee = Math.ceil(0.001 * totalCount);
  const totalWithDelivery = totalCount + deliveryFee;
  return (
    <div className="cart-container gap-5 min-h-screen w-full pt-[90px] pb-8 ">
      <div className="header flex flex-col xl:flex-row justify-center gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 md:px-[1.5rem] md:py-[1.825rem] flex-auto lg:min-w-[520px]">
          <div className="flex justify-between items-center pb-4 border border-[transparent] border-b-[#EFEFEF] ">
            <div className="flex justify-start items-center gap-1">
              Cart <span>({cartCount})</span>
            </div>
            <button
              className="flex justify-end items-center gap-1"
              onClick={clearCart}
            >
              <img src="/images/delete.svg" alt="delete icon" /> Delete
            </button>
          </div>
          {cart.length > 0 ? (
            <div className="pt-4 flex flex-col gap-4">
              {cart.map((item) => (
                <Item
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  count={item.count}
                  onUpdateQuantity={(newQuantity) =>
                    updateCartItemCount(item.id, newQuantity)
                  }
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="w-full min-h-[200px] flex flex-col justify-center items-center">
              <span className="text-gray-500 block">Your cart is empty.</span>
              <a
                href="/products"
                className="text-pink hover:underline block mt-4"
              >
                Start Shopping
              </a>
            </div>
          )}
        </div>
        <div className="order-summary flex-auto flex flex-col justify-center items-stretch gap-8 bg-white rounded-2xl p-4 md:px-[1.5rem] md:py-[1.825rem]">
          <div className="border border-[transparent] border-b-[#EFEFEF] pb-4 ">
            Order Summary
          </div>
          <div className="item-price flex justify-between items-center">
            <span className="text-[1.125rem]">Item total {cart.length} </span>
            <span className="text-[1.125rem]">
              {getCartTotal().toLocaleString()}
            </span>
          </div>
          <div className="delivery-fee flex justify-between items-center border border-[transparent] border-b-[#EFEFEF] pb-8 ">
            <span className="text-[1.125rem]">Delivery Free</span>
            <span className="text-[1.125rem]">
              {deliveryFee.toLocaleString()}
            </span>
          </div>
          <div className="total flex justify-between items-center">
            <span className="text-[1.25rem]">Total</span>
            <span className="text-[1.25rem]">
              {totalWithDelivery.toLocaleString()}
            </span>
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
