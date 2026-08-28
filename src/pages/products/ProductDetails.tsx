import { useProductContext } from "../../context/ProductContext";
import React, { useState } from "react";
import { CloseSquare } from "react-iconly";
import { Link, useNavigate, useParams } from "react-router";
import Card from "../../components/ui/card";
import toast from "react-hot-toast";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { products, addToCart } = useProductContext();
  const { id } = useParams<{ id: string }>();

  // Find the product by ID
  const product = products.find((p) => p.id === id);

  // Local state for quantity to add
  const [count, setCount] = useState<number>(1);

  // Check if this product is already in cart and get its quantity
  const productInCart = useProductContext().cart.find(
    (item) => item.id === product?.id,
  );
  const currentCartQuantity = productInCart ? productInCart.count : 0;

  if (!product) {
    return (
      <div className="p-6 mt-22.5 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-accent text-color px-6 py-3 rounded-full"
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
    toast.success(`${count} x ${product.name} added to cart!`);
    // Reset count after adding
    setCount(1);
  };

  return (
    <div className="product w-full bg-color rounded-2xl mb-4 mt-22.5 p-6 py-0 flex flex-col gap-4">
      <div
        className="inline-flex gap-2 items-center max-w-27.5 cursor-pointer text-text hover:bg-dim/95 p-2 rounded-lg transition-colors"
        onClick={() => navigate(-1)}
      >
        <span>←</span>Go Back
      </div>
      <div className=" w-full grid md:grid-cols-2 gap-8">
        <div className="image h-full object-cover">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="details flex flex-col">
          <span className="name pb-3 block text-3xl font-medium text-text capitalize">
            {product.name}
          </span>
          <span className="price pb-6 text-2xl text-accent-secondary font-semibold block ">
            {product.price}
          </span>

          <p className="description pb-3 block text-dim">
            {product.description}
          </p>
          <span className="pb-6 block text-dim">
            <span className="font-semibold text-dim">Color:</span>{" "}
            {product.color}
          </span>

          {/* Show current cart quantity if item is in cart */}
          {currentCartQuantity > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-green-700 text-sm">
                ✓ {currentCartQuantity}{" "}
                {currentCartQuantity === 1 ? "item" : "items"} already in cart
              </p>
            </div>
          )}

          <div className="flex flex-col justify-between items-start gap-4 mt-auto">
            <div className="count flex w-full md:max-w-45 justify-between items-center gap-2 py-2 px-3 rounded-xl bg-card border border-dim/25">
              <button
                className="text-[1.5rem] cursor-pointer px-2 text-accent-secondary/50 transition-colors"
                onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className="text-[1rem] text-dim font-semibold min-w-7.5 text-center">
                {count}
              </span>
              <button
                className="text-[1.5rem] cursor-pointer px-2 text-accent-secondary/50 transition-colors"
                onClick={() => setCount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              className="add-to-cart bg-accent w-full md:max-w-75 md:flex-1 py-3 px-6 rounded-[50px] text-base text-white cursor-pointer hover:opacity-90 transition-opacity font-semibold"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="text-accent-light mt-6 text-left hover:underline"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="similar-products mt-8">
        <h3 className="text-xl text-text font-semibold mb-4">
          You might also like
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="cursor-pointer bg-card border border-dim/25 hover:border-dim/75 transition-colors rounded-lg"
              >
                <Card
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  lastPrice={item.lastPrice}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
