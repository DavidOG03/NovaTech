import React from "react";

interface ItemProps {
  image: string;
  price: string;
  name: string;
  count: number;
}

const Item: React.FC<ItemProps> = ({ image, price, name, count }) => {
  return (
    <div className="cart flex flex-col md:flex-row justify-start lg:justify-between lg:items-center gap-4 w-full">
      <div className="left flex justify-start items-center gap-[1.25rem]">
        <div className="image grid place-items-center w-[100px] h-[100px] bg-(--grey) rounded-[0.75rem]">
          <img src={image} alt={name} />
        </div>
        <div className="info flex flex-col justify-center items-start gap-2 md:gap-2">
          <span className="text-(--light-black) text-[18px] md:text-[1.25rem]">
            {name}
          </span>
          <span className="text-[1.25rem]">{price}</span>
        </div>
      </div>
      <div className="right flex flex-col justify-center items-center md:items-end gap-5">
        <div className="count flex w-full max-w-[500px] mx-auto flex-auto justify-between items-center gap-2 py-3 px-4 rounded-[0.75rem] bg-(--grey)">
          <button className="text-[1.5rem]">-</button>
          <span className="text-[1.5rem]">({count})</span>
          <button className="text-[1.5rem] ">+</button>
        </div>
        <div className="remove-item flex justify-end items-center gap-[6px]">
          <img src="/images/delete_disabled.svg" alt="Delete Icon" />
          <p className="text-(--light-black) text-base">Remove</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
