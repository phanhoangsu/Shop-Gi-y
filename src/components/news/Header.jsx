import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMonitor,
  FiBookmark,
  FiHeart,
  FiMoon,
  FiSun,
  FiSearch,
} from "react-icons/fi";

const Header = ({ darkMode, setDarkMode, searchTerm, setSearchTerm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      navigate("/news");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-40">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a
              onClick={handleLogoClick}
              className="flex items-center space-x-2 relative cursor-pointer"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-t-2 border-t-red-500 border-gray-300 rounded-full animate-spin"></div>
              ) : (
                <FiMonitor className="text-red-500" size={24} />
              )}
              <h1 className="text-xl font-bold dark:text-white">TechNews</h1>
            </a>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hover:text-red-500 dark:text-gray-300">
              <FiBookmark size={20} />
            </button>
            <button className="hover:text-red-500 dark:text-gray-300">
              <FiHeart size={20} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hover:text-red-500 dark:text-gray-300"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
