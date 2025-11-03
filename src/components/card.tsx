import { Heart } from "lucide-react";
import React, { useState } from "react";
interface CardProps {
  image?: string;
  name?: string;
  price?: string;
  lastPrice?: string;
}

const Card: React.FC<CardProps> = ({ image, name, price, lastPrice }) => {
  const handleAddToWishList = () => {
    setWishlisted(true);
  };
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  return (
    <div className="card h-auto min-h-[297px] flex flex-col items-center justify-center p-2 bg-white rounded-[0.75rem] relative">
      <Heart
        className={`absolute top-2 right-2 text-black z-10 ${
          wishlisted ? "bg-background" : "bg-transparent"
        } `}
        onClick={handleAddToWishList}
      />
      <img
        src={image}
        alt="hot deal image"
        className="w-[150px] h-[150px] block object-contain"
      />
      <div className="info flex flex-col justify-center items-center">
        <p className="text-light-black text-base md:text-[1.125rem]">{name}</p>
        <div className="price mx-[2rem] flex flex-col justify-center items-center">
          {price !== undefined && (
            <p className="text-base md:text-[20px] text-black font-semibold">
              {price}
            </p>
          )}
          <p className="last-price line-through text-light-black text-[0.7rem] md:text-[0.75rem]">
            {lastPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
