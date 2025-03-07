import "./App.css";
import { Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/homePage";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ManPage from "./pages/ManPage";
import WomenPage from "./pages/WomenPage";
import KidsPage from "./pages/KidsPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/list" element={<ListPage />}>
          <Route path="man" element={<ManPage />} />
          <Route path="women" element={<WomenPage />} />
          <Route path="kids" element={<KidsPage />} />
        </Route>

        {/* <Route path="/detail" element={<DetailPage />} /> */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/*" element={<h1>NOT FOUND</h1>} />
      </Routes>
    </>
  );
}

export default App;
