import React, { useEffect, useRef, useState } from "react";
import Button from "../components/button";
import Card from "../components/card";
import { gsap } from "gsap";
// import Product from "../components/productDetails";
import { Link } from "react-router";
import { useSearch } from "@/context/SearchContext";

interface Category {
  img: string;
  alt: string;
  text: string;
}

interface ProductItem {
  id: number;
  image: string;
  name: string;
  price: string;
  lastPrice: string;
  category: string;
}

// 2. Component props
interface DashboardProps {
  filterEnabled: boolean;
  searchQuery?: string;
  handleItemClick?: () => void;
}

// 3. Component
const Products: React.FC<DashboardProps> = ({ filterEnabled }) => {
  const { searchQuery } = useSearch();
  // 4. Typed refs and state
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [activeCategories, setActiveCategories] = useState<number[]>([]);

  // 5. GSAP on mount
  useEffect(() => {
    const elements = cardsRef.current.filter(Boolean);
    gsap.fromTo(
      elements,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
        stagger: 0.125,
      }
    );
  }, []);

  // 6. Your data
  const categories: Category[] = [
    { img: "/images/phones.png", alt: "phones", text: "Phones" },
    { img: "/images/laptop.png", alt: "laptops", text: "Laptops" },
    { img: "/images/tablets.png", alt: "tablets", text: "Tablets" },
    { img: "/images/consoles.png", alt: "console", text: "Consoles" },
    { img: "/images/watch.png", alt: "watch", text: "Accessories" },
  ];

  const products: ProductItem[] = [
    {
      id: 1,
      image: "/images/iphone.png",
      name: "Iphone 13 Pro",
      price: "N1,400,050",
      lastPrice: "N1,500,000",
      category: "Phones",
    },
    {
      id: 2,
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      lastPrice: "N25,000",
      category: "Accessories",
    },
    {
      id: 3,
      image: "/images/headphone.webp",
      name: "Sony Headphones",
      price: "N480,000",
      lastPrice: "N520,000",
      category: "Accessories",
    },
    {
      id: 4,
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N520,000",
      category: "Consoles",
    },
    {
      id: 5,
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      lastPrice: "N520,000",
      category: "Tablets",
    },
  ];

  // 7. Filter logic
  const selectedCategoryNames = activeCategories
    .map((i) => categories[i]?.text)
    .filter((t): t is string => Boolean(t));

  const filterList = (items: ProductItem[]): ProductItem[] =>
    items.filter((item) => {
      const byCategory =
        selectedCategoryNames.length === 0 ||
        selectedCategoryNames.includes(item.category);
      const bySearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return byCategory && bySearch;
    });

  const filteredProducts = filterList(products);

  const [isItemClicked, setIsItemClicked] = useState<boolean>(false);

  // Handle item click
  const handleItemClick = () => {
    setIsItemClicked(true);
  };
  const handleClosePopup = () => {
    setIsItemClicked(false);
  };

  return (
    <div className="h-full w-auto pb-4 pt-[80px] md:pt-[90px]">
      {/* Categories */}
      {!isItemClicked && (
        <>
          <section
            className={`category w-full justify-start items-center gap-4 pb-2 mb-4 scroll-p-4 snap-x snap-start lg:snap-none overflow-auto ${
              filterEnabled ? "hidden" : "flex"
            }`}
          >
            {categories.map((category, idx) => (
              <Button
                key={idx}
                img={category.img}
                altText={category.alt}
                text={category.text}
                isActive={activeCategories.includes(idx)}
                onClick={() =>
                  setActiveCategories((prev) =>
                    prev.includes(idx)
                      ? prev.filter((i) => i !== idx)
                      : [...prev, idx]
                  )
                }
              />
            ))}
          </section>

          <div className="items-container overscroll-auto scrollbar-thin scrollbar-thumb-grey scrollbar-track-grey min-h-[100vh] rounded-2xl">
            {/* Hot Deals */}
            <section className="hot-deals p-2 md:p-[1.5rem] w-auto bg-white rounded-2xl mt-2">
              <div className="header flex justify-between items-center mb-[2rem]">
                <h1 className="text-2xl md:text-[1.5rem] text-black font-semibold">
                  Hot Deals
                </h1>
                <span className="more flex justify-end items-center gap-2 text-light-black cursor-pointer">
                  See More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#515151"
                      d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                    />
                  </svg>
                </span>
              </div>
              {filteredProducts.length === 0 ? (
                <p className="text-light-black text-center mt-4 text-xl">
                  No products
                </p>
              ) : (
                <div className="deal-card w-full sm:w-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredProducts.map((product, idx) => (
                    <div
                      key={product.id}
                      className="h-auto min-h-[297px] duration-300 hover:cursor-pointer  hover:border-[#f0f0f0] flex flex-col items-center justify-center  overflow-hidden cursor-pointer bg-white border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-shadow"
                      ref={(el) => {
                        cardsRef.current[idx] = el;
                      }}
                      onClick={handleItemClick}
                      role="button"
                      tabIndex={0}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        className="w-full h-full flex flex-col items-center justify-center"
                      >
                        <Card
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          lastPrice={product.lastPrice}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Top Picks */}
            <section className="top-picks-section p-4 md:p-[30px] w-auto bg-white rounded-2xl mt-4">
              <div className="header flex justify-between items-center mb-[2rem]">
                <h1 className="text-2xl md:text-[1.5rem] text-black font-semibold">
                  Top Picks
                </h1>
                <span className="more flex justify-end items-center gap-2 text-light-black cursor-pointer">
                  See More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#515151"
                      d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                    />
                  </svg>
                </span>
              </div>
              {filteredProducts.length === 0 ? (
                <p className="text-light-black text-center mt-4 text-xl">
                  No products
                </p>
              ) : (
                <div className="top-picks grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="h-auto min-h-[297px] duration-300 hover:cursor-pointer hover:border-[#f0f0f0] flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-white border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-shadow"
                      ref={(el: HTMLDivElement | null) => {
                        cardsRef.current[filteredProducts.length + product.id] =
                          el;
                      }}
                      onClick={handleItemClick}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        className="w-full h-full flex flex-col items-center justify-center"
                      >
                        <Card
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          lastPrice={product.lastPrice}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Promotional Banner Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {/* Banner 1 */}
              <section className="bg-gradient-to-r from-pink to-background rounded-2xl p-8 text-white shadow-sm hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                    Limited Time
                  </div>
                  <h3 className="text-3xl font-bold">Flash Sale</h3>
                  <p className="text-white/90">
                    Get up to 70% off on selected items
                  </p>
                  <button className="px-6 py-3 bg-white text-pink rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
              </section>
              {/* Banner 2
              <section className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white shadow-sm hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                    Free Shipping
                  </div>
                  <h3 className="text-3xl font-bold">Orders Over $50</h3>
                  <p className="text-white/90">
                    Enjoy free delivery on all eligible orders
                  </p>
                  <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Learn More
                  </button>
                </div>
              </section> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
