import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="flex justify-between items-center px-16 py-6 bg-white shadow-sm">
        {/* Logo */}
        <div className="text-3xl font-bold text-red-500">
          jump<span className="text-blue-400">.</span>
        </div>

        {/* Menu */}
        <ul className="flex space-x-8 text-lg text-gray-800">
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
        <div className="flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="px-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute right-4 top-2.5 text-gray-500 cursor-pointer">
              <FiSearch size={20} />
            </span>
          </div>

          {/* Cart */}
          <div className="flex items-center cursor-pointer hover:text-red-500 transition">
            <FaCartPlus className="mr-2" size={20} />
            <span>Cart</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Banner;
