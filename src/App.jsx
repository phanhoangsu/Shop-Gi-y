/**
 * Component gốc của ứng dụng
 * Quản lý routing và layout chính
 * Sử dụng CartProvider để quản lý state giỏ hàng toàn cục
 */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";

// Import các trang
import Admin from "./pages/Admin";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import KidsPage from "./pages/KidsPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import ManPage from "./pages/ManPage";
import NewsPage from "./pages/NewsPage";
import NotFoundPage from "./pages/NotFoundPage";
import WomenPage from "./pages/WomenPage";

function App() {
  return (
    // Bọc toàn bộ ứng dụng trong CartProvider để quản lý state giỏ hàng
    <CartProvider>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<HomePage />} />

        {/* Danh sách sản phẩm theo danh mục */}
        <Route path="/list" element={<ListPage />}>
          <Route path="man" element={<ManPage />} />
          <Route path="women" element={<WomenPage />} />
          <Route path="kids" element={<KidsPage />} />
        </Route>

        {/* Trang giỏ hàng */}
        <Route path="/cart" element={<CartPage />} />

        {/* Trang đăng nhập */}
        <Route path="/login" element={<LoginPage />} />

        {/* Trang tin tức */}
        <Route path="/news" element={<NewsPage />} />

        {/* Trang admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Trang 404 */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
