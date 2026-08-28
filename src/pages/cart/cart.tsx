import React, { useEffect, useRef } from "react";
import Card from "../../components/ui/card.js";
import Item from "../../components/ui/ProductItem.js";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { useProductContext } from "@/context/ProductContext.js";
import { TrashIcon } from "@/constants/icons";
import toast from "react-hot-toast";
import { Trash2Icon } from "lucide-react";

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

  const totalCount = getCartTotal();
  const deliveryFee = Math.ceil(0.001 * totalCount);
  const totalWithDelivery = totalCount + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    updateOrder(); // your existing order logic
    toast.success("Items have been added to your order page!");
  };

  return (
    <div className="cart-container gap-5 min-h-screen w-full pt-22.5 pb-8 ">
      <div className="header flex flex-col xl:flex-row justify-center gap-4 mb-6">
        <div className="bg-color rounded-2xl p-4 md:px-6 md:py-[1.825rem] flex-auto lg:min-w-130">
          <div className="flex justify-between items-center pb-4 border border-transparent border-b-dim/50 ">
            <div className="flex justify-start items-center gap-1 text-accent-secondary">
              Cart <span>({cart.length})</span>
            </div>
            <button
              className="flex justify-end items-center gap-1 text-accent-secondary"
              onClick={clearCart}
            >
              <Trash2Icon color="#444" /> Delete
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
              <Link
                to="/products"
                className="text-accent-secondary hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="w-full min-h-50 flex flex-col justify-center items-center">
              <span className="text-dim block">Your cart is empty.</span>
              <Link
                to="/products"
                className="text-accent-light hover:underline block mt-4"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
        <div className="order-summary flex-auto flex flex-col justify-center items-stretch gap-8 bg-color rounded-2xl p-4 md:px-6 md:py-[1.825rem]">
          <div className="border border-transparent border-b-dim/50 pb-4 text-accent-secondary ">
            Order Summary
          </div>
          <div className="item-price flex justify-between items-center">
            <span className="text-[1.125rem] text-accent-secondary">
              Item total {cart.length}{" "}
            </span>
            <span className="text-[1.125rem] text-accent-secondary">
              {getCartTotal().toLocaleString()}
            </span>
          </div>
          <div className="delivery-fee flex justify-between items-center border border-transparent border-b-dim/50 pb-8 ">
            <span className="text-[1.125rem] text-accent-secondary">
              Delivery Free
            </span>
            <span className="text-[1.125rem] text-accent-secondary">
              {deliveryFee.toLocaleString()}
            </span>
          </div>
          <div className="total flex justify-between items-center">
            <span className="text-[1.25rem] text-accent-secondary">Total</span>
            <span className="text-[1.25rem] text-accent-secondary">
              {totalWithDelivery.toLocaleString()}
            </span>
          </div>
          <button
            className="bg-accent w-full md:max-w-100 py-3 px-4 rounded-3xl text-[18px] mt-4.5 text-white hover:bg-accent-light cursor-pointer mx-auto"
            onClick={handleCheckout}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
