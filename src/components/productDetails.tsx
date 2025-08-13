import { useProductContext } from "@/context/productContent";
import React from "react";
import { CloseSquare } from "react-iconly";
import { Link, useNavigate, useParams } from "react-router";

interface ProductItem {
  id: number;
  image: string;
  name: string;
  price: string;
  description: string;
  color: string;
}

interface ProductProps {
  products: ProductItem[];
}


const ProductDetails: React.FC<ProductProps> = () => {
  const navigate = useNavigate();
  const { products } = useProductContext();
  const {id} = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

if (!product) {
  return <div className="p-6">Product not found</div>;
}


  return (
    <div className="product w-full bg-white rounded-2xl mt-[90px] mb-4 p-6 flex flex-col gap-4">
      <div
        className="close-button cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <CloseSquare set="bold" />
      </div>
      <h2 className="title text-2xl font-bold">Product Details</h2>
      <div className="product_box w-full grid md:grid-cols-2 ">
<div className="image">
        <img src={product.image} alt={product.name} className="w-full h-auto" />
      </div>

      <div className="details">
        <span className="name pb-4 block">{product.name}</span>
        <span className="price pb-6 text-3xl font-semibold block">{product.price}</span>

        <p className="description pb-4 block">{product.description}</p>
        <span className="pb-4 block">Color: {product.color}</span>
        <div className="count flex w-full max-w-[250px] mx-auto mb-4 justify-between items-center gap-2 py-3 px-4 rounded-[0.75rem] bg-(--grey)">
          <button className="text-[1.5rem]">-</button>
          <span className="text-[1.5rem]">(count)</span>
          <button className="text-[1.5rem] ">+</button>
        </div>
        <button className="add-to-cart bg-[var(--bg-color)] w-full py-5 px-16 rounded-[50px] text-[18px] mt-[18px] text-white">
          Add to cart
        </button>
      </div>
      </div>
      
    </div>
  );
};

export default ProductDetails;
