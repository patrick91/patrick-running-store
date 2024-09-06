"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type TShirt = any;

interface CartContextType {
  cart: TShirt[];
  addToCart: (tshirt: TShirt) => void;
  removeFromCart: (tshirtId: string) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartItemCount: () => 0,
});

interface CartProviderProps {
  children: ReactNode;
}

// Create a provider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<TShirt[]>([]);

  const addToCart = (tshirt: TShirt) => {
    setCart((prevCart) => [...prevCart, tshirt]);
  };

  const removeFromCart = (tshirtId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== tshirtId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartItemCount = () => {
    return cart.length;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
