import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, color, size, quantity) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id && item.color === color && item.size === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.color === color && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, color, size, quantity }];
    });
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId, color, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === productId && item.color === color && item.size === size)
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
