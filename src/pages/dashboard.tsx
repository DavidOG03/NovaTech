import React, { useEffect, useRef, useState } from "react";
import Button from "../components/button";
import Card from "../components/card";
import { gsap } from "gsap";
// import Product from "../components/productDetails";
import { Link } from "react-router";

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
  // handleClosePopup?: () => void;
  // isItemClicked?: boolean;
  // setIsItemClicked?: (value: boolean) => void;
  // cardsRef?: React.RefObject<Array<HTMLDivElement | null>>;
  // activeCategories?: number[];
  // setActiveCategories?: React.Dispatch<React.SetStateAction<number[]>>;
}

// 3. Component
const Dashboard: React.FC<DashboardProps> = ({
  filterEnabled,
  searchQuery = "",
}) => {
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
      name: "Iphone 16 Pro",
      price: "N1,400,050",
      lastPrice: "N1,600,050",
      category: "Phones",
    },
    {
      id: 2,
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      lastPrice: "N26,000",
      category: "Accessories",
    },
    {
      id: 3,
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N550,000",
      category: "Consoles",
    },
    {
      id: 4,
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      lastPrice: "N550,000",
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
                <h1 className="text-2xl md:text-[1.5rem] font-semibold">
                  Hot Deals
                </h1>
                <span className="more flex justify-end items-center gap-2 text-[#515151] cursor-pointer">
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
            </section>

            {/* Top Picks */}
            <section className="top-picks-section p-4 md:p-[30px] w-auto bg-white rounded-2xl mt-4">
              <div className="header flex justify-between items-center mb-[2rem]">
                <h1 className="text-2xl md:text-[1.5rem] font-semibold">
                  Top Picks
                </h1>
                <span className="more flex justify-end items-center gap-2 text-(--light-black) cursor-pointer">
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
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
