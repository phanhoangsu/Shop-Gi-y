/**
 * Banner Component
 * 
 * Chức năng chính:
 * 1. Navigation:
 *    - Logo with home link
 *    - Category navigation
 *    - Cart access
 *    - User menu
 * 
 * 2. Search:
 *    - Category search
 *    - Search suggestions
 *    - Popular searches
 *    - Search history
 * 
 * 3. User Interface:
 *    - Responsive design
 *    - Mobile menu
 *    - Loading states
 *    - Dropdown menus
 * 
 * 4. Authentication:
 *    - User avatar
 *    - Login status
 *    - Logout handling
 */

import React, { useState, useEffect, useRef } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

/**
 * Banner Component
 * @component
 * @description Main navigation banner with search, cart, and user features
 */
const Banner = () => {
  // Navigation and Auth
  const navigate = useNavigate();
  const { cart, user, isLoggedIn, logout } = useCart();

  // UI State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

  // Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  
  // Cart State
  const cartItems = cart?.length || 0;

  /**
   * Popular search suggestions
   * @constant
   * @type {Array<{text: string, category: string}>}
   */
  const popularSearches = [
    { text: "Giày nam", category: "man" },
    { text: "Giày nữ", category: "women" },
    { text: "Giày trẻ em", category: "kids" },
  ];

  /**
   * Handle clicks outside search dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handle search input submission
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();

      // Route to appropriate category
      if (term.includes("nam") || term.includes("man")) {
        navigate("/list/man");
      } else if (term.includes("nữ") || term.includes("women")) {
        navigate("/list/women");
      } else if (term.includes("trẻ em") || term.includes("kids")) {
        navigate("/list/kids");
      }

      setIsSearchFocused(false);
      setSearchTerm("");
    }
  };

  /**
   * Handle popular search item click
   * @param {{text: string, category: string}} item - Search item
   */
  const handlePopularSearchClick = (item) => {
    if (item.category === "man") {
      navigate("/list/man");
    } else if (item.category === "women") {
      navigate("/list/women");
    } else if (item.category === "kids") {
      navigate("/list/kids");
    }
    setIsSearchFocused(false);
    setSearchTerm("");
  };

  /**
   * Generate user avatar initials
   * @param {string} username - User's username
   * @returns {string} Avatar initials
   */
  const getAvatar = (username) => {
    if (!username) return "";
    return username.slice(0, 2).toUpperCase();
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsAvatarMenuOpen(false);
  };

  /**
   * Handle logo click with loading animation
   */
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
            <div className="hidden sm:block relative" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Tìm kiếm danh mục..."
                  className="w-80 px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  onKeyPress={handleSearch}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    if (searchTerm.trim()) {
                      handleSearch({ key: "Enter" });
                    }
                  }}
                >
                  <FiSearch size={20} />
                </button>
              </div>

              {/* Dropdown tìm kiếm phổ biến */}
              {isSearchFocused && (
                <div className="absolute mt-2 w-[32rem] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div>
                    <div className="px-4 py-2 text-sm font-semibold text-gray-500 border-b">
                      Danh mục sản phẩm
                    </div>
                    {popularSearches.map((item, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                        onClick={() => handlePopularSearchClick(item)}
                      >
                        <FiSearch className="text-gray-400 mr-2" size={14} />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-gray-700 transition"
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm danh mục..."
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
