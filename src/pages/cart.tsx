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
    updateOrder,
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
            <div className="flex justify-start items-center gap-1 text-black">
              Cart <span>({cartCount})</span>
            </div>
            <button
              className="flex justify-end items-center gap-1 text-black"
              onClick={clearCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 12 12"
              >
                <path
                  fill="currentColor"
                  d="M5 3h2a1 1 0 0 0-2 0M4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.441l-.443 5.17A2 2 0 0 1 7.623 11H4.377a2 2 0 0 1-1.993-1.83L1.941 4H1.5a.5.5 0 0 1 0-1zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zM5 5.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5"
                ></path>
              </svg>{" "}
              Delete
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
              <span className="text-light-black block">
                Your cart is empty.
              </span>
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
          <div className="border border-[transparent] border-b-[#EFEFEF] pb-4 text-black ">
            Order Summary
          </div>
          <div className="item-price flex justify-between items-center">
            <span className="text-[1.125rem] text-black">
              Item total {cart.length}{" "}
            </span>
            <span className="text-[1.125rem] text-black">
              {getCartTotal().toLocaleString()}
            </span>
          </div>
          <div className="delivery-fee flex justify-between items-center border border-[transparent] border-b-[#EFEFEF] pb-8 ">
            <span className="text-[1.125rem] text-black">Delivery Free</span>
            <span className="text-[1.125rem] text-black">
              {deliveryFee.toLocaleString()}
            </span>
          </div>
          <div className="total flex justify-between items-center">
            <span className="text-[1.25rem] text-black">Total</span>
            <span className="text-[1.25rem] text-black">
              {totalWithDelivery.toLocaleString()}
            </span>
          </div>
          <button
            className="bg-background w-full md:max-w-[400px] py-3 px-4 rounded-3xl text-[18px] mt-[18px] text-white hover:bg-pink cursor-pointer mx-auto"
            onClick={updateOrder}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
