import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  description: string;
  color: string;
}

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      image: "/images/iphone.png",
      name: "Iphone 16 Pro",
      price: "N1,400,050",
      description: "Latest model of Iphone",
      color: "Black",
    },
    {
      id: 2,
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      description: "High-quality wireless earbuds",
      color: "White",
    },
    {
      id: 3,
      image: "/images/headphone.webp",
      name: "Sony Headphones",
      price: "N480,000",
      description: "Noise-cancelling over-ear headphones",
      color: "Silver",
    },
    {
      id: 4,
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      description: "Portable gaming console",
      color: "Black",
    },
    {
      id: 5,
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      description: "Latest model of Samsung tablet",
      color: "Silver",
    },
  ]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
