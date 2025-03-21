import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Banner = () => {
  const navigate = useNavigate();
  const { cart, user, isLoggedIn, logout } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const cartItems = cart?.length || 0;

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Searching:", e.target.value);
    }
  };

  const getAvatar = (username) => {
    if (!username) return "";
    return username.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsAvatarMenuOpen(false);
  };

  const handleLogoClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-16 py-6">
        <div className="flex justify-between items-center">
          <div
            className="text-2xl sm:text-3xl font-bold text-red-500 cursor-pointer transition-transform hover:scale-105 relative"
            onClick={handleLogoClick}
          >
            <span className="relative">
              PHS<span className="text-blue-400">.</span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </span>
          </div>

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
            <li
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => navigate("/news")}
            >
              Tin tức
            </li>
          </ul>

          <div className="flex items-center space-x-4">
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

            {isLoggedIn ? (
              <div className="relative">
                <div
                  className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-blue-600 transition"
                  onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                  title="User Menu"
                >
                  {getAvatar(user?.username)}
                </div>
                {isAvatarMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li
                        className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          navigate("/admin");
                          setIsAvatarMenuOpen(false);
                        }}
                      >
                        Admin
                      </li>
                      <li
                        className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="text-gray-800 hover:text-red-500 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}

            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

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
              <li
                className="cursor-pointer hover:text-red-500 transition"
                onClick={() => navigate("/news")}
              >
                Tin tức
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
              {isLoggedIn ? (
                <div className="relative">
                  <div
                    className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-blue-600 transition"
                    onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                    title="User Menu"
                  >
                    {getAvatar(user?.username)}
                  </div>
                  {isAvatarMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <ul className="py-1">
                        <li
                          className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            navigate("/admin");
                            setIsAvatarMenuOpen(false);
                          }}
                        >
                          Admin
                        </li>
                        <li
                          className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="text-gray-800 hover:text-red-500 transition"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Banner;
