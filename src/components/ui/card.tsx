import { Heart } from "lucide-react";
import React, { useState } from "react";
interface CardProps {
  image?: string;
  name?: string;
  price?: string;
  lastPrice?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  image,
  name,
  price,
  lastPrice,
  onClick,
}) => {
  const handleAddToWishList = () => {
    setWishlisted(true);
  };
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  return (
    <div
      className="h-auto w-full min-h-74.25 flex flex-col items-center justify-center p-2 bg-card rounded-xl relative cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) onClick();
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <Heart
        className={`absolute top-2 right-1.5 text-accent-secondary z-10 ${
          wishlisted ? "bg-accent" : "bg-transparent"
        } `}
        onClick={handleAddToWishList}
      />
      <img
        src={image}
        alt="hot deal image"
        className="w-full h-37.5  object-contain"
      />
      <div className="info flex flex-col justify-center items-center">
        <p className="text-dim text-base md:text-[1.125rem]">{name}</p>
        <div className="price mx-8 flex flex-col justify-center items-center">
          {price !== undefined && (
            <p className="text-base md:text-[20px] text-accent-secondary font-semibold">
              {price}
            </p>
          )}
          <p className="last-price line-through text-dim text-[0.7rem] md:text-[0.75rem]">
            {lastPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
