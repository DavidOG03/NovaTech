import React from "react";

interface ButtonProps {
  img: string;
  altText: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({
  img,
  altText,
  text,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`button flex justify-center items-center border-0 rounded-[3rem] transition-all duration-150 cursor-pointer py-0.5 px-9 ${
        isActive
          ? "bg-accent-secondary text-white"
          : "bg-linear-to-br from-accent-light to-accent text-white hover:opacity-85"
      }`}
      type="button"
    >
      <img src={img} alt={altText} className="mr-2" />
      {text}
    </button>
  );
};

export default Button;
