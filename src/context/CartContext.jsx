// import React, { createContext, useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [cart, setCart] = useState(() => {
//     try {
//       const savedCart = localStorage.getItem("cart");
//       return savedCart ? JSON.parse(savedCart) : [];
//     } catch (error) {
//       console.error("Error parsing cart from localStorage:", error);
//       return [];
//     }
//   });

//   const [user, setUser] = useState(() => {
//     try {
//       const savedUser = localStorage.getItem("user");
//       return savedUser ? JSON.parse(savedUser) : null;
//     } catch (error) {
//       console.error("Error parsing user from localStorage:", error);
//       return null;
//     }
//   });

//   const [isLoggedIn, setIsLoggedIn] = useState(!!user);

//   useEffect(() => {
//     try {
//       localStorage.setItem("cart", JSON.stringify(cart));
//       localStorage.setItem("user", JSON.stringify(user));
//       setIsLoggedIn(!!user);
//     } catch (error) {
//       console.error("Error saving to localStorage:", error);
//     }
//   }, [cart, user]);

//   const addToCart = (item) => {
//     if (!item || !item.id || !item.quantity) return;
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }
//     setCart((prevCart) => {
//       const existingItem = prevCart.find(
//         (cartItem) =>
//           cartItem.id === item.id &&
//           cartItem.color === item.color &&
//           cartItem.size === item.size
//       );
//       if (existingItem) {
//         return prevCart.map((cartItem) =>
//           cartItem.id === item.id &&
//           cartItem.color === item.color &&
//           cartItem.size === item.size
//             ? {
//                 ...cartItem,
//                 quantity: Math.min(
//                   cartItem.quantity + item.quantity,
//                   cartItem.stock || 10
//                 ),
//               }
//             : cartItem
//         );
//       }
//       return [...prevCart, { ...item, stock: item.stock || 10 }];
//     });
//   };

//   const removeFromCart = (itemId, color, size) => {
//     setCart((prevCart) =>
//       prevCart.filter(
//         (item) =>
//           !(item.id === itemId && item.color === color && item.size === size)
//       )
//     );
//   };

//   const updateCartItemQuantity = (itemId, quantity, color, size) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === itemId && item.color === color && item.size === size
//           ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.stock) }
//           : item
//       )
//     );
//   };

//   const clearCart = () => setCart([]);

//   const login = async (username, password) => {
//     try {
//       if (!username || !password) {
//         throw new Error("Vui lòng nhập đầy đủ thông tin!");
//       }
//       const storedUsers =
//         JSON.parse(localStorage.getItem("registeredUsers")) || [];
//       const user = storedUsers.find(
//         (u) => u.username === username && u.password === password
//       );
//       if (!user) throw new Error("Sai tên đăng nhập hoặc mật khẩu!");
//       const token = "mock-token-" + Date.now();
//       setUser({ username, token, email: user.email });
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     clearCart();
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateCartItemQuantity,
//         clearCart,
//         isLoggedIn,
//         user,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Tạo context cho giỏ hàng
const CartContext = createContext();

// Provider để bao bọc toàn bộ ứng dụng và cung cấp context cho các component con
export const CartProvider = ({ children }) => {
  const navigate = useNavigate();

  // Khởi tạo state cho giỏ hàng từ localStorage (nếu có)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });

  // Khởi tạo state cho người dùng từ localStorage (nếu có)
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  // Trạng thái đăng nhập (true nếu có user, false nếu không có)
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  // Lưu giỏ hàng và thông tin người dùng vào localStorage khi state thay đổi
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(!!user); // Cập nhật trạng thái đăng nhập
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [cart, user]);

  // ➡️ Thêm sản phẩm vào giỏ hàng
  const addToCart = (item) => {
    if (!item || !item.id || !item.quantity) return; // Kiểm tra đầu vào hợp lệ

    if (!isLoggedIn) {
      navigate("/login"); // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
      return;
    }

    setCart((prevCart) => {
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại → Tăng số lượng (không vượt quá tồn kho)
        return prevCart.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
            ? {
                ...cartItem,
                quantity: Math.min(
                  cartItem.quantity + item.quantity,
                  cartItem.stock || 10 // Giới hạn theo tồn kho (nếu không có thì mặc định là 10)
                ),
              }
            : cartItem
        );
      }
      // Nếu sản phẩm chưa tồn tại → Thêm vào giỏ hàng
      return [...prevCart, { ...item, stock: item.stock || 10 }];
    });
  };

  // ➡️ Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (itemId, color, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.id === itemId && item.color === color && item.size === size)
      )
    );
  };

  // ➡️ Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateCartItemQuantity = (itemId, quantity, color, size) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.color === color && item.size === size
          ? {
              ...item,
              quantity: Math.min(Math.max(quantity, 1), item.stock), // Giới hạn trong khoảng từ 1 đến số lượng tồn kho
            }
          : item
      )
    );
  };

  // ➡️ Xóa toàn bộ giỏ hàng
  const clearCart = () => setCart([]);

  // ➡️ Xử lý đăng nhập người dùng
  const login = async (username, password) => {
    try {
      if (!username || !password) {
        throw new Error("Vui lòng nhập đầy đủ thông tin!"); // Kiểm tra thông tin nhập vào
      }

      // Lấy danh sách người dùng đã đăng ký từ localStorage
      const storedUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

      // Kiểm tra thông tin đăng nhập
      const user = storedUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) throw new Error("Sai tên đăng nhập hoặc mật khẩu!");

      // Tạo token giả để mô phỏng xác thực người dùng
      const token = "mock-token-" + Date.now();

      // Lưu thông tin người dùng vào state
      setUser({ username, token, email: user.email });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ➡️ Xử lý đăng xuất người dùng
  const logout = () => {
    setUser(null); // Xóa thông tin người dùng khỏi state
    clearCart(); // Xóa giỏ hàng khi đăng xuất
  };

  return (
    // ✅ Cung cấp context cho toàn bộ ứng dụng
    <CartContext.Provider
      value={{
        cart, // Danh sách sản phẩm trong giỏ hàng
        addToCart, // Thêm vào giỏ hàng
        removeFromCart, // Xóa sản phẩm khỏi giỏ hàng
        updateCartItemQuantity, // Cập nhật số lượng sản phẩm
        clearCart, // Xóa toàn bộ giỏ hàng
        isLoggedIn, // Kiểm tra trạng thái đăng nhập
        user, // Thông tin người dùng
        login, // Xử lý đăng nhập
        logout, // Xử lý đăng xuất
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ➡️ Hook để sử dụng context trong các component con
export const useCart = () => useContext(CartContext);
