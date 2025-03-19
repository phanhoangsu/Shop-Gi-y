import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
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
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />}>
          <Route path="man" element={<ManPage />} />
          <Route path="women" element={<WomenPage />} />
          <Route path="kids" element={<KidsPage />} />
        </Route>

        <Route path="/cart" element={<CartPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
