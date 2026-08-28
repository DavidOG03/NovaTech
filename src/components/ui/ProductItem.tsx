import React, { useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { TrashIcon } from "@/constants/icons";

interface ItemProps {
  image: string;
  price: string;
  name: string;
  count: number;
  onUpdateQuantity?: (quantity: number) => void;
  onRemove?: () => void;
  // productCount: number;
}

const ProductItem: React.FC<ItemProps> = ({
  image,
  price,
  name,
  count,
  onUpdateQuantity,
  onRemove,
}) => {
  const [itemCount, setItemCount] = useState(count);

  // const handleCountChange = (newCount: number) => {
  //   if (newCount >= 0) {
  //     setItemCount(newCount);
  //   }
  // };

  const { updateCartItemCount, removeFromCart, getCartCount } =
    useProductContext();

  // const cartCount = getCartCount();

  const handleDecrease = () => {
    if (itemCount > 1) {
      const newCount = itemCount - 1;
      setItemCount(newCount);
      onUpdateQuantity?.(newCount);
    }
  };

  const handleIncrease = () => {
    const newCount = itemCount + 1;
    setItemCount(newCount);
    onUpdateQuantity?.(newCount);
  };

  return (
    <div className="cart flex flex-col md:flex-row justify-start md:justify-between lg:justify-between lg:items-center gap-4 w-full">
      <div className="left flex justify-start items-center gap-5">
        <div className="image grid place-items-center object-cover w-25 h-[100px] bg-text rounded-[0.75rem]">
          <img src={image} alt={name} className="object-cover w-full" />
        </div>
        <div className="info flex flex-col justify-center items-start gap-2 md:gap-2">
          <span className="text-accent-secondary text-[18px] md:text-[1.25rem]">
            {name}
          </span>
          <span className="text-[1.25rem] text-dim">{price}</span>
        </div>
      </div>
      <div className="right flex flex-col justify-center items-center md:items-end gap-2">
        <div className="count flex w-full max-w-125 mx-auto flex-auto justify-between items-center gap-2 py-3 px-4 rounded-xl bg-card">
          <button
            className="text-[1.5rem] text-accent-secondary cursor-pointer"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="text-base text-accent-secondary px-1">
            {itemCount}
          </span>
          <button
            className="text-[1.5rem] text-accent-secondary cursor-pointer"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <div className="remove-item flex justify-end items-center gap-1.5 cursor-pointer rounded-xl p-2 bg-accent-light">
          <TrashIcon color="#fff" />
          <button
            className="text-white text-base bg-transparent"
            onClick={onRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
