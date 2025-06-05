import React from "react";

const Button = ({ img, altText, text }) => {
  return (
    <button className="button flex justify-center items-center border-0 rounded-[3rem] bg-linear-to-br from-(--bg-pink) to-(--bg-color) transition-all duration-150 hover:bg-linear-to-br hover:from-white hover:to-white cursor-pointer hover:text-black text-white py-[11px] px-[2.25rem]">
      <img src={img} alt={altText} />
      {text}
    </button>
  );
};

export default Button;
