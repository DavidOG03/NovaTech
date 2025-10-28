import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  quantity: number;
  description: string;
  color: string;
  lastPrice: string;
}

interface CartItem extends Product {
  count: number;
}

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartItemCount: (id: number, count: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      image: "/images/iphone.png",
      name: "Iphone 13 Pro",
      price: "N1,400,050",
      lastPrice: "N1,500,000",
      description:
        "512 GB, Fast charging, Wireless charging, Titanium body, 3,561 mAh battery, A18 Bionic chip, 48MP main camera, IOS 18, Face ID  ",
      quantity: 5,
      color: "Black",
    },
    {
      id: 2,
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      lastPrice: "N25,000",
      description:
        "Bluetooth 5.3, 20-hour battery life with case, Deep bass sound, Touch control, Noise reduction mic, Type-C fast charging, Ergonomic fit design",
      quantity: 5,
      color: "Black",
    },
    {
      id: 3,
      image: "/images/headphone.webp",
      name: "Sony Headphones",
      price: "N480,000",
      lastPrice: "N520,000",
      description:
        "Wireless over-ear design, Active Noise Cancellation, 30-hour battery life, Fast charging via USB-C, Hi-Res audio, Touch sensor controls, Built-in Alexa support",
      quantity: 5,
      color: "Black",
    },
    {
      id: 4,
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N520,000",
      description:
        "8-inch Full HD display, DualSense wireless controls, Wi-Fi connectivity, Adaptive triggers, Haptic feedback, Cloud & local gaming support, Long-lasting battery",
      color: "Black",
      quantity: 5,
    },
    {
      id: 5,
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      lastPrice: "N520,000",
      description:
        "256 GB storage, 12.4-inch Super AMOLED display, S Pen support, Snapdragon processor, 10,090 mAh battery, 45W fast charging, Android 14 OS, Quad speakers by AKG",
      quantity: 5,
      color: "Silver",
    },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from memory on mount
  useEffect(() => {
    const savedCart = (window as any).__cartData || [];
    setCart(savedCart);
  }, []);

  // Save cart to memory whenever it changes
  useEffect(() => {
    (window as any).__cartData = cart;
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prev, { ...product, count: 1 }];
    });
  };

  const updateCartItemCount = (id: number, count: number) => {
    if (count <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, count } : item))
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.count, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[N,]/g, ""));
      return total + price * item.count;
    }, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        updateCartItemCount,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
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
