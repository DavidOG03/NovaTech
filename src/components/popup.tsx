import React from "react";
import { CloseSquare } from "react-iconly";
interface PopupProps {
  image: string;
  handleItemClose: () => void;

}
const Popup: React.FC<PopupProps> = ({ image, handleItemClose }) => {
  return (
    <div className="popup z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-4">
      <div className="close-button cursor-pointer" onClick={handleItemClose}>
        <CloseSquare set="bold" />
      </div>
      <h2 className="title">Product Details</h2>
      <div className="image">
        <img src={image} alt="Popup Image" />
      </div>

      <div className="details">
        <span className="name">Product Name</span>
        <span className="price">Product Price</span>

        <p className="description">Product Description</p>
        <span>Color: Product Color</span>
        <div className="count flex w-full max-w-[250px] mx-auto flex-auto justify-between items-center gap-2 py-3 px-4 rounded-[0.75rem] bg-(--grey)">
          <button className="text-[1.5rem]">-</button>
          <span className="text-[1.5rem]">(count)</span>
          <button className="text-[1.5rem] ">+</button>
        </div>
        <button className="add-to-cart bg-[var(--bg-color)] w-full py-5 px-16 rounded-[50px] text-[18px] mt-[18px] text-white">Add to cart</button>
      </div>
    </div>
  );
};

export default Popup;
