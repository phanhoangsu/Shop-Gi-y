import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import KidsPage from "./pages/KidsPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import ManPage from "./pages/ManPage";
import NewsPage from "./pages/NewsPage";
import NotFoundPage from "./pages/NotFoundPage";
import WomenPage from "./pages/WomenPage";
import RegisterPage from "./pages/RegisterPage";
import Admin from "./pages/Admin";

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
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/detail" element={<DetailPage />} />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
