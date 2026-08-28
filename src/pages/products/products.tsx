import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/button";
import Card from "../../components/ui/card";
import { gsap } from "gsap";
import { ChevronRightIcon } from "@/constants/icons";

import { useNavigate } from "react-router";
import { useSearch } from "@/context/SearchContext";
import { useProductContext } from "@/context/ProductContext";
import { Gadget } from "@/types/gadgets.types";
import { Category, DashboardProps } from "@/types/products.types";

// 3. Component
const Products: React.FC<DashboardProps> = ({ filterEnabled }) => {
  const { searchQuery } = useSearch();
  const { products, productsLoading } = useProductContext();
  const navigate = useNavigate();
  // 4. Typed refs and state
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [activeCategories, setActiveCategories] = useState<number[]>([]);

  // 5. GSAP on mount
  useEffect(() => {
    if (productsLoading) return;

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
      },
    );
  }, [productsLoading]);

  // 6. Your data
  const categories: Category[] = [
    { img: "/images/phones.png", alt: "phones", text: "Phones" },
    { img: "/images/laptop.png", alt: "laptops", text: "Laptops" },
    { img: "/images/tablets.png", alt: "tablets", text: "Tablets" },
    { img: "/images/consoles.png", alt: "console", text: "Consoles" },
    { img: "/images/watch.png", alt: "watch", text: "Accessories" },
  ];

  // 7. Filter logic
  const selectedCategoryNames = activeCategories
    .map((i) => categories[i]?.text)
    .filter((t): t is string => Boolean(t));

  const getProductCategory = (item: Gadget): string => {
    const content = `${item.name} ${item.description}`.toLowerCase();

    if (
      content.includes("iphone") ||
      content.includes("phone") ||
      content.includes("android")
    ) {
      return "Phones";
    }

    if (
      content.includes("laptop") ||
      content.includes("macbook") ||
      content.includes("notebook")
    ) {
      return "Laptops";
    }

    if (content.includes("tablet") || content.includes("ipad")) {
      return "Tablets";
    }

    if (
      content.includes("ps5") ||
      content.includes("playstation") ||
      content.includes("xbox") ||
      content.includes("console")
    ) {
      return "Consoles";
    }

    return "Accessories";
  };

  const filterList = (items: Gadget[]): Gadget[] =>
    items.filter((item) => {
      const byCategory =
        selectedCategoryNames.length === 0 ||
        selectedCategoryNames.includes(getProductCategory(item));
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

  const ProductSkeleton = () => (
    <div className="h-auto min-h-74.25 flex flex-col overflow-hidden bg-color border border-dim/25 rounded-lg p-3 animate-pulse">
      <div className="w-full aspect-square rounded-xl bg-text" />
      <div className="mt-4 space-y-3 w-full">
        <div className="h-4 rounded-full bg-text w-3/4" />
        <div className="h-4 rounded-full bg-text w-1/2" />
        <div className="h-3 rounded-full bg-text w-2/3" />
      </div>
    </div>
  );

  return (
    <div className="h-full w-auto pb-4 pt-20 md:pt-22.5">
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
                      : [...prev, idx],
                  )
                }
              />
            ))}
          </section>

          <div className="items-container overscroll-auto scrollbar-thin scrollbar-thumb-grey scrollbar-track-grey min-h-screen rounded-2xl">
            {/* Hot Deals */}
            <section className="hot-deals p-2 md:p-6 w-auto bg-color rounded-2xl mt-2">
              <div className="header flex justify-between items-center mb-8">
                <h1 className="text-2xl md:text-[1.5rem] text-accent-secondary font-semibold">
                  Hot Deals
                </h1>
                <span className="more flex justify-end items-center gap-2 text-dim cursor-pointer">
                  See More
                  <ChevronRightIcon className="text-[#515151]" />
                </span>
              </div>
              {productsLoading ? (
                <div className="deal-card w-full sm:w-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <ProductSkeleton key={`hot-skeleton-${idx}`} />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <p className="text-dim text-center mt-4 text-xl">No products</p>
              ) : (
                <div className="deal-card w-full sm:w-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredProducts.map((product, idx) => (
                    <div
                      key={product.id}
                      className="h-auto min-h-74.25 duration-300 hover:cursor-pointer  hover:border-dim/75 flex flex-col items-center justify-center  overflow-hidden cursor-pointer bg-color border border-dim/25 rounded-lg hover:shadow-lg transition-shadow"
                      ref={(el) => {
                        cardsRef.current[idx] = el;
                      }}
                      onClick={handleItemClick}
                      role="button"
                      tabIndex={0}
                    >
                      <Card
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        lastPrice={product.lastPrice}
                        onClick={() => navigate(`/product/${product.id}`)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Top Picks */}
            <section className="top-picks-section p-4 md:p-7.5 w-auto bg-color rounded-2xl mt-4">
              <div className="header flex justify-between items-center mb-8">
                <h1 className="text-2xl md:text-[1.5rem] text-accent-secondary font-semibold">
                  Top Picks
                </h1>
                <span className="more flex justify-end items-center gap-2 text-dim cursor-pointer">
                  See More
                  <ChevronRightIcon className="text-[#515151]" />
                </span>
              </div>
              {productsLoading ? (
                <div className="top-picks grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <ProductSkeleton key={`top-skeleton-${idx}`} />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <p className="text-dim text-center mt-4 text-xl">No products</p>
              ) : (
                <div className="top-picks grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredProducts.map((product, idx) => (
                    <div
                      key={product.id}
                      className="h-auto min-h-74.25 duration-300 hover:cursor-pointer hover:border-dim/75 flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-color border border-dim/25 rounded-lg hover:shadow-lg transition-shadow"
                      ref={(el: HTMLDivElement | null) => {
                        cardsRef.current[filteredProducts.length + idx] = el;
                      }}
                      onClick={handleItemClick}
                    >
                      <Card
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        lastPrice={product.lastPrice}
                        onClick={() => navigate(`/product/${product.id}`)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Promotional Banner Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-4">
              {/* Banner 1 */}
              <section className="bg-linear-to-r from-accent-light to-accent rounded-2xl p-8 text-color shadow-sm hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-color/20 backdrop-blur-sm rounded-full text-dim text-sm font-semibold">
                    Limited Time
                  </div>
                  <h3 className="text-3xl text-white font-bold">Flash Sale</h3>
                  <p className="text-dim">
                    Get up to 70% off on selected items
                  </p>
                  <button className="px-6 py-3 bg-color text-text rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
              </section>
              {/* Banner 2
              <section className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-color shadow-sm hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-color/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                    Free Shipping
                  </div>
                  <h3 className="text-3xl font-bold">Orders Over $50</h3>
                  <p className="text-color/90">
                    Enjoy free delivery on all eligible orders
                  </p>
                  <button className="px-6 py-3 bg-color text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
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
