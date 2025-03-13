import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(!!user);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [cart, user]);

  const addToCart = (item) => {
    if (!item || !item.id || !item.quantity) return;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
            ? {
                ...cartItem,
                quantity: Math.min(
                  cartItem.quantity + item.quantity,
                  cartItem.stock || 10
                ),
              }
            : cartItem
        );
      }
      return [...prevCart, { ...item, stock: item.stock || 10 }];
    });
  };

  const removeFromCart = (itemId, color, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.id === itemId && item.color === color && item.size === size)
      )
    );
  };

  const updateCartItemQuantity = (itemId, quantity, color, size) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.color === color && item.size === size
          ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.stock) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const login = async (username, password) => {
    try {
      if (!username || !password) {
        throw new Error("Vui lòng nhập đầy đủ thông tin!");
      }
      const storedUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const user = storedUsers.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) throw new Error("Sai tên đăng nhập hoặc mật khẩu!");
      const token = "mock-token-" + Date.now();
      setUser({ username, token, email: user.email });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
