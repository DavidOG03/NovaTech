// import React, { createContext, useContext, useState, useEffect } from "react";

// interface CartItem {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
//   quantity: number;
//   description?: string;
//   color?: string;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: Omit<CartItem, "quantity">) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
//   getCartCount: () => number;
//   getCartTotal: () => number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Load cart from memory on mount
//   useEffect(() => {
//     const savedCart = (window as any).__cartData || [];
//     setCartItems(savedCart);
//   }, []);

//   // Save cart to memory whenever it changes
//   useEffect(() => {
//     (window as any).__cartData = cartItems;
//   }, [cartItems]);

//   const addToCart = (item: Omit<CartItem, "quantity">) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id);

//       if (existingItem) {
//         // Item already in cart, increase quantity
//         return prevItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       } else {
//         // New item, add to cart with quantity 1
//         return [...prevItems, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: number, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(id);
//       return;
//     }

//     setCartItems((prevItems) =>
//       prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const getCartCount = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   const getCartTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const price = parseFloat(item.price.replace(/[N,]/g, ""));
//       return total + price * item.quantity;
//     }, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         getCartCount,
//         getCartTotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
