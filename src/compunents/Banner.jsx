import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems] = useState(3); // Giả lập số lượng sản phẩm trong giỏ

  // Xử lý tìm kiếm (có thể kết nối với API sau)
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Searching:", e.target.value);
      // Thêm logic gọi API tìm kiếm ở đây
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-16 py-6">
        {/* Flex container chính */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="text-2xl sm:text-3xl font-bold text-red-500 cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate("/")}
          >
            jump<span className="text-blue-400">.</span>
          </div>

          {/* Menu desktop */}
          <ul className="hidden md:flex items-center space-x-8 text-lg text-gray-800">
            <li
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => navigate("/list/man")}
            >
              Man
            </li>
            <li
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => navigate("/list/women")}
            >
              Women
            </li>
            <li
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => navigate("/list/kids")}
            >
              Kids
            </li>
          </ul>

          {/* Search và Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:block relative">
              <input
                type="text"
                placeholder="Search here..."
                className="px-4 py-2 w-40 lg:w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onKeyPress={handleSearch}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                <FiSearch size={20} />
              </span>
            </div>

            {/* Cart */}
            <div
              className="flex items-center cursor-pointer hover:text-red-500 transition relative"
              onClick={() => navigate("/cart")}
            >
              <FaCartPlus size={20} />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
              <span className="hidden sm:inline ml-2">Cart</span>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="space-y-4 text-gray-800">
              <li
                className="cursor-pointer hover:text-red-500 transition"
                onClick={() => navigate("/list/man")}
              >
                Man
              </li>
              <li
                className="cursor-pointer hover:text-red-500 transition"
                onClick={() => navigate("/list/women")}
              >
                Women
              </li>
              <li
                className="cursor-pointer hover:text-red-500 transition"
                onClick={() => navigate("/list/kids")}
              >
                Kids
              </li>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="px-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onKeyPress={handleSearch}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                  <FiSearch size={20} />
                </span>
              </div>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Banner;
