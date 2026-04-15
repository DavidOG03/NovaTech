import type React from "react";

export interface RawGadget {
  id: string;
  image?: string;
  name?: string;
  price?: string;
  lastPrice?: string;
  description?: string;
  quantity?: number;
  color?: string;
}

export interface Gadget {
  id: string;
  image: string;
  name: string;
  price: string;
  lastPrice: string;
  description: string;
  quantity: number;
  color: string;
}

export interface CartItem extends Gadget {
  count: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
}

export interface ProductContextType {
  products: Gadget[];
  setProducts: React.Dispatch<React.SetStateAction<Gadget[]>>;
  productsLoading: boolean;
  cart: CartItem[];
  addToCart: (product: Gadget) => void;
  updateCartItemCount: (id: string, count: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  clearOrders: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  orders: Order[];
  updateOrder: () => void;
}
