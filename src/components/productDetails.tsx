import { useProductContext } from "../context/ProductContext";
import React, { useState } from "react";
import { CloseSquare } from "react-iconly";
import { useNavigate, useParams } from "react-router";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { products, addToCart } = useProductContext();
  const { id } = useParams<{ id: string }>();

  // Find the product by ID
  const product = products.find((p) => p.id === Number(id));

  const [count, setCount] = useState<number>(1);

  if (!product) {
    return (
      <div className="p-6 mt-[90px] text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-[var(--bg-color)] text-white px-6 py-3 rounded-full"
        >
          Go back to home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add the product to cart multiple times based on count
    for (let i = 0; i < count; i++) {
      addToCart(product);
    }
    alert(`${count} x ${product.name} added to cart!`);
    // Reset count after adding
    setCount(1);
  };

  return (
    <div className="product w-full bg-white rounded-2xl mb-4 mt-[90px] p-6 flex flex-col gap-4">
      <div className="close-button cursor-pointer" onClick={() => navigate(-1)}>
        <CloseSquare set="bold" />
      </div>
      <div className="product_box w-full grid md:grid-cols-2 gap-8">
        <div className="image object-cover">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="details flex flex-col">
          <span className="name pb-4 block text-2xl font-bold">
            {product.name}
          </span>
          <span className="price pb-6 text-3xl font-semibold block text-[var(--bg-color)]">
            {product.price}
          </span>

          <p className="description pb-4 block text-gray-600">
            {product.description}
          </p>
          <span className="pb-6 block">
            <span className="font-semibold">Color:</span> {product.color}
          </span>

          <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mt-auto">
            <div className="count flex w-full md:max-w-[180px] justify-between items-center gap-2 py-3 px-4 rounded-[0.75rem] bg-[#F5F5F5] border border-gray-200">
              <button
                className="text-[1.5rem] cursor-pointer px-2 hover:text-[var(--bg-color)] transition-colors"
                onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className="text-[1rem] font-semibold min-w-[30px] text-center">
                {count}
              </span>
              <button
                className="text-[1.5rem] cursor-pointer px-2 hover:text-[var(--bg-color)] transition-colors"
                onClick={() => setCount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              className="add-to-cart bg-[var(--bg-color)] w-full md:flex-1 py-3 px-6 rounded-[50px] text-base text-white cursor-pointer hover:opacity-90 transition-opacity font-semibold"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>

          <button
            onClick={() => navigate("/")}
            className="text-[var(--bg-color)] mt-6 text-left hover:underline"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="similar-products mt-8">
        <h3 className="text-xl font-semibold mb-4">You might also like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="cursor-pointer bg-white border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-shadow"
              >
                <div className="h-auto grid place-content-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-contain  rounded-md mb-2"
                  />
                </div>

                <h4 className="text-sm font-semibold truncate">{item.name}</h4>
                <p className="text-sm text-[var(--bg-color)] font-semibold">
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
