import React, { useState } from "react";

const Button = ({ img, altText, text, isActive }) => {
  
  return (
    <button className={`button flex justify-center items-center border-0 rounded-[3rem]  transition-all duration-150  cursor-pointer text-black py-[11px] px-[2.25rem] ${isActive ? "bg-linear-to-br from-(--bg-pink) to-(--bg-color) hover:bg-linear-to-br hover:from-white hover:to-white hover:text-black text-white" : "bg-white text-black hover:bg-(--grey)"}`}>
      <img src={img} alt={altText} />
      {text}
    </button>
  );
};

export default Button;
